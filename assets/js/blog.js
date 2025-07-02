// Blog functionality
class BlogManager {
  constructor() {
    this.blogPosts = [];
    this.currentArticle = null;
    this.init();
  }

  async init() {
    try {
      await this.loadBlogPosts();
      this.renderBlogList();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error initializing blog:', error);
      this.showNoPosts();
    }
  }

  async loadBlogPosts() {
    try {
      // Try to load blog posts index file
      const response = await fetch('./posts-index.json');
      if (response.ok) {
        const postsIndex = await response.json();
        this.blogPosts = await this.loadPostsFromIndex(postsIndex);
      } else {
        // Fallback: try to discover posts automatically
        await this.discoverPosts();
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      this.blogPosts = [];
    }
  }

  async loadPostsFromIndex(postsIndex) {
    const posts = [];
    for (const postInfo of postsIndex.posts) {
      try {
        const postContent = await this.loadMarkdownFile(postInfo.file);
        const post = this.parseMarkdownPost(postContent, postInfo.file);
        if (post) {
          // Override with metadata from index if available
          if (postInfo.title) post.title = postInfo.title;
          if (postInfo.date) post.date = new Date(postInfo.date);
          if (postInfo.description) post.description = postInfo.description;
          if (postInfo.author) post.author = postInfo.author;
          if (postInfo.tags) post.tags = postInfo.tags;
          posts.push(post);
        }
      } catch (error) {
        console.error(`Error loading post ${postInfo.file}:`, error);
      }
    }
    return posts.sort((a, b) => b.date - a.date);
  }

  async discoverPosts() {
    // Since we can't dynamically discover files in static hosting,
    // we'll try common filenames
    const commonPosts = [
      'welcome.md',
      'first-post.md',
      'hello-world.md',
      'introduction.md'
    ];

    const posts = [];
    for (const filename of commonPosts) {
      try {
        const content = await this.loadMarkdownFile(filename);
        const post = this.parseMarkdownPost(content, filename);
        if (post) {
          posts.push(post);
        }
      } catch (error) {
        // File doesn't exist, continue
      }
    }
    this.blogPosts = posts.sort((a, b) => b.date - a.date);
  }

  async loadMarkdownFile(filename) {
    const response = await fetch(`./${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}`);
    }
    return await response.text();
  }

  parseMarkdownPost(content, filename) {
    const lines = content.split('\n');
    let frontMatterEnd = -1;
    let frontMatter = {};

    // Check for front matter (YAML between ---)
    if (lines[0] && lines[0].trim() === '---') {
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
          frontMatterEnd = i;
          break;
        }
      }

      if (frontMatterEnd > 0) {
        const frontMatterLines = lines.slice(1, frontMatterEnd);
        frontMatter = this.parseFrontMatter(frontMatterLines);
      }
    }

    const markdownContent = lines.slice(frontMatterEnd + 1).join('\n').trim();
    
    if (!markdownContent) {
      return null;
    }

    // Extract title from front matter or first heading
    let title = frontMatter.title;
    if (!title) {
      const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
      title = titleMatch ? titleMatch[1] : filename.replace('.md', '').replace(/[-_]/g, ' ');
    }

    // Extract description from front matter or first paragraph
    let description = frontMatter.description;
    if (!description) {
      const htmlContent = marked.parse(markdownContent);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      const firstParagraph = tempDiv.querySelector('p');
      description = firstParagraph ? 
        firstParagraph.textContent.substring(0, 150) + '...' : 
        'No description available';
    }

    return {
      filename: filename,
      title: title,
      description: description,
      date: frontMatter.date ? new Date(frontMatter.date) : new Date(),
      author: frontMatter.author || 'Shanilka Haturusinghe',
      tags: frontMatter.tags || [],
      content: markdownContent,
      htmlContent: marked.parse(markdownContent)
    };
  }

  parseFrontMatter(lines) {
    const frontMatter = {};
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        // Handle arrays (tags)
        if (value.startsWith('[') && value.endsWith(']')) {
          frontMatter[key] = value.slice(1, -1).split(',').map(tag => tag.trim().replace(/["']/g, ''));
        } else {
          frontMatter[key] = value.replace(/["']/g, '');
        }
      }
    }
    return frontMatter;
  }

  renderBlogList() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const blogList = document.getElementById('blog-list');
    const noPosts = document.getElementById('no-posts');

    loadingIndicator.style.display = 'none';

    if (this.blogPosts.length === 0) {
      noPosts.style.display = 'block';
      return;
    }

    blogList.style.display = 'block';
    blogList.innerHTML = '';

    this.blogPosts.forEach((post, index) => {
      const postElement = this.createPostListItem(post, index);
      blogList.appendChild(postElement);
    });
  }

  createPostListItem(post, index) {
    const article = document.createElement('article');
    article.className = 'blog-post-item';
    article.setAttribute('data-post-index', index);

    const formattedDate = post.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const tagsHtml = post.tags.length > 0 ? 
      `<div class="post-tags">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>` : '';

    article.innerHTML = `
      <div class="post-meta">
        <time class="post-date">${formattedDate}</time>
        <span class="post-author">by ${post.author}</span>
      </div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-description">${post.description}</p>
      ${tagsHtml}
      <button class="read-more-btn" data-post-index="${index}">
        Read More <i class="fas fa-arrow-right"></i>
      </button>
    `;

    return article;
  }

  showArticle(postIndex) {
    const post = this.blogPosts[postIndex];
    if (!post) return;

    this.currentArticle = post;
    
    const blogList = document.getElementById('blog-list');
    const articleView = document.getElementById('article-view');
    const articleContent = document.getElementById('article-content');

    // Update browser URL without page reload
    const newUrl = `${window.location.pathname}?post=${encodeURIComponent(post.filename.replace('.md', ''))}`;
    window.history.pushState({ postIndex }, post.title, newUrl);

    const formattedDate = post.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const tagsHtml = post.tags.length > 0 ? 
      `<div class="article-tags">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>` : '';

    articleContent.innerHTML = `
      <header class="article-header">
        <h1 class="article-title">${post.title}</h1>
        <div class="article-meta">
          <time class="article-date">${formattedDate}</time>
          <span class="article-author">by ${post.author}</span>
        </div>
        ${tagsHtml}
      </header>
      <div class="article-body">
        ${post.htmlContent}
      </div>
    `;

    blogList.style.display = 'none';
    articleView.style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
  }

  showBlogList() {
    const blogList = document.getElementById('blog-list');
    const articleView = document.getElementById('article-view');

    // Update browser URL
    window.history.pushState({}, 'Blog', window.location.pathname);

    blogList.style.display = 'block';
    articleView.style.display = 'none';
    this.currentArticle = null;
  }

  showNoPosts() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const noPosts = document.getElementById('no-posts');
    
    loadingIndicator.style.display = 'none';
    noPosts.style.display = 'block';
  }

  setupEventListeners() {
    // Read more buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more-btn') || e.target.closest('.read-more-btn')) {
        const btn = e.target.classList.contains('read-more-btn') ? e.target : e.target.closest('.read-more-btn');
        const postIndex = parseInt(btn.getAttribute('data-post-index'));
        this.showArticle(postIndex);
      }
    });

    // Back to list button
    const backBtn = document.getElementById('back-to-list');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.showBlogList();
      });
    }

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.postIndex !== undefined) {
        this.showArticle(e.state.postIndex);
      } else {
        this.showBlogList();
      }
    });

    // Check for initial post parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const postParam = urlParams.get('post');
    if (postParam) {
      const postIndex = this.blogPosts.findIndex(post => 
        post.filename.replace('.md', '') === postParam
      );
      if (postIndex !== -1) {
        this.showArticle(postIndex);
      }
    }
  }
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize blog if we're on the blog page
  if (document.querySelector('.blog')) {
    new BlogManager();
  }
});

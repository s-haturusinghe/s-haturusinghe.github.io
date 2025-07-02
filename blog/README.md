# Blog System Documentation

This directory contains the dynamic blog system for your website. Here's how to add new blog posts:

## Adding a New Blog Post

### Method 1: Using the Index File (Recommended)

1. **Create your markdown file** in the `/blog/` directory:
   ```
   /blog/my-new-post.md
   ```

2. **Add front matter** at the top of your markdown file:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2025-07-03"
   author: "Shanilka Haturusinghe"
   description: "A brief description of your post"
   tags: ["tag1", "tag2", "tag3"]
   ---
   
   # Your Post Title
   
   Your content goes here...
   ```

3. **Update the posts-index.json file** to include your new post:
   ```json
   {
     "posts": [
       {
         "file": "my-new-post.md",
         "title": "Your Post Title",
         "date": "2025-07-03",
         "author": "Shanilka Haturusinghe",
         "description": "A brief description of your post",
         "tags": ["tag1", "tag2", "tag3"]
       }
     ]
   }
   ```

### Method 2: Automatic Discovery

If you don't want to maintain the index file, the system will try to discover posts automatically. Just create markdown files with proper front matter and they should be picked up.

## Front Matter Fields

- **title** (required): The title of your blog post
- **date** (optional): Publication date in YYYY-MM-DD format
- **author** (optional): Author name (defaults to "Shanilka Haturusinghe")
- **description** (optional): Brief description for the post list
- **tags** (optional): Array of tags for categorization

## Markdown Features Supported

- Headers (H1-H6)
- Paragraphs and line breaks
- **Bold** and *italic* text
- [Links](https://example.com)
- Unordered and ordered lists
- `Inline code`
- Code blocks with syntax highlighting
- Blockquotes
- Tables
- Images

## File Structure

```
/blog/
├── index.html              # Blog page template
├── posts-index.json       # Optional: List of all posts
├── welcome.md             # Sample blog post
├── understanding-llms.md  # Sample blog post
└── README.md             # This file
```

## URLs

Your blog posts will be accessible at:
- Main blog page: `mydomain.me/blog`
- Individual posts: `mydomain.me/blog?post=filename-without-extension`

## Tips

1. **File naming**: Use descriptive filenames with hyphens (e.g., `my-awesome-post.md`)
2. **Images**: Place images in `/assets/images/blog/` and reference them with relative paths
3. **Consistent dates**: Use ISO date format (YYYY-MM-DD) for proper sorting
4. **SEO**: Write good descriptions for better search engine optimization

## Troubleshooting

- If posts don't appear, check the browser console for JavaScript errors
- Ensure markdown files have proper front matter format
- Verify that the `posts-index.json` file has valid JSON syntax

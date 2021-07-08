import React from 'react'

const BlogForm = ({
    title,
    author,
    blogUrl,
    chengeeTitle,
    chengeeAuthor,
    chengeeBlogUrl,
    onSubmit
}) => (
    < form onSubmit={onSubmit} >
        <div>
            title:
            <input
                type="text"
                value={title}
                name="Title"
                onChange={chengeeTitle}
            />
        </div>
        <div>
            author:
            <input
                type="text"
                value={author}
                name="Author"
                onChange={chengeeAuthor}
            />
        </div>
        <div>
            url:
            <input
                type="text"
                value={blogUrl}
                name="Url"
                onChange={chengeeBlogUrl}
            />
        </div>
        <button type="submit">create</button>
    </form >
)

export default BlogForm
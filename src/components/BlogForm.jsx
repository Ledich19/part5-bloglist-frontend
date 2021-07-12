import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handlChengeeTitle = (e) => setTitle(e.target.value)
  const handlChengeeAuthor = (e) => setAuthor(e.target.value)
  const handlChengeeBlogUrl = (e) => setUrl(e.target.value)

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const blog = {
      author,
      title,
      url,
    }
    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      < form onSubmit={handleAddBlog} id='blogForm'>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={handlChengeeTitle}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={handlChengeeAuthor}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={handlChengeeBlogUrl}
          />
        </div>
        <button type="submit">create</button>
      </form >
    </>
  )
}

export default BlogForm
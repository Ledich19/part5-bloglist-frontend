import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike,handleDeleteBlog, username }) => {
  const [visible, setVisible] = useState(false)
  const { title,url,likes,author,id } = blog

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const removeBtn = username === blog.user.username
    ? <button className='remove' onClick={() => handleDeleteBlog(id,title,author)}>remowe</button>
    : null

  return (
    <div className='blog'>
      <div className='blogMin' style={hideWhenVisible}>
        {title} {author}
        <button onClick={toggleVisible}>view</button>
      </div>

      <div className='blogView' style={showWhenVisible}>
        <div>{title}<button onClick={toggleVisible}>hide</button></div>
        <div>{url}</div>
        <div>{likes}<button onClick={() => handleLike(id)}>likes</button></div>
        <div>{author}</div>
        {removeBtn}
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  const blogsSort = [...blogs.sort((a,b) => b.likes - a.likes)]

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON ) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setInfoMessage('login ;)')
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }
  const handleAddBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blog)
    const newBlog = { ...returnedBlog, user: { name: user.name, username: user.username } }
    setBlogs(blogs.concat(newBlog))
    setInfoMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }
  const handleLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const newBlog = { ...blog,user: user.id,likes: blog.likes+ 1 }
    const apdateBlog = await blogService.update(id,newBlog)
    const newBlogs = blogs.map((blog) => blog.id === id ? { ...blog,likes: apdateBlog.likes }: blog)
    setBlogs(newBlogs)
  }
  const handleDeleteBlog = async (id, title, author) => {
    const confirm = window.confirm(`Remove blog ${title} by ${author}?`)
    if (confirm) {
      await blogService.remove(id)
      const newBlogs = blogs.filter(b => b.id !== id)
      setBlogs(newBlogs)
    }
  }

  if (user === null){
    return (
      <div>
        <Notification
          infoMessage={infoMessage}
          errorMessage={errorMessage}
        />
        <LoginForm
          login={handleLogin}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification
          infoMessage={infoMessage}
          errorMessage={errorMessage}
        />
        <h4>{`${user.name} logged in`}
          <button onClick={handleLogout} >logout</button>
        </h4>
        <Togglable btnName={'create new blog'} ref={blogFormRef}>
          <BlogForm
            createBlog={handleAddBlog}
          />
        </Togglable>
        {blogsSort.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDeleteBlog={handleDeleteBlog}
            username={user.username}
          />
        )}
      </div>
    )
  }
}

export default App
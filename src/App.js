import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [username, setUsername] = useState('Aleksandr')
  const [password, setPassword] = useState('55555')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handlChengeeUsername = (e) => setUsername(e.target.value);
  const handlChengeePassword = (e) => setPassword(e.target.value);
  const handlChengeeTitle = (e) => setTitle(e.target.value);
  const handlChengeeAuthor = (e) => setAuthor(e.target.value);
  const handlChengeeBlogUrl = (e) => setBlogUrl(e.target.value);

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const blog ={
        author,
        title,
        url: blogUrl,
      }
      const returnedBlog = await blogService.create(blog)
      const newBlogs = blogs.concat(returnedBlog)
      setBlogs(newBlogs)
      setTitle('')
      setAuthor('')
      setBlogUrl('')
      setInfoMessage(`a new blog ${returnedBlog.title}  by ${returnedBlog.author}`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('oooooooooooooooooooo');
    } 
  }

  if (user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
        infoMessage={infoMessage}
        errorMessage={errorMessage}
        />
        <LoginForm 
          username={username} 
          password={password}
          chengeeUsername={handlChengeeUsername}
          chengeePassword={handlChengeePassword}
          onSubmit={handleLogin}
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

        <h2>create new</h2>
        <BlogForm 
        title={title}
        author={author}
        blogUrl={blogUrl}
        chengeeTitle={handlChengeeTitle}
        chengeeAuthor={handlChengeeAuthor}
        chengeeBlogUrl={handlChengeeBlogUrl}
        onSubmit={handleAddBlog}
        />
         
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}


      </div>
    )
  }
}

export default App
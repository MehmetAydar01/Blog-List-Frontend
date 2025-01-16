import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMsg from './components/NotificationMsg'
import ToggleAble from './components/ToggleAble'
import BlogForm from './components/BlogForm'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (exception) {
        console.log(exception)
      }
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception?.response?.data?.error)
      // console.log(exception?.response?.data?.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const handleCreateNewBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)

      const userInfo = {
        name: user.name,
        username: user.username,
        id: blog.user,
      }
      setSuccessMessage(`a new blog ${blog.title} - ${blog.author} added`)

      setBlogs(blogs.concat({ ...blog, user: userInfo }))
    } catch (exception) {
      if (exception?.response?.data?.error === 'token expired') {
        setErrorMessage('please log in')
        handleLogout()
      } else {
        setErrorMessage(exception?.response?.data?.error)
      }
    }

    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 3000)
  }

  const blogForm = () => (
    <ToggleAble buttonLabel='create new blog'>
      <BlogForm createBlog={handleCreateNewBlog} />
    </ToggleAble>
  )

  const updateLikeNumber = async (id) => {
    const findBlog = blogs.find((item) => item.id === id)

    if (!findBlog) {
      setErrorMessage('This blog no longer exists.')
      setTimeout(() => setErrorMessage(null), 3000)
      return
    }

    const newObject = {
      likes: findBlog.likes + 1,
      author: findBlog.author,
      title: findBlog.title,
      url: findBlog.url,
      user: findBlog.user.id,
    }

    const userInfo = {
      name: findBlog.user.name,
      username: findBlog.user.username,
      id: findBlog.user.id,
    }

    try {
      const updatedBlog = await blogService.update(id, newObject)

      setBlogs(
        blogs.map((item) =>
          item.id === findBlog.id ? { ...updatedBlog, user: userInfo } : item
        )
      )
    } catch (exception) {
      if (exception?.response?.data?.error === 'Blog not found') {
        setBlogs(blogs.filter((item) => item.id !== findBlog.id))
      }
      setErrorMessage(exception?.response?.data?.error)
      console.log(exception)
      setTimeout(() => setErrorMessage(null), 3000)
    }
  }

  const handleDeleteBlog = async (id) => {
    const findBlog = blogs.find((item) => item.id === id)

    if (!findBlog) {
      setErrorMessage('This blog no longer exists.')
      setTimeout(() => setErrorMessage(null), 3000)
      return
    }

    try {
      const ok = window.confirm(
        `Remove blog ${findBlog.title} by ${findBlog.author}`
      )

      if (ok) {
        await blogService.deleteOne(id)
        setBlogs(blogs.filter((item) => item.id !== findBlog.id))

        setSuccessMessage(`${findBlog.title} blog was deleted successfully`)
      }
    } catch (exception) {
      console.log(exception)
      if (exception?.response?.data?.error === 'token expired') {
        setErrorMessage('please log in')
        handleLogout()
      } else if (exception?.response?.data?.error === 'blog not found') {
        setErrorMessage('This blog no longer exists')
        setBlogs(blogs.filter((item) => item.id !== findBlog.id))
      } else {
        setErrorMessage(exception?.response?.data?.error)
      }
    }

    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 3000)
  }

  // sort blogs by likes
  const sortBlogsByLikes = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div style={{ marginBottom: '20px' }}>
      {user === null ? (
        <div>
          <h2>login to application</h2>
          <NotificationMsg message={errorMessage} type='error' />
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <NotificationMsg message={successMessage} type='success' />
          <NotificationMsg message={errorMessage} type='error' />
          <p>
            {user.name} logged in
            <button type='button' onClick={handleLogout}>
              logout
            </button>
          </p>
          <div>
            <h2>create new</h2>
            {blogForm()}
          </div>
          <Blog
            sortBlogsByLikes={sortBlogsByLikes}
            updateLikeNumber={updateLikeNumber}
            handleDeleteBlog={handleDeleteBlog}
          />
        </div>
      )}
    </div>
  )
}

export default App

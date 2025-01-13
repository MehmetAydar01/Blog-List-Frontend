import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import NotificationMsg from "./components/NotificationMsg"
import ToggleAble from "./components/ToggleAble"
import BlogForm from "./components/BlogForm"

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogInput, setBlogInput] = useState({
    title: "",
    author: "",
    url: "",
  })

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
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser")
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

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage(exception?.response?.data?.error)
      // console.log(exception?.response?.data?.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
    blogService.setToken("")
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

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      author: blogInput.author,
      title: blogInput.title,
      url: blogInput.url,
    }

    try {
      const blog = await blogService.create(newBlog)

      setBlogInput({
        author: "",
        title: "",
        url: "",
      })
      setSuccessMessage(`a new blog ${blog.title} - ${blog.author} added`)
      setBlogs(blogs.concat(blog))
    } catch (exception) {
      setErrorMessage(exception?.response?.data?.error)
    }

    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 3000)
  }

  const handleBlogInput = (event) => {
    const { name, value } = event.target

    setBlogInput((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const blogForm = () => (
    <ToggleAble buttonLabel='new blog'>
      <BlogForm
        handleCreateNewBlog={handleCreateNewBlog}
        blogInput={blogInput}
        handleBlogInput={handleBlogInput}
      />
    </ToggleAble>
  )

  return (
    <div>
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
          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />
          })}
        </div>
      )}
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
      const loggedUserJSON = 
  window.localStorage.getItem('loggedUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin with ', username, password)
  
  try {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user))

    blogService.setToken(user.token)

    setMessage('Logged in!')
    setUser(user)
    setTimeout(() => {setMessage(null)}, 5000)
    setUsername('')
    setPassword('')
  } catch (exception) {
    console.log('wrong credentials')
    setErrorMessage('wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setUsername('')
    setPassword('')
  }}

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log('returnedblog', returnedBlog)
        setMessage(`${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        console.log('error', error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
  }

  const loginForm = () => (
    <>
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>   
    </>   
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <BlogForm createBlog={addBlog} />
    </div>
  )

  return (
    <div>
      <Notification message={message}
                    errorMessage={errorMessage} /> 
      <h1>BlogApp</h1>
      
      {!user && loginForm()}      
      {user && <div>
        <p>{user.name} logged in </p>
        {blogForm()}
        </div>
      }
           
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = { title, author, url }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log('returnedblog', returnedBlog)

        setTitle('')
        setAuthor('')
        setUrl('')

        setMessage(`${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        console.log('error', error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(likedBlog)
      setBlogs(blogs => blogs
        .map(b => (b.id === returnedBlog.id ? returnedBlog : b))
        .sort((a, b) => b.likes - a.likes)
      )
      setMessage(`${returnedBlog.title} was liked!`)
      setTimeout(() => {setMessage(null)}, 5000)
    } catch (error) {
      console.log('error', error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
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

  const blogForm = ( ) => {
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      )}
      <p></p>
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>new blog</button>
      </div>
      <div>
      <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>
      <div style={showWhenVisible}>
      <h3>Save new blog</h3>
        <form onSubmit={addBlog}>
          <div>
              title
            <input
              id='title'
              type="text"
              value={title}
              name="Title"
              onChange={event => setTitle(event.target.value)}
              placeholder='title of the blog'
            />
          </div>
          <div>
              author
            <input
              id='author'
              type="text"
              value={author}
              name="Author"
              onChange={event => setAuthor(event.target.value)}
              placeholder='blog author'
            />
          </div>
          <div>
              url
            <input
              id='url'
              type="text"
              value={url}
              name="url"
              onChange={event => setUrl(event.target.value)}
              placeholder='link to blog'
            />
          </div>
          <button id='save-button' type="submit">save</button>
        </form>
      </div>
    </div>
  )
  }

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
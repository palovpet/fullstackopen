import { useState } from "react"

const Blog = ({ blog, likeBlog }) => {
  const [showInfo, setShowInfo] = useState(false)
  const hideWhenShowInfo = { display: showInfo ? 'none' : '' }
  const showWhenShowInfo = { display: showInfo ? '' : 'none' }

  const listStyle = {
    paddingTop: 10,
    paddingLeft: 3,
    paddingBottom: 5,
    border: 'solid',
    borderColor: 'pink',
    borderWidth: 3
  }

 return (
  <div style={listStyle}>
  <div style={hideWhenShowInfo}>
   <p>{blog.title}</p>
   <button id='viewButton' onClick={ () => setShowInfo(true)}>view</button>
  </div>
  <div style={showWhenShowInfo}>
    <p><b>title: </b>{blog.title}</p>
    <p><b>author: </b> {blog.author}</p>
    <p><b> likes: </b>{blog.likes} <button id='likeButton' onClick={() => likeBlog(blog)}>like</button></p>
    <p><b> url: </b>{blog.url}</p>
    <button onClick={ () => setShowInfo(false)}>hide</button>
  </div>
  </div>  
  )
}

export default Blog
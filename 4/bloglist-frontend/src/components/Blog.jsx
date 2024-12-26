import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
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
        <button id='infoButton' onClick={ () => setShowInfo(false)}>hide</button>
        <button id='deleteButton' onClick={() => deleteBlog(blog)}>delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
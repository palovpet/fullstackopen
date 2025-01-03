const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('Request body: ', body)

  if (!body || !body.title || !body.author || !body.url) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  const updateSavedBlog = await Blog.find(savedBlog).populate('user', { username: 1, name: 1 })

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(updateSavedBlog[0])

})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true,
      runValidators: true,
      context: 'query'
    }
  ).populate('user', { username: 1, name: 1 })

  response.json(updated)
})

blogsRouter.delete('/:id', async (request, response,next) => {
  try {
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: 'unauthorized action' });
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exeption) {
    next(exeption)
  }
})

module.exports = blogsRouter
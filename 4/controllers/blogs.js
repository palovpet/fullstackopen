const blogsRouter = require('express').Router()
const { application } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})
    
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
const newBlog = await blog.save()
const populatedBlog = await Blog.find(newBlog).populate('user', { username: 1, name: 1})

user.blogs = user.blogs.concat(newBlog._id)
await user.save()

response.status(201).json(populatedBlog[0])

})

blogsRouter.delete('/:id', async (request, response,next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exeption) {
    next(exeption)
  }
})

module.exports = blogsRouter
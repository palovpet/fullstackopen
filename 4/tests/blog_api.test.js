const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('BLOGS', () => {

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()

})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log('Initial list, count ', response.body.length)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id-field is named id', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body[0]._id, undefined)
  assert.ok(response.body[0].id)
})

test('a blog can be added', async () => {
  const newBlog = {
    title: "Buubääböö",
    author: "T.Kari",
    url: "http://google.fi",
    likes: 100,
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  console.log('New blog, count:', response.body.length)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api   
    .delete(`/api/blogs/${blogToDelete.id}`)    
    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()

  const deletedBlogIds = blogsAtEnd.map(r => r.id)
  assert(!deletedBlogIds.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})
})

describe('USER ', () => {
  describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})
})

after(async () => {
  await mongoose.connection.close()
})
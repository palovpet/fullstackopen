import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testing is important',
  author: 'Taavetti',
  url: 'www.testing.com',
  likes: 0,
  user: '67682c358adfde5ffa55c8f1'
}

test('renders blog title', () => {
  render(<Blog blog={blog}/>)

  const element = screen.getAllByText('Testing is important')
  expect(element).toBeDefined()
})

test('clicking view reveals author and url', async () => {
  render(<Blog blog={blog}/>)
  const element = screen.getAllByText('Testing is important')
  expect(element).toBeDefined()

  const testUser = userEvent.setup()
  const button = screen.getByText('view')
  await testUser.click(button)
  const author = screen.getByText('Taavetti')
  const url = screen.getByText('www.testing.com')

  expect(author).toBeDefined()
  expect(url).toBeDefined()
})

test('liking a blog twice will cause the eventhandler to be called twice', async () => {
  const mockHandler = vi.fn()
  render(<Blog blog={blog} likeBlog={mockHandler}/>)
  const element = screen.getAllByText('Testing is important')
  expect(element).toBeDefined()

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)


})
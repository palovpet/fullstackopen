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

test('clicking view reveals author and likes', async () => {
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
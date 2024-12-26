import { render, screen } from '@testing-library/react'
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
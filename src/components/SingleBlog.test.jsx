import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import SingleBlog from './SingleBlog'

test('Make a test, which checks that the component displaying a blog renders the blog"s title and author, but does not render its URL or number of likes by default.', () => {
  const blog = {
    id: '1',
    title: 'Fırsat Eşitliği',
    author: 'Arin Yazilim',
    url: 'https://example.com',
    likes: 5,
    user: {
      name: 'Gürcan Çekiç',
      username: 'arinyazilim',
    },
  }

  const mockHandlerFunc = vi.fn()

  render(
    <SingleBlog
      blog={blog}
      handleDeleteBlog={mockHandlerFunc}
      updateLikeNumber={mockHandlerFunc}
      user={blog.user}
    />
  )

  // Blog başlığı ve yazarı görünüyor mu?
  const titleOrAuthorElements = screen.getByText(
    'Fırsat Eşitliği - Arin Yazilim'
  )

  // URL ve likes görünmüyor mu?
  const urlElement = screen.queryByText('https://example.com')
  const LikesElement = screen.queryByText(/likes: 5/i)

  expect(titleOrAuthorElements).toBeInTheDocument()
  expect(urlElement).not.toBeInTheDocument()
  expect(LikesElement).not.toBeInTheDocument()
})

test('Make a test, which checks that the blog"s URL and number of likes are shown when the button controlling the shown details has been clicked.', async () => {
  const blog = {
    id: '1',
    title: 'Fırsat Eşitliği',
    author: 'Arin Yazilim',
    url: 'https://example.com',
    likes: 5,
    user: {
      name: 'Gürcan Çekiç',
      username: 'arinyazilim',
    },
  }

  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(
    <SingleBlog
      blog={blog}
      handleDeleteBlog={mockHandler}
      updateLikeNumber={mockHandler}
      user={blog.user}
    />
  )

  // Detaylar başlangıçta görünmemeli
  const urlBeforeClick = screen.queryByText('https://example.com')
  const likesBeforeClick = screen.queryByText(/likes: 5/i)
  expect(urlBeforeClick).not.toBeInTheDocument()
  expect(likesBeforeClick).not.toBeInTheDocument()

  const toggleButton = screen.getByText('view')
  expect(toggleButton).toBeInTheDocument()

  // Butona tıklama simülasyonu
  await user.click(toggleButton)

  // Detaylar artık görünmeli
  const urlAfterClick = screen.getByText('https://example.com')
  const likesAfterClick = screen.getByText(/likes: 5/i)
  expect(urlAfterClick).toBeInTheDocument()
  expect(likesAfterClick).toBeInTheDocument()

  // Butonun metni "hide" olmalı
  const hideButton = screen.getByText('hide')
  expect(hideButton).toBeInTheDocument()

  // Detayları gizleyen butona tıklayın
  await user.click(hideButton)

  const urlAfterHide = screen.queryByText('https://example.com')
  const likesAfterHide = screen.queryByText(/likes: 5/i)
  expect(urlAfterHide).not.toBeInTheDocument()
  expect(likesAfterHide).not.toBeInTheDocument()
})

import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogDetail from './BlogDetail'

test('ensures that the like button calls the handler twice when clicked twice', async () => {
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

  const userInfo = {
    name: 'Gürcan Çekiç',
    username: 'arinyazilim',
  }

  const mockUpdateLikeNumber = vi.fn()
  const mockHandleDeleteBlog = vi.fn()
  const user = userEvent.setup()

  render(
    <BlogDetail
      blog={blog}
      updateLikeNumber={mockUpdateLikeNumber}
      handleDeleteBlog={mockHandleDeleteBlog}
      user={userInfo}
    />
  )

  // "Like" butonunu seçiyoruz
  const likeButton = screen.getByText('like')
  expect(likeButton).toBeInTheDocument()
  expect(likeButton).toBeVisible()

  // Butona iki kez tıklıyoruz
  await user.click(likeButton)
  await user.click(likeButton)

  // Mock(mockUpdateLikeNumber) fonksiyonun iki kez çağrıldığını doğruluyoruz
  expect(mockUpdateLikeNumber.mock.calls).toHaveLength(2)
  expect(mockUpdateLikeNumber).toHaveBeenCalledTimes(2)
  expect(mockUpdateLikeNumber).toHaveBeenCalledWith(blog.id) // İşlevin doğru parametreyle çağrıldığını doğrula

  console.log(mockUpdateLikeNumber.mock.calls)
})

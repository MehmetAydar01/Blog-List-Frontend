import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, test, expect } from 'vitest'
import BlogForm from './BlogForm'

test('calls createBlog with the correct details when a new blog is created', async () => {
  // Mock function
  const mockCreateBlog = vi.fn()

  // Kullanıcıyı simüle etmek için setup
  const user = userEvent.setup()

  // Componenti render et
  render(<BlogForm createBlog={mockCreateBlog} />)

  // Input alanlarını seç
  const titleInput = screen.getByRole('textbox', { name: /title/i })
  const authorInput = screen.getByRole('textbox', { name: /author/i })
  const urlInput = screen.getByRole('textbox', { name: /url/i })
  const submitButton = screen.getByRole('button', { name: /create/i })

  // Input alanlarını doldur
  await user.type(titleInput, 'Testing React Apps')
  await user.type(authorInput, 'Matti Luukkainen')
  await user.type(
    urlInput,
    'https://fullstackopen.com/en/part5/testing_react_apps'
  )

  // Formu submit et
  await user.click(submitButton)

  // Mock fonksiyonun doğru parametrelerle çağrıldığını doğrula
  console.log(mockCreateBlog.mock.calls)

  expect(mockCreateBlog).toHaveBeenCalledTimes(1)
  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('Matti Luukkainen')
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'Testing React Apps',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en/part5/testing_react_apps',
  })

  // Formun sıfırlandığını doğrula
  expect(titleInput.value).toBe('')
  expect(authorInput.value).toBe('')
  expect(urlInput.value).toBe('')
})

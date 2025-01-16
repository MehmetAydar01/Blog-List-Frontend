import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogInput, setBlogInput] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleBlogInput = (event) => {
    const { name, value } = event.target

    setBlogInput((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleCreateNewBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: blogInput.title,
      author: blogInput.author,
      url: blogInput.url,
    })

    setBlogInput({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <form onSubmit={handleCreateNewBlog}>
      <div>
        title:
        <input
          type='text'
          name='title'
          value={blogInput.title}
          onChange={handleBlogInput}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          name='author'
          value={blogInput.author}
          onChange={handleBlogInput}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          name='url'
          value={blogInput.url}
          onChange={handleBlogInput}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm

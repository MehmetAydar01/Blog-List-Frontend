import PropTypes from 'prop-types'
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
        <label htmlFor='title'>title:</label>
        <input
          id='title'
          type='text'
          name='title'
          value={blogInput.title}
          onChange={handleBlogInput}
        />
      </div>
      <div>
        <label htmlFor='author'>author:</label>
        <input
          id='author'
          type='text'
          name='author'
          value={blogInput.author}
          onChange={handleBlogInput}
        />
      </div>
      <div>
        <label htmlFor='url'>url:</label>
        <input
          id='url'
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

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm

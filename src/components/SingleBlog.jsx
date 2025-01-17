import { useState } from 'react'
import BlogDetail from './BlogDetail'
import PropTypes from 'prop-types'

const SingleBlog = ({ blog, updateLikeNumber, handleDeleteBlog, user }) => {
  // Aktif blog ID'sini tutuyoruz
  const [activeBlogId, setActiveBlogId] = useState(null)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop: 10,
  }

  const toggleDetails = (id) => {
    setActiveBlogId((prevId) => (prevId === id ? null : id))
  }

  return (
    <div style={blogStyle}>
      <span style={{ marginRight: '5px' }}>
        {blog.title} - {blog.author}
      </span>
      <button onClick={() => toggleDetails(blog.id)}>
        {activeBlogId === blog.id ? 'hide' : 'view'}
      </button>
      {activeBlogId === blog.id && (
        <BlogDetail
          blog={blog}
          updateLikeNumber={updateLikeNumber}
          handleDeleteBlog={handleDeleteBlog}
          user={user}
        />
      )}
    </div>
  )
}

SingleBlog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateLikeNumber: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default SingleBlog

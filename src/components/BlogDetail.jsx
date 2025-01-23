import PropTypes from 'prop-types'

const BlogDetail = ({ blog, updateLikeNumber, handleDeleteBlog, user }) => {
  if (!blog) {
    return null
  }

  const buttonStyle = {
    backgroundColor: '#0D61E4',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    marginBottom: '3px',
    borderRadius: '6px',
    width: '80px',
    cursor: 'pointer',
  }

  const name = blog.user.name

  return (
    <>
      <p className='blogUrl'>{blog.url}</p>
      <p>
        likes: {blog.likes}
        <button
          type='button'
          onClick={() => updateLikeNumber(blog.id)}
          className='likeButton'
        >
          like
        </button>
      </p>
      <p>{name}</p>
      {blog.user.name === user.name && blog.user.username === user.username && (
        <button onClick={() => handleDeleteBlog(blog.id)} style={buttonStyle}>
          remove
        </button>
      )}
    </>
  )
}

BlogDetail.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }),
  updateLikeNumber: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default BlogDetail

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
    <div>
      <p>{blog.url}</p>
      <p>
        likes: {blog.likes}
        <button onClick={() => updateLikeNumber(blog.id)}>like</button>
      </p>
      <p>{name}</p>
      {blog.user.name === user.name && blog.user.username === user.username && (
        <button onClick={() => handleDeleteBlog(blog.id)} style={buttonStyle}>
          remove
        </button>
      )}
    </div>
  )
}

export default BlogDetail

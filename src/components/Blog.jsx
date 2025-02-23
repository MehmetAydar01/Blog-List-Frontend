import PropTypes from 'prop-types'
import SingleBlog from './SingleBlog'

const Blog = ({
  sortBlogsByLikes,
  updateLikeNumber,
  handleDeleteBlog,
  user,
}) => {
  return (
    <div className='blogs'>
      {sortBlogsByLikes.map((blog) => {
        return (
          <SingleBlog
            key={blog.id}
            blog={blog}
            updateLikeNumber={updateLikeNumber}
            handleDeleteBlog={handleDeleteBlog}
            user={user}
          />
        )
      })}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  sortBlogsByLikes: PropTypes.array.isRequired,
  updateLikeNumber: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
}

export default Blog

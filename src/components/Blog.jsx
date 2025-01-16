import SingleBlog from './SingleBlog'

const Blog = ({ sortBlogsByLikes, updateLikeNumber, handleDeleteBlog }) => {
  return (
    <>
      {sortBlogsByLikes.map((blog) => {
        return (
          <SingleBlog
            key={blog.id}
            blog={blog}
            updateLikeNumber={updateLikeNumber}
            handleDeleteBlog={handleDeleteBlog}
          />
        )
      })}
    </>
  )
}

export default Blog

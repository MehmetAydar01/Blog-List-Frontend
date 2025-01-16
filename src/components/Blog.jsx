import SingleBlog from './SingleBlog'

const Blog = ({
  sortBlogsByLikes,
  updateLikeNumber,
  handleDeleteBlog,
  user,
}) => {
  return (
    <>
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
    </>
  )
}

export default Blog

const getters = {
  user_data: state => state.user.user_data,
  qiniu_data: state => state.qiniu.qiniu_data,
  blog_data: state => state.blog.blog_data,
  web_data: state => state.web.web_data,
  comment_data: state => state.comment.comment_data
}
export default getters

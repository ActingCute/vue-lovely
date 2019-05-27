const getters = {
  user_data: state => state.user.user_data,
  is_login: state => state.user.is_login,
  qiniu_data: state => state.qiniu.qiniu_data,
  blog_data: state => state.blog.blog_data,
  blog_tag_data: state => state.blog.tag_data,
  blog_history_data: state => state.blog.history_data,
  web_data: state => state.web.web_data,
  comment_data: state => state.comment.comment_data,
  count_data: state => state.count.count_data,
  gist_token_data: state => state.gist.gist_data.token,
  gist_twitter_data: state => state.gist.gist_data.twitter,
  is_twitter: state => state.web.is_twitter,
  is_mb: state => state.web.is_mb,
  commits: state => state.commits.data,
  has_commits: state => state.commits.has_data,
  need_get_data: state =>  state.web.need_get_data,
}
export default getters
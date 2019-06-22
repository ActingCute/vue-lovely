let blog = {
    state: {
        blog_data: [],
        tag_data: [],
        history_data: []
    },

    mutations: {
        SET_BLOG_DATA: (state, blog_data) => {
            let new_blog_data = []
            for (let i = blog_data.length - 1; i > -1; i--) {
                new_blog_data.push(blog_data[i])
            }
            //console.log("设置blog data ", new_blog_data)
            state.blog_data = new_blog_data
        },
        SET_BLOG_TAG_DATA: (state, blog_tag_data) => {
            //console.log("设置blog tag data ", blog_tag_data)
            state.tag_data = blog_tag_data
        },
        SET_BLOG_HISTORY_DATA: (state, blog_history_data) => {
            //console.log("设置blog history data ", blog_history_data)
            state.history_data = blog_history_data
        }
    },

    actions: {
        SetBlogData({
            commit
        }, blog_data) {
            commit('SET_BLOG_DATA', blog_data)
        },
        SetBlogTagData({
            commit
        }, blog_tag_data) {
            commit('SET_BLOG_TAG_DATA', blog_tag_data)
        },
        SetBlogHostoryData({
            commit
        }, blog_history_data) {
            commit('SET_BLOG_HISTORY_DATA', blog_history_data)
        }
    }
}

export default blog
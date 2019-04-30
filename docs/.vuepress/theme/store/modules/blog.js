let blog = {
    state: {
        blog_data: [],
        tag_data: []
    },

    mutations: {
        SET_BLOG_DATA: (state, blog_data) => {
            console.log("设置blog data ", blog_data)
            state.blog_data = blog_data
        },
        SET_BLOG_TAG_DATA: (state, blog_tag_data) => {
            console.log("设置blog tag data ", blog_tag_data)
            state.tag_data = blog_tag_data
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
        }
    }
}

export default blog
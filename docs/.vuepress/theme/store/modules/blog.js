let blog = {
    state: {
        blog_data: []
    },

    mutations: {
        SET_BLOG_DATA: (state, blog_data) => {
            console.log("设置blog data ", blog_data)
            state.blog_data = blog_data
        }
    },

    actions: {
        SetBlogData({
            commit
        }, blog_data) {
            commit('SET_BLOG_DATA', blog_data)
        }
    }
}

export default blog
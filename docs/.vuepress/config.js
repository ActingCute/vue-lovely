//TODO  不知道怎么自定义
const me = [
    // link：指向链接也可以是外网链接
    { text: 'GitHub', link: 'https://github.com/ActingCute' },
    { text: 'weibo', link: 'https://weibo.com/97787360' }
]


module.exports = {
    title: 'Hello World',
    description: '这是谁的小鹿？真厉害!',
    themeConfig: {
        sidebar: 'auto',
        sidebarDepth: 4, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: '更新于',// 文档更新时间：每个文件git最后提交的时间,
        // 顶部导航栏
        nav: [
            // 单项 text：显示文字，link：指向链接
            // 这里的'/' 指的是 docs文件夹路径
            // [以 '/' 结尾的默认指向该路径下README.md文件]
            { text: '首页', link: '/' },
            // 多项，下拉形式
            {
                text: '捉住我',
                items: me
            },
            { text: '归档', link: '/History/' },
            { text: '后宫', link: '/Harem/' },
            { text: '留言板', link: '/Message/' }
        ],
        me:me
    },
    me:me
} 
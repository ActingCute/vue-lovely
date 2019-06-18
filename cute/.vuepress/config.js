const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
module.exports = {
    title: 'Hello ActingCute',
    port: 1314,
    description: '今天也要打起精神来',
    dest: "dist/html",
    head: [
        [
            'link',
            {
                rel: "stylesheet",
                type: "text/css",
                href: 'https://libs.cdnjs.net/dplayer/1.25.0/DPlayer.min.css'
            },
        ],
        [
            'link',
            {
                rel: "stylesheet",
                type: "text/css",
                href: 'https://libs.cdnjs.net/element-ui/2.8.2/theme-chalk/index.css'
            }
        ],
        [
            'link',
            {
                rel: "stylesheet",
                type: "text/css",
                href: 'https://libs.cdnjs.net/animate.css/3.7.0/animate.min.css'
            }
        ],     
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/dplayer/1.25.0/DPlayer.min.js'
            }
        ],
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/vue/2.6.10/vue.min.js'
            }
        ],
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/vuex/3.1.1/vuex.min.js'
            }
        ],
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/axios/0.19.0/axios.min.js'
            }
        ],
        [
            'script',
            {
                type: "text/javascript",
                src: 'https://libs.cdnjs.net/element-ui/2.8.2/index.js'
            }
        ],
    ],
    configureWebpack: (config, isServer) => {
        if (!isServer) {
            //开启gizp
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }));
            //告诉webpack,下面的东东不打包啦
            config.externals = {
                'vue': 'Vue',
                'element-ui': 'ELEMENT',
                'vuex': 'Vuex',
                'axios': 'axios'
            }
        }
    }
}
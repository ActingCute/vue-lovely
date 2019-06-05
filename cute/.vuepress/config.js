const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
module.exports = {
    title: 'Hello ActingCute',
    port: 1314,
    description: '你可爱的亚子很喜欢',
    dest: "dist/html",
    head: [
        [
            'link',
            { rel: "stylesheet", type: "text/css", href: 'https://libs.cdnjs.net/dplayer/1.25.0/DPlayer.min.css' },
        ],
        [
            'link',
            { rel: "stylesheet", type: "text/css", href: 'https://libs.cdnjs.net/element-ui/2.8.2/theme-chalk/index.css' }
        ],
        [
            'link',
            { rel: "stylesheet", type: "text/css", href: 'https://libs.cdnjs.net/animate.css/3.7.0/animate.min.css' }
        ],
        [
            'script',
            { type: "text/javascript", href: 'https://libs.cdnjs.net/dplayer/1.25.0/DPlayer.min.js' }
        ]
    ],
    configureWebpack: (config, isServer) => {
        if (!isServer) {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }));
            config.externals =  {
                // 'element-ui': 'ElEMENT',
                'DPlayer': 'DPlayer',
              }
        }
    }
}
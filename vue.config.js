const webpack = require('webpack')
module.exports = {
    publicPath: './',
    configureWebpack: () => ({
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: "jquery",
                $: "jquery"
            })
        ]
    }),

    devServer: {
        proxy: {
            '/api': {
                target: 'https://118.31.127.120:9090',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //通过pathRewrite重写地址，将前缀/api转为/
                }
            }
        }
    }
}
module.exports = {
    // 关闭eslint
    lintOnSave: false,
    // 代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
            },
        },
    },
    // 去掉打包后产生的map文件（定位错误用的文件，上线一般不需要）
    productionSourceMap:false
}
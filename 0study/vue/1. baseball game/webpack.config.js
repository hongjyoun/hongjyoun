const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')  //현재폴더 경로 가져올 수 있게 함

module.exports = {
    mode : 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue']
    },
    entry: {
        app: path.join(__dirname, 'main.js'),  //현재 폴더(__dirname)의 main.js를 말함
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',   // [name]에 app이 자동으로 들어간다
        path: path.join(__dirname, 'dist'),  //폴더명 (dist)는 마음대로 지으면 됨 //현재 폴더(__dirname) 안의 dist 폴더
    },

}
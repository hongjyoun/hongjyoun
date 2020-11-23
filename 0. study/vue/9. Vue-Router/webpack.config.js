const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')  //현재폴더 경로 가져올 수 있게 함

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue']
    },
    entry: {
        app: path.join(__dirname, 'main.js'),  //현재 폴더(__dirname)의 main.js를 말함 // app 이라는 이름은 임의로 지으면 됨
    },
    module: {
        rules: [{   // 여러개의 파일을 합칠 때, 어떤 규칙으로 합칠건지 적어주는 항목
            test: /\.vue$/,
            use: 'vue-loader', // .vue로 끝나는 파일들을 자동으로 js 파일로 변환시켜주는 역할
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        esModule: false,
                    },
                },
            ],
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: 'app.js',   // [name]에 app이 자동으로 들어간다
        path: path.join(__dirname, 'dist'),  //폴더명 (dist)는 마음대로 지으면 됨 //현재 폴더(__dirname) 안의 dist 폴더
        publicPath: '/dist'  // dist라는 이름은 임의로 지은 것
    },

}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    index: "./source/index.js",
    about: "./source/about.js",
  },
  output: {
    path: path.resolve(__dirname, "public"), // __dirname : 현재 webpack.config.js 파일이 위치하고 있는 경로를 알려주는 약속된 node js의 변수. 여기에 public 이라는 폴더에 최종적인 결과물을 넣을거야, 라는 뜻
    // filename: 'index_bundle.js'
    filename: '[name]_bundle.js' // index 번들도 만들고 싶고, about 번들도 만들고 싶을 때, 파일 명을 entry에 있는 이름으로 가져올 수 있는 게 [name]
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [
          'style-loader',  // 밑에 로더로 가져온 css 코드를 웹페이지 안에 스타일태그로 주입해주는 로더
          'css-loader'  // css 파일을 읽어와서 웹팩으로 가져오는 아이
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './source/index.html',
      filename: './index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './source/about.html',
      filename: './about.html',
      chunks: ['about']
    }),
  ]

}

// npx webpack --entry ./source/index.js --output-path ./public/index_bundle.js 이 명령어와 같은 역할


// 이 config 파일 만든 후에
// npx webpack --config webpack.config.js
// 이렇게 터미널에 입력.

// npx webpack
// 이렇게만 입력해도
// 알아서 config 파일 찾아서 번들링 해줌


// 그럼, css 파일도 같이 번들링시켜주려면?
// webpack 홈페이지에서 loading css 를 기본적으로 참고(거기 어떻게 하라고 다 나와있음)
// npm install --save-dev style-loader css-loader
// --save-dev  축약한게 -D

// 웹팩을 동작시켰을 때, 확장자가 css 인 파일을 만나면
// 웹팩이 알아서 그 CSS 파일을 웹팩으로 로드시켜주는 특수한 명령이 css-loader
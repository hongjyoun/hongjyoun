import Vue from 'vue'   // package.json 에서 vue 설치한 걸 가져오는 것.
import MineSweeper from './MineSweeper'  // 원래 import MineSweeper from './MineSweeper.vue'인데, config에서 extensions: ['.js', '.vue']를 해줘서, 확장자를 생략할 수 있음

// new Vue({
//     render: createElement => createElement(TicTacToe)
//   }).$mount('#root');


new Vue(MineSweeper).$mount('#root');
// const app = new Vue({
//  el: '#root',
// }) 이것처럼 vue를 가져올 수 있는 것

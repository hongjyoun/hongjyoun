import Vue from 'vue'
import TicTacToe from './TicTacToe'

// new Vue({
//     render: createElement => createElement(TicTacToe)
//   }).$mount('#root');

new Vue(TicTacToe).$mount('#root');

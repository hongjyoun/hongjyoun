import Vue from 'vue'
import VueRouter from 'vue-router'

import world from './hello/world';
import response from './hello/response';
import lotto from './hello/LottoBall';
import GameMatcher from './GameMatcher';
import test from './test';

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes : [
    // { path: '/test', component: test },
    // { path: '/world', component: world },
    // { path: '/response', component: response },
    // { path: '/lotto', component: lotto },
    { path: '/game/:name', component: GameMatcher }
  ]
})
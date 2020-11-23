import Vue from 'vue'
import VueRouter from 'vue-router'

// import responseCheck from '../2speedcheck/responseCheck';
// import RockScissorsPaper from '../3. 가위바위보/RockScissorsPaper'
// import LottoGenerator from '../4. 로또/LottoGenerator'

import responseCheck from './test';

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes : [
    { path: '/response', component: responseCheck },
    // { path: '/rock-scissors-paper', component: RockScissorsPaper },
    // { path: '/lotto', component: LottoGenerator },
  ]
})
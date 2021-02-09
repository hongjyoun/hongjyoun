import Vue from 'vue';
import App from './App.vue';
import router from './routes/index';
import store from './store/index';
import vuetify from './plugins/vuetify';

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import { formatDate } from '@/utils/filter';
Vue.filter('formatDate', formatDate);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app');

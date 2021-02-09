import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import target from './modules/target';
import random from './modules/random';
import relation from './modules/relation';
import content from './modules/content';
import device from './modules/device';
import group from './modules/group';
import log from './modules/log';
import statistic from './modules/statistic';
import revision from './modules/revision';

Vue.use(Vuex);

// Create a new store
const store = new Vuex.Store({
	modules: {
		user,
		target,
		random,
		relation,
		content,
		device,
		group,
		log,
		statistic,
		revision,
	},
	state: {
		snack: {
			act: false,
			msg: '',
			color: '',
		},
	},
	mutations: {
		popSnack(state, d) {
			state.snack.msg = d.msg;
			state.snack.color = d.color;
			state.snack.act = true;
		},
	},
	actions: {},
	getters: {},
});

export default store;

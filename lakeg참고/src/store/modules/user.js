import axios from '@/api/index';
import cookie from 'vue-cookie';

const state = {
	user: null,
	access_token: null,
	toggle: false,
};

const mutations = {
	login(state, payload) {
		state.user = payload.user;
		state.access_token = payload.access_token;
		cookie.set('access_token', payload.access_token, 1);
	},
	logout(state) {
		state.user = null;
		state.access_token = null;
		cookie.delete('access_token');
	},
};

const getters = {
	isLogin(state) {
		return state.access_token ? true : false;
	},
};

const actions = {
	login({ commit }, payload) {
		axios({
			method: 'POST',
			url: '/login',
			data: payload,
		})
			.then(res => {
				commit('login', res.data);
			})
			.catch(err => {
				commit('logout');
				console.error(err);
			});
	},
	autoLogin({ commit }, payload) {
		axios({
			method: 'GET',
			url: '/user',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload,
			},
		})
			.then(res => {
				commit('login', { user: res.data, access_token: payload });
			})
			.catch(err => {
				commit('logout');
				console.error(err);
			});
	},
	logout({ commit }, payload) {
		axios({
			method: 'GET',
			url: '/',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload,
			},
		})
			.then(res => {
				console.log(res);
				commit('logout');
			})
			.catch(err => {
				console.error(err);
			});
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};

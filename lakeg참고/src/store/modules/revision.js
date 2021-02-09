import axios from '@/api/index';
// import index from '@/store/index';

const state = {
	revisions: [],
};

const mutations = {
	init(state) {
		state.revisions = [];
	},
	loadRevisions(state, payload) {
		state.revisions = payload.data;
	},
};

const actions = {
	loadRevisions({ commit }, payload) {
		let url = '/revision';
		payload.group ? (url += `/${payload.group}`) : {};
		url += `?from=${payload.from}&to=${payload.to}`;
		axios({
			method: 'GET',
			url,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('init');
				commit('loadRevisions', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};

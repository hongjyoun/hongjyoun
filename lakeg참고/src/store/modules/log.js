import axios from '@/api/index';
// import index from '@/store/index';

const state = {
	logs: [],
	current_page: '',
	first_page_url: '',
	last_page: '',
	last_page_url: '',
	next_page_url: '',
	path: '',
	per_page: '',
	prev_page_url: '',
};

const mutations = {
	init(state) {
		state.logs = [];
		state.current_page = '';
		state.first_page_url = '';
		state.last_page = '';
		state.last_page_url = '';
		state.next_page_url = '';
		state.path = '';
		state.per_page = '';
		state.prev_page_url = '';
	},
	loadLogs(state, payload) {
		state.logs = payload.data;
		state.current_page = payload.current_page;
		state.first_page_url = payload.first_page_url;
		state.last_page = payload.last_page;
		state.last_page_url = payload.last_page_url;
		state.next_page_url = payload.next_page_url;
		state.path = payload.path;
		state.per_page = payload.per_page;
		state.prev_page_url = payload.prev_page_url;
	},
};

const actions = {
	loadLogs({ commit }, payload) {
		axios({
			method: 'GET',
			url: `/logs?page=${payload.page}&all=${payload.all}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('init');
				commit('loadLogs', res.data);
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

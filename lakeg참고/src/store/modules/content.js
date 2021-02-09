import axios from '@/api/index';
import index from '@/store/index';

const state = {
	searchedContents: [],
	searchingMsg: null,
	contents: [],
	contents_origin: [],
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
		state.searchedContents = [];
		state.searchingMsg = null;
		state.contents = [];
		state.contents_origin = [];
		state.current_page = '';
		state.first_page_url = '';
		state.last_page = '';
		state.last_page_url = '';
		state.next_page_url = '';
		state.path = '';
		state.per_page = '';
		state.prev_page_url = '';
	},
	loadContents(state, payload) {
		state.contents = payload.data;
		state.contents.forEach(e => {
			e.check = false;
		});
		state.contents_origin = JSON.parse(JSON.stringify(state.contents));
		state.current_page = payload.current_page;
		state.first_page_url = payload.first_page_url;
		state.last_page = payload.last_page;
		state.last_page_url = payload.last_page_url;
		state.next_page_url = payload.next_page_url;
		state.path = payload.path;
		state.per_page = payload.per_page;
		state.prev_page_url = payload.prev_page_url;
	},
	deleteContents(state, payload) {
		payload.forEach(e => {
			let idx = state.contents.findIndex(v => v.id == e);
			state.contents.splice(idx, 1);
		});
	},
	searchContents(state, payload) {
		state.searchedContents = payload;
		if (state.searchedContents.length > 100) {
			state.searchingMsg = `검색된 항목이 너무 많습니다 ${state.searchedContents.length}`;
		} else {
			state.contents = JSON.parse(JSON.stringify(state.searchedContents));
			state.searchingMsg = null;
		}
	},
};

const actions = {
	loadContents({ commit }, payload) {
		axios({
			method: 'GET',
			url: `/contents?page=${payload.page}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('init');
				commit('loadContents', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	deleteContent({ commit }, payload) {
		axios({
			method: 'POST',
			url: '/contents/delete',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: {
				delete: payload.data,
			},
		})
			.then(() => {
				commit('deleteContents', payload.data);
				index.commit('popSnack', { color: 'success', msg: '삭제 성공' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '삭제 실패' });
			});
	},
	createContent({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/contents',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadContents', payload);
				index.commit('popSnack', { color: 'success', msg: '생성 성공' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '생성 실패' });
			});
	},
	editContent({ dispatch }, payload) {
		axios({
			method: 'PUT',
			url: `/contents/${payload.data.id}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadContents', payload);
				index.commit('popSnack', { color: 'success', msg: '수정 성공' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '수정 실패' });
			});
	},
	searchContents({ commit }, payload) {
		axios({
			method: 'GET',
			url: `/keywords/content?query=${payload.text}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				if (res.data.length <= 100) {
					commit('init');
				}
				commit('searchContents', res.data);
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

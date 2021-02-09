import axios from '@/api/index';
import index from '@/store/index';

const state = {
	searchedRandomKeywords: [],
	searchingMsg: null,
	randomKeywords: [],
	randomKeywords_origin: [],
	first_page_url: '',
	last_page: 0,
	last_page_url: '',
	per_page: '',
	next_page_url: '',
	prev_page_url: '',
};

const mutations = {
	init(state) {
		state.searchedRandomKeywords = [];
		state.searchingMsg = null;
		state.randomKeywords = [];
		state.randomKeywords_origin = [];
		state.first_page_url = '';
		state.last_page = 0;
		state.last_page_url = '';
		state.per_page = '';
		state.next_page_url = '';
		state.prev_page_url = '';
	},
	loadRandomKeywords(state, payload) {
		state.randomKeywords = payload.data;
		state.randomKeywords.forEach(e => {
			e.check = false;
		});
		state.randomKeywords_origin = JSON.parse(JSON.stringify(state.randomKeywords));
		state.first_page_url = payload.first_page_url;
		state.last_page = payload.last_page;
		state.last_page_url = payload.last_page_url;
		state.per_page = payload.per_page;
		state.next_page_url = payload.next_page_url;
		state.prev_page_url = payload.prev_page_url;
	},
	deleteRandomKeyword(state, payload) {
		payload.forEach(e => {
			let idx = state.randomKeywords.findIndex(v => v.id == e);
			state.randomKeywords.splice(idx, 1);
		});
	},
	changeStatus(state, payload) {
		let idx = state.randomKeywords.findIndex(v => v.id == payload.data.id);
		state.randomKeywords[idx].started_at = payload.data.started_at;
		state.randomKeywords[idx].stopped_at = payload.data.stopped_at;
		state.randomKeywords[idx].status = payload.data.status;
	},
	changeMultipleStatus(state, payload) {
		payload.data.forEach(id => {
			let idx = state.randomKeywords.findIndex(v => v.id == id);
			state.randomKeywords[idx].status = payload.status;
		});
	},
	searchRandomKeywords(state, payload) {
		state.searchedRandomKeywords = payload;
		if (state.searchedRandomKeywords.length > 100) {
			state.searchingMsg = `검색된 항목이 너무 많습니다 ${state.searchedRandomKeywords.length}`;
		} else {
			state.randomKeywords = JSON.parse(JSON.stringify(state.searchedRandomKeywords));
			state.searchingMsg = null;
		}
	},
};

const actions = {
	loadRandomKeywords({ commit }, payload) {
		axios({
			method: 'GET',
			url: `/random_keywords?page=${payload.page}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('init');
				commit('loadRandomKeywords', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	deleteRandomKeyword({ commit }, payload) {
		axios({
			method: 'POST',
			url: '/random_keywords/delete',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: {
				delete: payload.data,
			},
		})
			.then(() => {
				commit('deleteRandomKeyword', payload.data);
				index.commit('popSnack', { color: 'success', msg: '삭제 성공' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '삭제 실패' });
			});
	},
	createRandomKeywords({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/random_keywords',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: {
				randoms: payload.data,
			},
		})
			.then(() => {
				dispatch('loadRandomKeywords', payload);
				index.commit('popSnack', { color: 'success', msg: '생성 완료' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '생성 실패' });
			});
	},
	changeStatus({ commit }, payload) {
		axios({
			method: 'PATCH',
			url: `/keywords/${payload.id}/status`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('changeStatus', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	changeMultipleStatus({ commit }, payload) {
		axios({
			method: 'PATCH',
			url: `/random_keywords/status`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: {
				status: payload.status,
				ids: payload.data,
			},
		})
			.then(() => {
				commit('changeMultipleStatus', payload);
			})
			.catch(err => {
				console.error(err);
			});
	},
	searchRandomKeywords({ commit }, payload) {
		axios({
			method: 'GET',
			url: `/random_keywords?query=${payload.text}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				if (res.data.data.length <= 100) {
					commit('init');
				}
				commit('searchRandomKeywords', res.data.data);
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

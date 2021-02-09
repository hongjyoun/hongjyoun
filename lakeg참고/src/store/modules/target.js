import axios from '@/api/index';
import index from '@/store/index';

const state = {
	keywordsGroup: [],
	contents: [],
	targetKeywords: [],
	targetKeywords_origin: [],
	first_page_url: '',
	last_page: 0,
	last_page_url: '',
	per_page: '',
	next_page_url: '',
	prev_page_url: '',
};

const mutations = {
	init(state) {
		state.targetKeywords = [];
		state.targetKeywords_origin = [];
		state.first_page_url = '';
		state.last_page = 0;
		state.last_page_url = '';
		state.per_page = '';
		state.next_page_url = '';
		state.prev_page_url = '';
	},
	loadTargetKeywords(state, payload) {
		state.targetKeywords = payload.data;
		state.targetKeywords_origin = JSON.parse(JSON.stringify(payload.data));
		state.first_page_url = payload.first_page_url;
		state.last_page = payload.last_page;
		state.last_page_url = payload.last_page_url;
		state.per_page = payload.per_page;
		state.next_page_url = payload.next_page_url;
		state.prev_page_url = payload.prev_page_url;
	},
	loadKeywordsGroup(state, payload) {
		state.keywordsGroup = payload;
	},
	loadContents(state, payload) {
		state.contents = payload;
	},
	deleteTargetKeyword(state, payload) {
		let idx = state.targetKeywords.findIndex(v => v.id == payload);
		state.targetKeywords.splice(idx, 1);
	},
	editTargetKeyword(state, payload) {
		let idx = state.targetKeywords.findIndex(v => v.id == payload.id);
		state.targetKeywords.splice(idx, 1, payload);
	},
	changeStatus(state, payload) {
		let idx = state.targetKeywords.findIndex(v => v.id == payload.data.id);
		state.targetKeywords[idx].started_at = payload.data.started_at;
		state.targetKeywords[idx].stopped_at = payload.data.stopped_at;
		state.targetKeywords[idx].status = payload.data.status;
	},
};

const actions = {
	loadTargetKeywords({ commit }, payload) {
		console.log(payload);
		axios({
			method: 'GET',
			url: `/keywords?page=${payload.page}&all=${payload.all}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('init');
				commit('loadTargetKeywords', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	loadKeywordsGroup({ commit }, payload) {
		axios({
			method: 'GET',
			url: '/keywords/keywordgroup',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload,
			},
		})
			.then(res => {
				commit('loadKeywordsGroup', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	loadContents({ commit }, payload) {
		axios({
			method: 'GET',
			url: '/keywords/content',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload,
			},
		})
			.then(res => {
				commit('loadContents', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	deleteTargetKeyword({ commit }, payload) {
		axios({
			method: 'DELETE',
			url: `/keywords/${payload.id}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(() => {
				commit('deleteTargetKeyword', payload.id);
				index.commit('popSnack', { color: 'success', msg: '삭제 성공' });
			})
			.catch(err => {
				console.error(err);
			});
	},
	editTargetKeyword({ dispatch }, payload) {
		axios({
			method: 'PUT',
			url: `/keywords/${payload.data.id}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadTargetKeywords', { access_token: payload.access_token, page: payload.page });
				index.commit('popSnack', { color: 'success', msg: '수정 완료' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '수정 실패' });
			});
	},
	createTargetKeyword({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/keywords',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadTargetKeywords', { access_token: payload.access_token, page: payload.page });
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
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};

import axios from '@/api/index';
import index from '@/store/index';

const state = {
	relationKeywords: [],
	relationKeywords_origin: [],
};

const mutations = {
	loadRelationKeywords(state, payload) {
		state.relationKeywords = payload.data;
		state.relationKeywords.forEach(e => {
			e.check = false;
		});
		state.relationKeywords_origin = JSON.parse(JSON.stringify(state.relationKeywords));
	},
	changeStatus(state, payload) {
		let idx = state.relationKeywords.findIndex(v => v.id == payload.data.keyword_id);
		let idx2 = state.relationKeywords[idx].related_keywords_all.findIndex(v => v.id == payload.data.related_keyword_id);
		state.relationKeywords[idx].related_keywords_all[idx2].pivot.active = payload.response.status;
	},
};

const actions = {
	loadRelationKeywords({ commit }, payload) {
		axios({
			method: 'GET',
			url: '/related_keywords',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('loadRelationKeywords', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	changeStatus({ commit }, payload) {
		axios({
			method: 'PATCH',
			url: '/related_keywords/status',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(res => {
				commit('changeStatus', { data: payload.data, response: res.data });
			})
			.catch(err => {
				console.error(err);
			});
	},
	createRelationKeywords({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/related_keywords',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadRelationKeywords', { access_token: payload.access_token });
				index.commit('popSnack', { color: 'success', msg: '생성 완료' });
			})
			.catch(err => {
				index.commit('popSnack', { color: 'error', msg: '생성 실패' });
				console.error(err);
			});
	},
	deleteRelationKeywords({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/related_keywords/delete',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: { delete: payload.data },
		})
			.then(() => {
				dispatch('loadRelationKeywords', { access_token: payload.access_token });
				index.commit('popSnack', { color: 'success', msg: '삭제 성공' });
			})
			.catch(err => {
				index.commit('popSnack', { color: 'error', msg: '삭제 실패' });
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

import axios from '@/api/index';
import index from '@/store/index';

const state = {
	groups: [],
	device_groups: [],
	keyword_groups: [],
};

const mutations = {
	loadGroups(state, payload) {
		state.groups = [];
		state.groups = payload.data;
	},
	loadDeviceGroups(state, payload) {
		state.device_groups = [];
		state.device_groups = payload.data;
	},
	loadKeywordGroups(state, payload) {
		state.keyword_groups = [];
		state.keyword_groups = payload.data;
	},
};

const actions = {
	loadGroups({ commit }, payload) {
		axios({
			method: 'GET',
			url: '/groups/relation',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('loadGroups', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	loadDeviceGroups({ commit }, payload) {
		axios({
			method: 'GET',
			url: '/groups/device',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('loadDeviceGroups', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	loadKeywordGroups({ commit }, payload) {
		axios({
			method: 'GET',
			url: '/groups/keyword',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('loadKeywordGroups', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	deleteGroupRelation({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/groups/relation/delete',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadGroups', { access_token: payload.access_token });
				index.commit('popSnack', { color: 'success', msg: '삭제 성공' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '삭제 실패' });
			});
	},
	deleteGroup({ dispatch }, payload) {
		axios({
			method: 'DELETE',
			url: `/groups/${payload.type}/${payload.id}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(() => {
				switch (payload.type) {
					case 'device':
						dispatch('loadDeviceGroups', { access_token: payload.access_token });
						break;
					case 'keyword':
						dispatch('loadKeywordGroups', { access_token: payload.access_token });
						break;
					default:
						break;
				}
				index.commit('popSnack', { color: 'success', msg: '삭제 성공' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '삭제 실패' });
			});
	},
	createGroup({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/groups/relation',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadGroups', payload);
				index.commit('popSnack', { color: 'success', msg: '생성 완료' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '생성 실패' });
			});
	},
	createDeviceGroup({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/groups/device',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadDeviceGroups', payload);
				index.commit('popSnack', { color: 'success', msg: '생성 완료' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '생성 실패' });
			});
	},
	editDeviceGroup({ dispatch }, payload) {
		axios({
			method: 'PUT',
			url: `/groups/device/${payload.data.id}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadDeviceGroups', payload);
				dispatch('loadGroups', payload);
				index.commit('popSnack', { color: 'success', msg: '수정 완료' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '수정 실패' });
			});
	},
	createKeywordGroup({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/groups/keyword',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadKeywordGroups', payload);
				index.commit('popSnack', { color: 'success', msg: '생성 완료' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '생성 실패' });
			});
	},
	editKeywordGroup({ dispatch }, payload) {
		axios({
			method: 'PUT',
			url: `/groups/keyword/${payload.data.id}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadKeywordGroups', payload);
				dispatch('loadGroups', payload);
				index.commit('popSnack', { color: 'success', msg: '수정 완료' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '수정 실패' });
			});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};

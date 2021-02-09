import axios from '@/api/index';
import index from '@/store/index';

const state = {
	searchedDevices: [],
	searchingMsg: null,
	devices: [],
	devices_origin: [],
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
		state.searchedDevices = [];
		state.searchingMsg = null;
		state.devices = [];
		state.devices_origin = [];
		state.current_page = '';
		state.first_page_url = '';
		state.last_page = '';
		state.last_page_url = '';
		state.next_page_url = '';
		state.path = '';
		state.per_page = '';
		state.prev_page_url = '';
	},
	loadDevices(state, payload) {
		state.devices = payload.data;
		state.devices_origin = JSON.parse(JSON.stringify(state.devices));
		state.current_page = payload.current_page;
		state.first_page_url = payload.first_page_url;
		state.last_page = payload.last_page;
		state.last_page_url = payload.last_page_url;
		state.next_page_url = payload.next_page_url;
		state.path = payload.path;
		state.per_page = payload.per_page;
		state.prev_page_url = payload.prev_page_url;
	},
	deleteDevice(state, payload) {
		let idx = state.devices.findIndex(v => v.id == payload);
		state.devices.splice(idx, 1);
	},
	searchDevices(state, payload) {
		state.searchedDevices = payload;
		if (state.searchedDevices.length > 100) {
			state.searchingMsg = `검색된 항목이 너무 많습니다 ${state.searchedDevices.length}`;
		} else {
			state.devices = JSON.parse(JSON.stringify(state.searchedDevices));
			state.searchingMsg = null;
		}
	},
};

const actions = {
	loadDevices({ commit }, payload) {
		axios({
			method: 'GET',
			url: `/devices?page=${payload.page}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				commit('init');
				commit('loadDevices', res.data);
			})
			.catch(err => {
				console.error(err);
			});
	},
	deleteDevice({ commit }, payload) {
		axios({
			method: 'DELETE',
			url: `/devices/${payload.id}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(() => {
				commit('deleteDevice', payload.id);
				index.commit('popSnack', { color: 'success', msg: '삭제 성공' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '삭제 실패' });
			});
	},
	createDevice({ dispatch }, payload) {
		axios({
			method: 'POST',
			url: '/devices',
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadDevices', payload);
				index.commit('popSnack', { color: 'success', msg: '생성 성공' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '생성 실패' });
			});
	},
	editDevice({ dispatch }, payload) {
		axios({
			method: 'PUT',
			url: `/devices/${payload.data.id}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
			data: payload.data,
		})
			.then(() => {
				dispatch('loadDevices', payload);
				index.commit('popSnack', { color: 'success', msg: '수정 성공' });
			})
			.catch(err => {
				console.error(err);
				index.commit('popSnack', { color: 'error', msg: '수정 실패' });
			});
	},
	searchDevices({ commit }, payload) {
		axios({
			method: 'GET',
			url: `/devices?query=${payload.text}`,
			headers: {
				// eslint-disable-next-line prettier/prettier
				'Authorization' : 'Bearer ' + payload.access_token,
			},
		})
			.then(res => {
				if (res.data.data.length <= 100) {
					commit('init');
				}
				commit('searchDevices', res.data.data);
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

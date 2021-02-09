import axios from '@/api/index';
// import index from '@/store/index';

const state = {
	chartOn: true,
	datas: [],
	dates: [],
	keyword_ids: [],
	keyword_groups: [],
	series: [],
	series_sort: [],
	ranking: {
		pc: [],
		mb: [],
	},
	rankingSeries: {
		pc: [],
		mb: [],
	},
	totalByDate: [],
	totalByKeyword: [],
};

const getters = {
	filteredSeries(state) {
		let result = [];
		state.series.forEach(s => {
			if (s.check) {
				result.push(s);
			}
		});
		return result;
	},
};

const mutations = {
	init(state) {
		state.datas = [];
		state.dates = [];
		state.keyword_ids = [];
		state.keyword_groups = [];
		state.series = [];
		state.series_sort = [];
		state.totalByDate = [];
		state.totalByKeyword = [];
		state.ranking = {
			pc: [],
			mb: [],
		};
		state.rankingSeries = {
			pc: [],
			mb: [],
		};
	},
	makeSeries(state) {
		// 키워드별 일별 작업량
		let series = [];
		for (let i = 0; i < state.keyword_ids.length; i++) {
			let temp = new Array(state.dates.length);
			temp.fill(0);
			series[i] = {
				name: state.keyword_ids[i],
				data: temp,
			};
		}

		state.datas.forEach(d => {
			const idPos = state.keyword_ids.indexOf(d.keyword_id);
			const datePos = state.dates.indexOf(d.date);
			series[idPos].data[datePos] = d.workload;
		});
		state.series = JSON.parse(JSON.stringify(series));
		state.series_sort = JSON.parse(JSON.stringify(series));

		// 키워드별 일별 랭킹
		const devices = ['pc', 'mb'];
		devices.forEach(device => {
			let rankingSeries = [];
			let zeroArr = new Array(state.dates.length);
			zeroArr.fill(null);
			for (let j = 0; j < state.keyword_ids.length; j++) {
				rankingSeries[j] = {
					name: state.keyword_ids[j],
					data: JSON.parse(JSON.stringify(zeroArr)),
				};
			}
			state.ranking[device].forEach(rank => {
				if (rank.keyword_id) {
					const idPos = state.keyword_ids.indexOf(rank.keyword_id);
					const datePos = state.dates.indexOf(rank.date);
					if (idPos !== -1 && datePos !== -1) {
						rankingSeries[idPos].data[datePos] = JSON.parse(JSON.stringify(rank.ranking));
					}
				}
			});
			state.rankingSeries[device] = JSON.parse(JSON.stringify(rankingSeries));
		});

		// 키워드별 총 작업량
		let totalByKeyword = new Array(state.keyword_ids.length);
		totalByKeyword.fill(0);

		// 날짜별 총 작업량
		let totalByDate = new Array(state.dates.length);
		totalByDate.fill(0);

		for (let i = 0; i < state.keyword_ids.length; i++) {
			for (let j = 0; j < state.dates.length; j++) {
				totalByKeyword[i] += Number(series[i].data[j]);
				totalByDate[j] += Number(series[i].data[j]);
			}
		}

		state.totalByKeyword = JSON.parse(JSON.stringify(totalByKeyword));
		state.totalByDate = JSON.parse(JSON.stringify(totalByDate));
	},
	loadStatistics(state, payload) {
		state.keyword_groups = payload.keyword_groups;
		payload.data.forEach(d => {
			d.date = d.date.split(' ')[0];
			// picks a date
			if (state.dates.indexOf(d.date) === -1) {
				state.dates.push(d.date);
			}
			// picks a keyword id
			if (state.keyword_ids.indexOf(d.keyword_id) === -1) {
				state.keyword_ids.push(d.keyword_id);
			}
		});

		// ranking데이터 pc, mobile 분리
		let ranking_pc = [];
		let ranking_mb = [];
		if (payload.ranking) {
			payload.ranking.forEach(d => {
				d.date = d.date.split(' ')[0];
				d.is_mobile ? ranking_mb.push(d) : ranking_pc.push(d);
			});
		}

		state.datas = payload.data;
		state.ranking.pc = JSON.parse(JSON.stringify(ranking_pc));
		state.ranking.mb = JSON.parse(JSON.stringify(ranking_mb));
		state.dates = state.dates.sort();
		state.keyword_ids = state.keyword_ids.sort(function(a, b) {
			return a - b;
		});
	},
	chartOn(state) {
		state.chartOn = true;
	},
};

const actions = {
	loadStatistics({ commit }, payload) {
		let url = '/statistics';
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
				console.log(res);
				commit('loadStatistics', res.data);
				commit('makeSeries');
				commit('chartOn');
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

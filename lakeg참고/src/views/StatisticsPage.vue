<template>
	<div>
		<form @submit.prevent="onSubmitForm">
			<v-row>
				<v-col cols="12" sm="2">
					<v-autocomplete v-model="group" :items="$store.state.statistic.keyword_groups" item-text="group_name" item-value="id" small-chips label="키워드그룹" deletable-chips></v-autocomplete>
				</v-col>
				<v-col cols="12" sm="2">
					<label for="from">from</label>
					<input name="from" class="datePicker" type="date" v-model="from" />
				</v-col>
				<v-col cols="12" sm="2">
					<label for="to">to</label>
					<input name="to" class="datePicker" type="date" v-model="to" />
				</v-col>
				<v-col cols="12" sm="2">
					<v-btn color="primary" @click="setDate('every')">전체</v-btn>
					<v-btn color="primary" @click="setDate('week')">1주일</v-btn>
					&nbsp;&nbsp;
					<v-btn color="success" type="submit">
						조회
					</v-btn>
				</v-col>
			</v-row>
		</form>
		<v-row v-if="$store.state.statistic.chartOn">
			<v-col v-if="showWork" cols="12" sm="4">
				<div class="chartWrapper" v-if="$store.state.statistic.dates.length > 0 && $store.state.statistic.series.length > 0 && $store.state.target.targetKeywords.length > 0">
					<each-keyword-chart :labels="$store.state.statistic.dates" :series="$store.state.statistic.series" />
				</div>
			</v-col>

			<v-col v-if="showWork" cols="12" sm="4">
				<div class="chartWrapper" v-if="$store.state.statistic.dates.length > 0 && $store.state.statistic.totalByDate.length > 0">
					<day-chart :labels="$store.state.statistic.dates" :data="$store.state.statistic.totalByDate" />
				</div>
			</v-col>
			<v-col v-if="showWork" cols="12" sm="4">
				<div class="chartWrapper" v-if="changeIdToName($store.state.statistic.keyword_ids).length > 0 && $store.state.statistic.totalByKeyword.length > 0">
					<keyword-chart :labels="changeIdToName($store.state.statistic.keyword_ids)" :data="$store.state.statistic.totalByKeyword" />
				</div>
			</v-col>
			<v-col v-if="showRank" cols="12" sm="4">
				<div
					class="chartWrapper"
					v-if="
						$store.state.statistic.dates.length > 0 &&
							$store.state.statistic.ranking.pc.length > 0 &&
							$store.state.statistic.rankingSeries.pc.length > 0 &&
							$store.state.target.targetKeywords.length > 0
					"
				>
					<ranking-chart :device="'pc'" :labels="$store.state.statistic.dates" :series="$store.state.statistic.rankingSeries.pc" />
				</div>
			</v-col>
			<v-col v-if="showRank" cols="12" sm="4">
				<div
					class="chartWrapper"
					v-if="
						$store.state.statistic.dates.length > 0 &&
							$store.state.statistic.ranking.mb.length > 0 &&
							$store.state.statistic.rankingSeries.mb.length > 0 &&
							$store.state.target.targetKeywords.length > 0
					"
				>
					<ranking-chart :device="'mb'" :labels="$store.state.statistic.dates" :series="$store.state.statistic.rankingSeries.mb" />
				</div>
			</v-col>
		</v-row>
		<v-row style="overflow-x: scroll;">
			<table>
				<thead>
					<tr>
						<th rowspan="2" style="padding:5px;">
							<v-btn v-if="sortedIdx != null" small @click="onClickInitSort">원래대로</v-btn>
						</th>
						<th rowspan="2">목표량</th>
						<th :colspan="colspan" v-for="day in $store.state.statistic.dates" :key="day" style="font-size:12px; padding:5px;">
							{{ day }}
						</th>
					</tr>
					<tr>
						<template v-for="(day, idx) in $store.state.statistic.dates" style="padding:5px;">
							<th v-if="showWork" :key="day + 'work'" @click="onClickSort(idx)">
								<strong style="font-size:12px;">작업량</strong>
								<span v-if="idx === sortedIdx">
									<span v-if="sortedType === 'descend'">🔻</span>
									<span v-if="sortedType === 'ascend'">🔺</span>
								</span>
							</th>
							<th v-if="showRank && $store.state.statistic.ranking.pc.length > 0" :key="day + 'rank'">
								<div v-if="$store.state.statistic.ranking.pc.length > 0" :key="day + 'pc'">
									<strong style="font-size:12px;">순위(pc)</strong>
								</div>
								<div v-if="$store.state.statistic.ranking.pc.length > 0" :key="day + 'mb'">
									<strong style="font-size:12px;">순위(mb)</strong>
								</div>
							</th>
						</template>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(s, i) in $store.state.statistic.series_sort" :key="s.name">
						<td>
							<span v-if="changeIdToName_single($store.state.statistic.series_sort[i].name)"> {{ changeIdToName_single($store.state.statistic.series_sort[i].name).keyword }}({{ s.name }}) </span>
						</td>
						<td>{{ getObjectiveAmount(s.name) }}</td>
						<template v-for="(d, j) in $store.state.statistic.dates" style="text-align:right;">
							<td v-if="showWork" :key="d + 'work'">{{ $store.state.statistic.series_sort[i].data[j] }}</td>
							<td v-if="showRank && $store.state.statistic.ranking.pc.length > 0" :key="d + 'pc'">
								<div>
									<span v-if="getRanking('pc', i, j)">{{ getRanking('pc', i, j).ranking }} </span>
									<span v-else style="color:#666;">X</span>
								</div>
								<div>
									<span v-if="getRanking('mb', i, j)">{{ getRanking('mb', i, j).ranking }} </span>
									<span v-else style="color:#666;">X</span>
								</div>
							</td>
						</template>
					</tr>
				</tbody>
			</table>
		</v-row>

		<div style="position:fixed; bottom:0; right:0;">
			<v-btn :color="showWork ? 'success' : 'error'" @click="showWork = !showWork">작업량</v-btn>
			&nbsp;
			<v-btn :color="showRank ? 'success' : 'error'" @click="showRank = !showRank" :disabled="$store.state.statistic.ranking.pc.length <= 0">랭킹</v-btn>
		</div>
	</div>
</template>
<script>
import EachKeywordChart from '@/components/EachKeywordChart';
import DayChart from '@/components/DayChart';
import KeywordChart from '@/components/KeywordChart';
import RankingChart from '@/components/RankingChart';
export default {
	components: {
		EachKeywordChart,
		DayChart,
		KeywordChart,
		RankingChart,
	},
	data() {
		return {
			group: '',
			from: '',
			to: '',
			chartOn: true,
			sortedIdx: null,
			sortedType: 'ascend', //ascend, descend
			showWork: true,
			showRank: true,
		};
	},
	computed: {
		colspan() {
			let result = 1;
			if (this.$store.state.statistic.ranking.pc.length > 0 && this.$store.state.statistic.ranking.mb.length > 0) {
				result = this.showRank ? 2 : {};
				if (this.showRank && this.showWork) {
					result = 2;
				} else if (!this.showRank && this.showWork) {
					result = 1;
				} else if (this.showRank && !this.showWork) {
					result = 1;
				} else {
					result = 0;
				}
			} else {
				result = this.showWork ? 1 : 0;
			}
			return result;
		},
	},
	methods: {
		onClickSort(idx) {
			if (this.sortedIdx == idx) {
				this.sortedType = this.sortedType === 'ascend' ? 'descend' : 'ascend';
			} else {
				this.sortedIdx = idx;
				this.sortedType = 'descend';
			}
			if (this.sortedType === 'ascend') {
				this.$store.state.statistic.series_sort.sort(
					function(a, b) {
						return a.data[this.sortedIdx] - b.data[this.sortedIdx];
					}.bind(this),
				);
			} else {
				this.$store.state.statistic.series_sort.sort(
					function(a, b) {
						return b.data[this.sortedIdx] - a.data[this.sortedIdx];
					}.bind(this),
				);
			}
		},
		onClickInitSort() {
			this.sortedIdx = null;
			this.sortedType = 'ascend';
			this.$store.state.statistic.series_sort = [];
			this.$store.state.statistic.series.forEach(e => {
				this.$store.state.statistic.series_sort.push(e);
			});
		},
		changeIdToName(idArr) {
			let result = [];
			if (idArr.length > 0 && this.$store.state.target.targetKeywords.length > 0) {
				idArr.forEach(id => {
					const idx = this.$store.state.target.targetKeywords.findIndex(v => v.id == id);
					result.push(this.$store.state.target.targetKeywords[idx].keyword);
				});
			}
			return result;
		},
		changeIdToName_single(id) {
			if (this.$store.state.target.targetKeywords.length > 0) {
				const idx = this.$store.state.target.targetKeywords.findIndex(v => v.id == id);
				return this.$store.state.target.targetKeywords[idx];
			} else {
				return null;
			}
		},
		onSubmitForm() {
			this.sortedIdx = null;
			this.sortedType = 'ascend';
			this.$store.state.statistic.chartOn = false;
			const access_token = this.$cookie.get('access_token');
			this.$router.replace({ path: `statistics?from=${this.from}&to=${this.to}` });
			this.$store.dispatch('statistic/loadStatistics', { access_token, from: this.from, to: this.to, group: this.group });
		},
		setDate(mode) {
			if (mode === 'every') {
				this.from = '1994-11-14';
				const today = new Date();
				this.to = this.getDate(today);
			} else if (mode === 'week') {
				let today = new Date();
				let beforeWeek = new Date();
				beforeWeek.setDate(today.getDate() - 7);
				this.to = this.getDate(today);
				this.from = this.getDate(beforeWeek);
			}
		},
		getDate(date) {
			const year = date.getFullYear();
			let month = date.getMonth() + 1;
			month = month > 9 ? month : `0${month}`;
			let day = date.getDate();
			day = day > 9 ? day : `0${day}`;
			return `${year}-${month}-${day}`;
		},
		getObjectiveAmount(id) {
			let result = '';
			if (this.$store.state.target.targetKeywords.length > 0) {
				let idx = this.$store.state.target.targetKeywords.findIndex(v => v.id == id);
				result = this.$store.state.target.targetKeywords[idx].target_amount;
			}
			return result;
		},
		getRanking(device, sereiesIdx, dateIdx) {
			const seriesId = this.$store.state.statistic.series_sort[sereiesIdx].name;
			const date = this.$store.state.statistic.dates[dateIdx];
			let result = null;
			if (this.$store.state.statistic.ranking[device].length > 0) {
				let idx = this.$store.state.statistic.ranking[device].findIndex(v => v.keyword_id == seriesId && v.date.indexOf(date) !== -1);
				result = this.$store.state.statistic.ranking[device][idx];
			}
			return result;
		},
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		if (this.$route.query.from && this.$route.query.to) {
			this.from = this.$route.query.from;
			this.to = this.$route.query.to;
		} else {
			this.setDate('week');
			this.$router.push({ path: `statistics?from=${this.from}&to=${this.to}` });
		}
		this.$store.dispatch('statistic/loadStatistics', { access_token, from: this.from, to: this.to });
		this.$store.dispatch('target/loadTargetKeywords', { access_token });
	},
};
</script>
<style scoped>
.datePicker {
	background-color: #4169e1;
	width: 100%;
}
.chartWrapper {
	background-color: white;
	padding: 20px;
}
th,
td {
	border: 1px solid gray;
}
th {
	user-select: none;
}
td {
	text-align: right;
}
table {
	border-collapse: collapse;
}
</style>

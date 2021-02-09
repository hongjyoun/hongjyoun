<template>
	<div>
		<v-row>
			<v-form @submit.prevent="submitKeywords" style="display:contents">
				<v-col cols="12" sm="1"></v-col>
				<v-col cols="12" sm="3">
					<v-textarea rows="3" filled label="랜덤키워드" auto-grow v-model="form.keywords"></v-textarea>
				</v-col>
				<v-col cols="12" sm="1">
					<v-btn type="submit" color="primary">추가</v-btn>
				</v-col>
			</v-form>
			<v-form @submit.prevent="submitSearchForm()" style="display:contents">
				<v-col cols="12" sm="2">
					<v-text-field v-model="searchText" label="검색어" style="margin:0;" :error-messages="$store.state.random.searchingMsg" />
				</v-col>
				<v-col cols="12" sm="2">
					<v-btn color="primary" type="submit">검색</v-btn>
					<v-btn color="secondary" @click="loadRandom">되돌리기</v-btn>
				</v-col>
			</v-form>
		</v-row>

		<v-row>
			<v-col cols="12">
				<v-simple-table dense fixed-header height="700px">
					<template v-slot:default>
						<thead>
							<tr>
								<th>
									<v-btn v-if="sortedTarget" small fab @click="onClickOrigin"> 원래<br />대로 </v-btn>
								</th>
								<th>
									<v-checkbox color="secondary" v-model="checkAll"></v-checkbox>
								</th>
								<th @click="onClickSort('status')">
									상태
									<span v-if="'status' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('keyword')">
									작업키워드
									<span v-if="'keyword' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('search_tool')">
									검색도구
									<span v-if="'search_tool' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('created_at')">
									생성일
									<span v-if="'created_at' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('target_amount')">
									목표량
									<span v-if="'target_amount' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(target, idx) in $store.state.random.randomKeywords" :key="target.id">
								<td>{{ idx + 1 }}</td>
								<td>
									<v-checkbox v-model="target.check" @change="howManyChecked"></v-checkbox>
								</td>
								<td>
									<v-btn fab x-small :color="target.status == 1 ? 'success' : 'error'" @click="changeStatus(target.id)"></v-btn>
								</td>
								<td>
									{{ target.keyword }}
									<br />
									{{ target.keyword_typing }}
								</td>
								<td>{{ target.search_tool }}</td>
								<td>{{ target.created_at | formatDate }}</td>
								<td>{{ target.target_amount }}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
		</v-row>
		<div class="text-center">
			<v-pagination v-model="page" :length="lastPage" :total-visible="7"></v-pagination>
		</div>
		<div class="subMenu" :class="checked >= 1 ? '-on' : '-off'">
			{{ checked }} 개의 데이터가 선택되었습니다. <br /><br />
			<v-btn color="error" @click="onClickDelete">삭제</v-btn>
			&nbsp;
			<v-btn fab x-small color="success" @click="changeMultipleStatus(true)">on</v-btn>
			&nbsp;
			<v-btn fab x-small color="error" @click="changeMultipleStatus(false)">off</v-btn>
		</div>
	</div>
</template>

<script>
import Inko from 'inko';
let inko = new Inko();

export default {
	data() {
		return {
			form: {
				keywords: '',
			},
			selectedTarget: null,
			page: 1,
			checkAll: false,
			checked: 0,
			sortedTarget: null,
			sortedType: 'ascend', //ascend, descend
		};
	},
	computed: {
		lastPage() {
			return this.$store.state.random.last_page;
		},
	},
	watch: {
		page: function(newVal) {
			const access_token = this.$cookie.get('access_token');
			if (access_token) {
				this.$router.replace('random-keyword?page=' + newVal);
				this.$store.dispatch('random/loadRandomKeywords', { access_token, page: newVal });
			}
			this.checked = 0;
		},
		checkAll: function(newVal) {
			this.$store.state.random.randomKeywords.forEach(e => {
				e.check = newVal;
			});
			this.howManyChecked();
		},
	},
	methods: {
		ko2en(word) {
			return inko.ko2en(word);
		},
		onClickOrigin() {
			this.$store.state.random.randomKeywords = JSON.parse(JSON.stringify(this.$store.state.random.randomKeywords_origin));
			this.sortedTarget = null;
		},
		onClickSort(target) {
			if (this.sortedTarget == target) {
				this.sortedType = this.sortedType === 'ascend' ? 'descend' : 'ascend';
			} else {
				this.sortedTarget = target;
				this.sortedType = 'descend';
			}
			this.$store.state.random.randomKeywords.sort((a, b) => {
				if (this.sortedType === 'ascend') {
					return a[this.sortedTarget] > b[this.sortedTarget] ? 1 : -1;
				} else {
					return a[this.sortedTarget] < b[this.sortedTarget] ? 1 : -1;
				}
			});
		},
		getCheckedDatas() {
			let data = [];
			this.$store.state.random.randomKeywords.forEach(e => {
				if (e.check) {
					data.push(e.id);
				}
			});
			return data;
		},
		onClickDelete() {
			const data = this.getCheckedDatas();
			if (data.length <= 0) {
				return false;
			}
			if (confirm(data.length + ' 개의 데이터를 정말 삭제하시겠습니까?')) {
				const access_token = this.$cookie.get('access_token');
				let page = this.$route.query.page;
				this.$store.dispatch('random/deleteRandomKeyword', { data, access_token, page });
				this.unCheckEverything();
			}
		},
		submitSearchForm() {
			const access_token = this.$cookie.get('access_token');
			const text = this.searchText;
			this.$store.dispatch('random/searchRandomKeywords', { access_token, text });
		},
		submitKeywords() {
			let data = [];
			const inputData = this.form.keywords.split('\n');
			inputData.forEach(d => {
				const text = d.trim();
				if (text) {
					data.push({
						keyword: text,
						keyword_typing: this.ko2en(text),
					});
				}
			});
			if (data.length <= 0) {
				return false;
			}
			const access_token = this.$cookie.get('access_token');
			const page = Number(this.$route.query.page);
			this.$store.dispatch('random/createRandomKeywords', { data, access_token, page });
			this.form.keywords = '';
		},
		changeStatus(id) {
			const access_token = this.$cookie.get('access_token');
			this.$store.dispatch('random/changeStatus', { id, access_token });
		},
		changeMultipleStatus(status) {
			const data = this.getCheckedDatas();
			if (data.length <= 0) {
				return false;
			}
			if (confirm(data.length + ` 개의 데이터의 상태를 ${status ? 'ON' : 'OFF'}으로 변경하시겠습니까?`)) {
				const access_token = this.$cookie.get('access_token');
				const page = this.$route.query.page;
				this.$store.dispatch('random/changeMultipleStatus', { status, data, access_token, page });
			}
		},
		howManyChecked() {
			let cnt = 0;
			this.$store.state.random.randomKeywords.forEach(e => {
				if (e.check) {
					cnt++;
				}
			});
			this.checked = cnt;
		},
		unCheckEverything() {
			if (this.checkAll) {
				this.checkAll = false;
			} else {
				this.$store.state.random.randomKeywords.forEach(e => {
					e.check = false;
				});
			}
			this.checked = 0;
		},
		loadRandom() {
			this.searchText = null;
			const access_token = this.$cookie.get('access_token');
			const page = this.$route.query.page;
			this.$store.dispatch('random/loadRandomKeywords', { access_token, page });
		},
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		let page = this.$route.query.page;
		page ? (this.page = Number(page)) : this.$router.push('/random-keyword?page=1');
		if (access_token) {
			this.$store.dispatch('random/loadRandomKeywords', { access_token, page });
		}
	},
};
</script>

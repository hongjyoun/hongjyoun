<template>
	<div>
		<v-form @submit.prevent="submitSearchForm()">
			<v-row style="justify-content:center;">
				<v-col cols="12" sm="2">
					<v-text-field v-model="searchText" label="검색어" style="margin:0;" :error-messages="$store.state.content.searchingMsg" />
				</v-col>
				<v-col cols="12" sm="2">
					<v-btn color="primary" type="submit">검색</v-btn>
					<v-btn color="secondary" @click="loadContents">되돌리기</v-btn>
				</v-col>
			</v-row>
		</v-form>
		<v-row>
			<v-col cols="12">
				<v-simple-table dense fixed-header height="750px">
					<template v-slot:default>
						<thead>
							<tr>
								<th>
									<v-btn v-if="sortedTarget" small fab @click="onClickOrigin"> 원래<br />대로 </v-btn>
								</th>
								<th>
									<v-checkbox color="secondary" v-model="checkAll"></v-checkbox>
								</th>
								<th @click="onClickSort('content_title')">
									컨텐츠
									<span v-if="'content_title' === sortedTarget">
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
								<th>작업키워드</th>
								<th @click="onClickSort('during_time')">
									체류시간 (초)
									<span v-if="'during_time' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('created_at')">
									작업시작일
									<span v-if="'created_at' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(target, idx) in $store.state.content.contents" :key="target.id">
								<template v-if="!selectedTarget || selectedTarget.id !== target.id">
									<td>{{ idx + 1 }}</td>
									<td>
										<v-checkbox v-model="target.check" @change="howManyChecked"></v-checkbox>
									</td>
									<td>
										{{ target.content_title }}
									</td>
									<td>
										{{ target.search_tool }}
									</td>
									<td>
										<div v-for="keyword in target.keywords" :key="keyword.id">{{ keyword.search_tool }} | {{ keyword.keyword }}</div>
									</td>
									<td>{{ target.during_time }}</td>
									<td>{{ target.created_at | formatDate }}</td>
									<td>
										<v-icon class="mr-2" @click="onClickEdit(target)">
											mdi-pencil
										</v-icon>
									</td>
								</template>
								<template v-else>
									<td>{{ idx + 1 }}</td>
									<td>
										{{ target.check }}
									</td>
									<td>
										<v-text-field v-model="selectedTarget.content_title" label="컨텐츠" />
									</td>
									<td>
										<v-autocomplete v-model="selectedTarget.search_tool" :items="['google', 'youtube']" small-chips label="검색도구" deletable-chips />
									</td>
									<td>
										<div v-for="keyword in target.keywords" :key="keyword.id">{{ keyword.search_tool }} | {{ keyword.keyword }}</div>
									</td>
									<td>
										<v-text-field v-model="selectedTarget.during_time" label="체류시간" type="number" />
									</td>
									<td>{{ target.created_at | formatDate }}</td>
									<td>
										<v-btn color="primary" small @click="submitEdit">수정</v-btn>&nbsp;
										<v-btn color="warning" small @click="selectedTarget = null">취소</v-btn>
									</td>
								</template>
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
		</div>
		<div style="position:fixed; bottom:0; left:0;">
			<v-btn x-large color="primary" @click="dialog = !dialog">추가</v-btn>
		</div>
		<div style="position:fixed; bottom:0; right:0; padding:20px;">{{ $store.state.content.contents.length }}개</div>
		<v-dialog v-model="dialog" light max-width="900px">
			<v-card>
				<v-card-title>
					<span class="headline">컨텐츠 추가</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form @submit.prevent="submitContent" style="display:contents">
							<v-row>
								<v-col cols="12" sm="4">
									<v-text-field v-model="form.content_title" label="컨텐츠" />
								</v-col>
								<v-col cols="12" sm="4">
									<v-autocomplete v-model="form.search_tool" :items="['google', 'youtube']" small-chips label="검색도구" deletable-chips />
								</v-col>
								<v-col cols="12" sm="4">
									<v-text-field v-model="form.during_time" label="체류시간" type="number" />
								</v-col>
							</v-row>
							<v-row style="justify-content:center;">
								<v-btn large color="primary" type="submit">저장</v-btn>
							</v-row>
						</v-form>
					</v-container>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { checkForm } from '@/utils/check';
export default {
	data() {
		return {
			searchText: null,
			form: {
				content_title: '',
				search_tool: '',
				during_time: '',
			},
			selectedTarget: null,
			page: 1,
			checkAll: false,
			checked: 0,
			dialog: false,
			sortedTarget: null,
			sortedType: 'ascend', //ascend, descend
		};
	},
	computed: {
		lastPage() {
			return this.$store.state.content.last_page;
		},
	},
	watch: {
		page: function(newVal) {
			const access_token = this.$cookie.get('access_token');
			if (access_token) {
				this.$router.replace('content?page=' + newVal);
				this.$store.dispatch('content/loadContents', { access_token, page: newVal });
			}
			this.checked = 0;
		},
		checkAll: function(newVal) {
			this.$store.state.content.contents.forEach(e => {
				e.check = newVal;
			});
			this.howManyChecked();
		},
	},
	methods: {
		onClickOrigin() {
			this.$store.state.content.contents = JSON.parse(JSON.stringify(this.$store.state.content.contents_origin));
			this.sortedTarget = null;
		},
		onClickSort(target) {
			if (this.sortedTarget == target) {
				this.sortedType = this.sortedType === 'ascend' ? 'descend' : 'ascend';
			} else {
				this.sortedTarget = target;
				this.sortedType = 'descend';
			}
			this.$store.state.content.contents.sort((a, b) => {
				if (this.sortedType === 'ascend') {
					return a[this.sortedTarget] > b[this.sortedTarget] ? 1 : -1;
				} else {
					return a[this.sortedTarget] < b[this.sortedTarget] ? 1 : -1;
				}
			});
		},
		onClickDelete() {
			let data = [];
			this.$store.state.content.contents.forEach(e => {
				if (e.check) {
					data.push(e.id);
				}
			});
			if (data.length <= 0) {
				return false;
			}
			if (confirm(data.length + ' 개의 데이터를 정말 삭제하시겠습니까?')) {
				const access_token = this.$cookie.get('access_token');
				this.$store.dispatch('content/deleteContent', { data, access_token });
				this.unCheckEverything();
			}
		},
		onClickEdit(target) {
			this.selectedKeywords = [];
			this.selectedTarget = JSON.parse(JSON.stringify(target));
			this.selectedTarget.keywords.forEach(e => {
				this.selectedKeywords.push(Number(e.id));
			});
		},
		submitSearchForm() {
			const access_token = this.$cookie.get('access_token');
			const text = this.searchText;
			this.$store.dispatch('content/searchContents', { access_token, text });
		},
		submitContent() {
			if (!checkForm(this.form)) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}
			const data = JSON.parse(JSON.stringify(this.form));
			const access_token = this.$cookie.get('access_token');
			const page = Number(this.$route.query.page);
			this.$store.dispatch('content/createContent', { data, access_token, page });
			this.form.content_title = '';
			this.form.search_tool = '';
			this.form.during_time = '';
			this.dialog = false;
		},
		submitEdit() {
			let data = {
				id: this.selectedTarget.id,
				content_title: this.selectedTarget.content_title,
				search_tool: this.selectedTarget.search_tool,
				during_time: this.selectedTarget.during_time,
			};
			if (!checkForm(data)) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}
			const access_token = this.$cookie.get('access_token');
			const page = this.$route.query.page;
			this.$store.dispatch('content/editContent', { data, access_token, page });
			this.selectedTarget = null;
		},
		howManyChecked() {
			let cnt = 0;
			this.$store.state.content.contents.forEach(e => {
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
				this.$store.state.content.contents.forEach(e => {
					e.check = false;
				});
			}
			this.checked = 0;
		},
		loadContents() {
			this.searchText = null;
			const access_token = this.$cookie.get('access_token');
			const page = this.$route.query.page;
			this.$store.dispatch('content/loadContents', { access_token, page });
		},
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		let page = this.$route.query.page;
		page ? (this.page = Number(page)) : this.$router.push('/content?page=1');
		if (access_token) {
			this.$store.dispatch('content/loadContents', { access_token, page });
			this.$store.dispatch('target/loadTargetKeywords', { access_token });
		}
	},
};
</script>

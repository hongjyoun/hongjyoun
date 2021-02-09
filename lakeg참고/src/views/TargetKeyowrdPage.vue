<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-btn text small :color="showEverything == 1 ? 'success' : 'error'" @click="toggleShowingFilter">
					전체보기
				</v-btn>
			</v-col>
			<v-col cols="12">
				<v-simple-table dense fixed-header height="750px">
					<template v-slot:default>
						<thead>
							<tr>
								<th>
									<v-btn v-if="filter || sortedTarget" small fab @click="onClickOrigin"> 원래<br />대로 </v-btn>
								</th>
								<th @click="onClickSort('status')">
									상태
									<span v-if="'status' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('group_name')">
									키워드그룹
									<span v-if="'group_name' === sortedTarget">
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
								<!-- <th @click="onClickSort('status')">작업키워드(영문)</th> -->
								<th>컨텐츠</th>
								<th @click="onClickSort('search_tool')">
									검색도구
									<span v-if="'search_tool' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('started_at')">
									시작일
									<span v-if="'started_at' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('stopped_at')">
									종료일
									<span v-if="'stopped_at' === sortedTarget">
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
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(target, idx) in $store.state.target.targetKeywords" :key="target.id">
								<template v-if="!selectedTarget || selectedTarget.id !== target.id">
									<td>{{ idx + 1 }}</td>
									<td>
										<v-btn fab x-small :color="target.status == 1 ? 'success' : 'error'" @click="changeStatus(target.id)"></v-btn>
									</td>
									<td>
										<div v-for="group in target.keyword_groups" :key="group.id" class="-hoverable" @click="onClickFilter(target)">{{ group.group_name }}</div>
									</td>
									<td>
										{{ target.keyword }}
										<br />
										{{ target.keyword_typing }}
									</td>
									<!-- <td>{{ target.keyword_typing }}</td> -->
									<td>
										<div v-for="content in target.contents" :key="content.id">{{ content.content_title }}, 체류시간: {{ content.during_time }}</div>
									</td>
									<td>{{ target.search_tool }}</td>
									<td>{{ target.started_at | formatDate }}</td>
									<td>{{ target.stopped_at | formatDate }}</td>
									<td>{{ target.target_amount }}</td>
									<td>
										<v-icon class="mr-2" @click="onClickEdit(target)">
											mdi-pencil
										</v-icon>
										<v-icon @click="onClickDelete(target.id)">
											mdi-delete
										</v-icon>
									</td>
								</template>
								<template v-else>
									<td>{{ idx + 1 }}</td>
									<td>
										<v-btn fab x-small :color="target.status == 1 ? 'success' : 'error'"></v-btn>
									</td>
									<td>
										<v-autocomplete
											v-model="selectedGroup"
											:items="$store.state.target.keywordsGroup"
											item-text="group_name"
											item-value="id"
											small-chips
											label="키워드그룹"
											multiple
											deletable-chips
										></v-autocomplete>
									</td>
									<td>
										<input class="editInput" type="text" v-model="selectedTarget.keyword" />
										<br />
										<input class="editInput" type="text" :value="ko2en(selectedTarget.keyword)" readonly />
									</td>
									<td>
										<v-autocomplete
											v-model="selectedContents"
											:items="$store.state.target.contents"
											item-text="content_title"
											item-value="id"
											small-chips
											label="컨텐츠"
											multiple
											deletable-chips
										></v-autocomplete>
									</td>
									<td>
										<v-autocomplete v-model="selectedTarget.search_tool" :items="['youtube', 'google']" small-chips label="검색도구" deletable-chips></v-autocomplete>
									</td>
									<td>{{ target.started_at | formatDate }}</td>
									<td>{{ target.stopped_at | formatDate }}</td>
									<td><input class="editInput" type="text" v-model="selectedTarget.target_amount" /></td>
									<td>총 작업량</td>
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
		<div style="position:fixed; bottom:0; left:0;">
			<v-btn x-large color="primary" @click="dialog = !dialog">추가</v-btn>
		</div>
		<div style="position:fixed; bottom:0; right:0; padding:20px;">{{ $store.state.target.targetKeywords.length }}개</div>
		<v-dialog v-model="dialog" light max-width="900px">
			<v-card>
				<v-card-title>
					<span class="headline">타겟키워드 추가</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form @submit.prevent="submitKeywords" style="display:contents">
							<v-row>
								<v-col cols="12" sm="3">
									<v-text-field v-model="form.keyword" label="작업키워드" />
								</v-col>

								<v-col cols="12" sm="3">
									<v-text-field :value="keyword_typing" label="작업키워드(영문)" readonly />
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="4">
									<v-autocomplete
										v-model="form.keyword_group"
										:items="$store.state.target.keywordsGroup"
										item-text="group_name"
										item-value="id"
										small-chips
										label="키워드그룹"
										multiple
										deletable-chips
									></v-autocomplete>
								</v-col>

								<v-col cols="12" sm="8">
									<v-autocomplete
										v-model="form.contents"
										:items="$store.state.target.contents"
										item-text="content_title"
										item-value="id"
										small-chips
										label="컨텐츠"
										multiple
										deletable-chips
									></v-autocomplete>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="3">
									<v-autocomplete v-model="form.search_tool" :items="['youtube', 'google']" small-chips label="검색도구" deletable-chips></v-autocomplete>
								</v-col>
								<v-col cols="12" sm="3">
									<v-text-field v-model="form.target_amount" label="목표량" type="number" />
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
import Inko from 'inko';
let inko = new Inko();

export default {
	data() {
		return {
			form: {
				keyword: '',
				search_tool: '',
				target_amount: '',
				keyword_group: [],
				contents: [],
			},
			page: 1,
			selectedTarget: null,
			selectedGroup: [],
			selectedContents: [],
			newGroup: '',
			dialog: false,
			filter: false,
			sortedTarget: null,
			sortedType: 'ascend', //ascend, descend
			showEverything: 0,
		};
	},
	computed: {
		keyword_typing() {
			return this.ko2en(this.form.keyword);
		},
		lastPage() {
			let temp = 1;
			if (this.$store.state.target) {
				temp = this.$store.state.target.last_page;
			}
			return temp;
		},
	},
	watch: {
		page: function(newVal) {
			const access_token = this.$cookie.get('access_token');
			if (access_token) {
				this.$router.replace(`target-keyword?page=${newVal}&all=${this.showEverything}`);
				this.$store.dispatch('target/loadTargetKeywords', { access_token, page: newVal, all: this.showEverything });
			}
		},
		showEverything: function(newVal) {
			const access_token = this.$cookie.get('access_token');
			if (access_token) {
				this.$router.replace(`target-keyword?page=${this.page}&all=${newVal}`);
				this.$store.dispatch('target/loadTargetKeywords', { access_token, page: this.page, all: newVal });
			}
		},
	},
	methods: {
		toggleShowingFilter() {
			this.showEverything = this.showEverything == 1 ? 0 : 1;
		},
		ko2en(word) {
			return inko.ko2en(word);
		},
		onClickSort(target) {
			if (this.sortedTarget == target) {
				this.sortedType = this.sortedType === 'ascend' ? 'descend' : 'ascend';
			} else {
				this.sortedTarget = target;
				this.sortedType = 'descend';
			}
			if (target === 'group_name') {
				this.$store.state.target.targetKeywords.sort((a, b) => {
					if (this.sortedType === 'ascend') {
						return a.keyword_groups[0][this.sortedTarget] > b.keyword_groups[0][this.sortedTarget] ? 1 : -1;
					} else {
						return a.keyword_groups[0][this.sortedTarget] < b.keyword_groups[0][this.sortedTarget] ? 1 : -1;
					}
				});
			} else {
				this.$store.state.target.targetKeywords.sort((a, b) => {
					if (this.sortedType === 'ascend') {
						if (!b[this.sortedTarget]) {
							return 1;
						} else {
							return a[this.sortedTarget] > b[this.sortedTarget] ? 1 : -1;
						}
					} else {
						if (!a[this.sortedTarget]) {
							return 1;
						} else {
							return a[this.sortedTarget] < b[this.sortedTarget] ? 1 : -1;
						}
					}
				});
			}
		},
		onClickEdit(target) {
			let group = [];
			let contents = [];
			this.selectedTarget = JSON.parse(JSON.stringify(target));
			this.selectedTarget.keyword_groups.forEach(e => {
				group.push(e.id);
			});
			this.selectedTarget.contents.forEach(e => {
				contents.push(e.id);
			});
			this.selectedGroup = group;
			this.selectedContents = contents;
		},
		onClickDelete(id) {
			if (confirm('정말 삭제하시겠습니까?')) {
				const access_token = this.$cookie.get('access_token');
				this.$store.dispatch('target/deleteTargetKeyword', { id, access_token });
			}
		},
		clearAddForm() {
			this.form.keyword = '';
			this.form.search_tool = '';
			this.form.target_amount = '';
			this.form.keyword_group = [];
			this.form.contents = [];
		},
		submitKeywords() {
			if (this.form.keyword === '' || this.form.search_tool === '' || this.form.target_amount === '' || this.form.keyword_group.length <= 0) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}

			this.form.keyword_typing = this.keyword_typing;
			let data = JSON.parse(JSON.stringify(this.form));
			const access_token = this.$cookie.get('access_token');
			this.$store.dispatch('target/createTargetKeyword', { data, access_token });
			this.clearAddForm();
			this.dialog = false;
		},
		submitGroup() {
			if (this.newGroup) {
				this.$store.commit('popSnack', { color: 'warning', msg: '그룹명을 입력해주세요' });
				return false;
			}
			this.newGroup = '';
		},
		submitEdit() {
			let data = {
				id: this.selectedTarget.id,
				keyword: this.selectedTarget.keyword,
				keyword_typing: this.ko2en(this.selectedTarget.keyword),
				search_tool: this.selectedTarget.search_tool,
				target_amount: this.selectedTarget.target_amount,
				keyword_group: [],
				contents: [],
			};
			const page = Number(this.$route.query.page);
			const access_token = this.$cookie.get('access_token');
			this.selectedContents.forEach(e => {
				data.contents.push(e);
			});
			this.selectedGroup.forEach(e => {
				data.keyword_group.push(e);
			});
			let checkData = {
				id: data.id,
				keyword: data.keyword,
				keyword_typing: data.keyword_typing,
				search_tool: data.search_tool,
				target_amount: data.target_amount,
				keyword_group: data.keyword_group,
			};
			if (!checkForm(checkData)) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}
			this.$store.dispatch('target/editTargetKeyword', { data, access_token, page });
			this.selectedTarget = null;
			this.selectedGroup = [];
			this.selectedContents = [];
		},
		changeStatus(id) {
			const access_token = this.$cookie.get('access_token');
			this.$store.dispatch('target/changeStatus', { id, access_token });
		},
		onClickFilter(target) {
			const keywordGroupId = target.keyword_groups[0].id;
			this.$store.state.target.targetKeywords = this.$store.state.target.targetKeywords_origin.filter(e => e.keyword_groups[0].id == keywordGroupId);
			this.filter = true;
		},
		onClickOrigin() {
			this.$store.state.target.targetKeywords = JSON.parse(JSON.stringify(this.$store.state.target.targetKeywords_origin));
			this.filter = false;
			this.sortedTarget = null;
		},
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		let str = '/target-keyword';

		if (this.$route.query.page) {
			this.page = Number(this.$route.query.page);
			str += `?page=${this.$route.query.page}`;
		} else {
			this.page = 1;
			str += `?page=1`;
		}

		if (this.$route.query.all == 1) {
			this.showEverything = 1;
			str += `&all=1`;
		} else {
			this.showEverything = 0;
			str += `&all=0`;
		}

		this.$router.push(str);
		if (access_token) {
			this.$store.dispatch('target/loadTargetKeywords', { access_token, page: this.page, all: this.showEverything });
			this.$store.dispatch('target/loadKeywordsGroup', access_token);
			this.$store.dispatch('target/loadContents', access_token);
		}
	},
};
</script>
<style scoped>
.-hoverable:hover {
	color: dodgerblue;
	cursor: pointer;
}
</style>

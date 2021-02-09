<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-simple-table dense fixed-header height="850px">
					<template v-slot:default>
						<thead>
							<tr>
								<th>
									<v-btn v-if="sortedTarget" small fab @click="onClickOrigin"> 원래<br />대로 </v-btn>
								</th>
								<th>
									<v-checkbox color="secondary" v-model="checkAll"></v-checkbox>
								</th>
								<th @click="onClickSort('keyword')">
									작업키워드
									<span v-if="'keyword' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th>연관키워드</th>
								<th @click="onClickSort('search_tool')">
									검색도구
									<span v-if="'search_tool' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(target, idx) in $store.state.relation.relationKeywords" :key="target.id">
								<template v-if="!selectedTarget || selectedTarget.id !== target.id">
									<td>{{ idx + 1 }}</td>
									<td>
										<v-checkbox v-model="target.check" @change="howManyChecked"></v-checkbox>
									</td>
									<td>
										{{ target.keyword }}
										<br />
										{{ target.keyword_typing }}
									</td>
									<td>
										<div v-for="rel in target.related_keywords_all" :key="rel.id">
											<v-btn fab x-small :color="rel.pivot.active == 1 ? 'success' : 'error'" @click="changeStatus(target, rel)"></v-btn>
											{{ rel.keyword }}
										</div>
									</td>
									<td>{{ target.search_tool }}</td>
									<td>
										<v-icon class="mr-2" @click="onClickEdit(target)">
											mdi-pencil
										</v-icon>
									</td>
								</template>
								<template v-else>
									<td>{{ idx + 1 }}</td>
									<td>{{ target.check }}</td>
									<td>
										{{ target.keyword }}
										<br />
										{{ target.keyword_typing }}
									</td>
									<td>
										<v-autocomplete
											v-model="selectedRel"
											:items="$store.state.target.targetKeywords"
											item-text="keyword"
											item-value="id"
											small-chips
											label="연관키워드"
											multiple
											deletable-chips
										></v-autocomplete>
									</td>
									<td>{{ target.search_tool }}</td>
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
		<div class="subMenu" :class="checked >= 1 ? '-on' : '-off'">
			{{ checked }} 개의 데이터가 선택되었습니다. <br /><br />
			<v-btn color="error" @click="onClickDelete">삭제</v-btn>
		</div>
		<div style="position:fixed; bottom:0; left:0;">
			<v-btn x-large color="primary" @click="dialog = !dialog">추가</v-btn>
		</div>
		<v-dialog v-model="dialog" light max-width="900px">
			<v-card>
				<v-card-title>
					<span class="headline">연관키워드 추가</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form @submit.prevent="submitKeywords" style="display:contents">
							<v-row>
								<v-col cols="12" sm="6">
									<v-autocomplete v-model="form.id" :items="$store.state.target.targetKeywords" item-text="keyword" item-value="id" small-chips label="작업키워드" deletable-chips></v-autocomplete>
								</v-col>
								<v-col cols="12" sm="6">
									<v-autocomplete
										v-model="form.related_keyword_id"
										:items="$store.state.target.targetKeywords"
										item-text="keyword"
										item-value="id"
										small-chips
										label="연관키워드"
										multiple
										deletable-chips
									></v-autocomplete>
								</v-col>
							</v-row>
							<v-row style="justify-content:center;">
								<v-btn type="submit" color="primary">추가</v-btn>
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
			form: {
				id: '',
				related_keyword_id: [],
			},
			selectedTarget: null,
			selectedRel: [],
			page: 1,
			checkAll: false,
			checked: 0,
			dialog: false,
			sortedTarget: null,
			sortedType: 'ascend', //ascend, descend
		};
	},
	watch: {
		checkAll: function(newVal) {
			this.$store.state.relation.relationKeywords.forEach(e => {
				e.check = newVal;
			});
			this.howManyChecked();
		},
	},
	methods: {
		onClickOrigin() {
			this.$store.state.relation.relationKeywords = JSON.parse(JSON.stringify(this.$store.state.relation.relationKeywords_origin));
			this.sortedTarget = null;
		},
		onClickSort(target) {
			if (this.sortedTarget == target) {
				this.sortedType = this.sortedType === 'ascend' ? 'descend' : 'ascend';
			} else {
				this.sortedTarget = target;
				this.sortedType = 'descend';
			}
			this.$store.state.relation.relationKeywords.sort((a, b) => {
				if (this.sortedType === 'ascend') {
					return a[this.sortedTarget] > b[this.sortedTarget] ? 1 : -1;
				} else {
					return a[this.sortedTarget] < b[this.sortedTarget] ? 1 : -1;
				}
			});
		},
		onClickDelete() {
			let data = [];
			this.$store.state.relation.relationKeywords.forEach(e => {
				if (e.check) {
					let temp = {
						id: e.id,
						related_keyword_id: [],
					};
					e.related_keywords_all.forEach(r => {
						temp.related_keyword_id.push(r.id);
					});
					data.push(temp);
				}
			});
			if (data.length <= 0) {
				return false;
			}
			if (confirm(data.length + ' 개의 데이터를 정말 삭제하시겠습니까?')) {
				const access_token = this.$cookie.get('access_token');
				this.$store.dispatch('relation/deleteRelationKeywords', { data, access_token });
				this.unCheckEverything();
			}
		},
		onClickEdit(target) {
			this.selectedRel = [];
			this.selectedTarget = JSON.parse(JSON.stringify(target));

			this.selectedTarget.related_keywords_all.forEach(e => {
				this.selectedRel.push(Number(e.id));
			});
		},
		submitKeywords() {
			if (!checkForm(this.form)) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}
			const data = JSON.parse(JSON.stringify(this.form));
			const access_token = this.$cookie.get('access_token');
			this.$store.dispatch('relation/createRelationKeywords', { data, access_token });
			this.form.id = '';
			this.form.related_keyword_id = [];
			this.dialog = false;
		},
		submitEdit() {
			let data = {
				id: this.selectedTarget.id,
				related_keyword_id: [],
			};
			this.selectedRel.forEach(e => {
				data.related_keyword_id.push(e);
			});
			if (!checkForm(data)) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}
			const access_token = this.$cookie.get('access_token');
			this.$store.dispatch('relation/createRelationKeywords', { data, access_token });
			this.selectedTarget = null;
		},
		changeStatus(target, rel) {
			let data = {
				keyword_id: target.id,
				related_keyword_id: rel.id,
			};
			const access_token = this.$cookie.get('access_token');
			this.$store.dispatch('relation/changeStatus', { data, access_token });
		},
		howManyChecked() {
			let cnt = 0;
			this.$store.state.relation.relationKeywords.forEach(e => {
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
				this.$store.state.relation.relationKeywords.forEach(e => {
					e.check = false;
				});
			}
			this.checked = 0;
		},
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		this.$store.dispatch('relation/loadRelationKeywords', { access_token });
		this.$store.dispatch('target/loadTargetKeywords', { access_token });
	},
};
</script>

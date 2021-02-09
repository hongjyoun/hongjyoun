<template>
	<div>
		<v-row>
			<v-form @submit.prevent="submitGroup" style="display:contents">
				<v-col cols="12" sm="1">
					<v-autocomplete
						v-model="form.device_group_id"
						:items="$store.state.group.device_groups"
						item-text="group_name"
						item-value="id"
						small-chips
						label="기기 그룹"
						deletable-chips
						@change="onChangeDeviceGroup"
					></v-autocomplete>
				</v-col>
				<v-col cols="12" sm="2">
					<template v-if="form.device_group_id">
						<v-autocomplete
							v-model="form.keyword_group_id"
							:items="$store.state.group.keyword_groups"
							item-text="group_name"
							item-value="id"
							small-chips
							label="키워드 그룹"
							multiple
							deletable-chips
						></v-autocomplete>
					</template>
				</v-col>
				<v-col cols="12" sm="1">
					<v-btn type="submit" color="primary">추가 / 수정</v-btn>
				</v-col>
			</v-form>
			<v-form @submit.prevent="submitDeviceGroup" style="display:contents">
				<v-col cols="12" sm="1">
					<v-text-field v-model="newDeviceGroup" label="기기 그룹" />
				</v-col>
				<v-col cols="12" sm="1">
					<v-btn type="submit" color="secondary">
						기기 그룹 추가
					</v-btn>
				</v-col>
				<v-col cols="12" sm="1"></v-col>
			</v-form>
			<v-form @submit.prevent="submitKeywordGroup" style="display:contents">
				<v-col cols="12" sm="1"></v-col>
				<v-col cols="12" sm="1">
					<v-text-field v-model="newKeywordGroup" label="키워드 그룹" />
				</v-col>
				<v-col cols="12" sm="1">
					<v-text-field v-model="newKeywordGroup_keyword" label="키워드" />
				</v-col>
				<v-col cols="12" sm="1">
					<v-autocomplete v-model="newKeywordGroup_search_tool" :items="['google', 'youtube']" small-chips label="검색도구" deletable-chips />
				</v-col>
				<v-col cols="12" sm="1">
					<v-btn type="submit" color="secondary">
						키워드 그룹 추가
					</v-btn>
				</v-col>
			</v-form>
		</v-row>

		<v-row>
			<v-col cols="12" sm="4">
				<div>기기그룹 & 키워드그룹</div>
				<v-simple-table dense fixed-header height="700px">
					<template v-slot:default>
						<thead>
							<tr>
								<th></th>
								<th>기기그룹</th>
								<th>키워드그룹</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(target, idx) in $store.state.group.groups" :key="target.id">
								<template v-if="!selectedTarget.relation || selectedTarget.relation.id !== target.id">
									<td>{{ idx + 1 }}</td>
									<td>
										{{ target.device_group.group_name }}
									</td>
									<td>
										{{ target.keyword_group.group_name }}
									</td>
									<td>
										<!-- <v-icon class="mr-2" @click="onClickEdit(target, 'relation')">
											mdi-pencil
										</v-icon> -->
										<v-icon @click="onClickDeleteRelation(target)">
											mdi-delete
										</v-icon>
									</td>
								</template>
								<template v-else>
									<td>{{ idx + 1 }}</td>
									<td>
										{{ target.device_group.group_name }}
									</td>
									<td>
										{{ target.keyword_group.group_name }}
									</td>
									<td>
										<v-btn color="primary" small @click="submitEdit('relation')">수정</v-btn>&nbsp;
										<v-btn color="warning" small @click="selectedTarget.relation = null">취소</v-btn>
									</td>
								</template>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
			<v-col cols="12" sm="4">
				<div>기기그룹</div>
				<v-simple-table dense fixed-header height="700px">
					<template v-slot:default>
						<thead>
							<tr>
								<th></th>
								<th>그룹이름</th>
								<th>수량</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(target, idx) in $store.state.group.device_groups" :key="target.id">
								<template v-if="!selectedTarget.device || selectedTarget.device.id !== target.id">
									<td>{{ idx + 1 }}</td>
									<td>{{ target.group_name }}</td>
									<td>{{ target.device_count }}</td>
									<td>
										<v-icon class="mr-2" @click="onClickEdit(target, 'device')">
											mdi-pencil
										</v-icon>
										<v-icon @click="onClickDelete(target.id, 'device')">
											mdi-delete
										</v-icon>
									</td>
								</template>
								<template v-else>
									<td>{{ idx + 1 }}</td>
									<td>
										<v-text-field v-model="selectedTarget.device.group_name" label="기기 그룹" />
									</td>
									<td>{{ target.device_count }}</td>
									<td>
										<v-btn color="primary" small @click="submitEdit('device')">수정</v-btn>&nbsp;
										<v-btn color="warning" small @click="selectedTarget.device = null">취소</v-btn>
									</td>
								</template>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
			<v-col cols="12" sm="4">
				<div>키워드그룹</div>
				<v-simple-table dense fixed-header height="700px">
					<template v-slot:default>
						<thead>
							<tr>
								<th></th>
								<th>그룹이름</th>
								<th>키워드</th>
								<th>검색도구</th>
								<th>수량</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(target, idx) in $store.state.group.keyword_groups" :key="target.id">
								<template v-if="!selectedTarget.keyword || selectedTarget.keyword.id !== target.id">
									<td>{{ idx + 1 }}</td>
									<td>
										{{ target.group_name }}
									</td>
									<td>
										{{ target.keyword }}
									</td>
									<td>
										{{ target.search_tool }}
									</td>
									<td>{{ target.keywords_count }}</td>
									<td>
										<v-icon class="mr-2" @click="onClickEdit(target, 'keyword')">
											mdi-pencil
										</v-icon>
										<v-icon @click="onClickDelete(target.id, 'keyword')">
											mdi-delete
										</v-icon>
									</td>
								</template>
								<template v-else>
									<td>{{ idx + 1 }}</td>
									<td>
										<v-text-field v-model="selectedTarget.keyword.group_name" label="키워드 그룹" />
									</td>
									<td>
										<v-text-field v-model="selectedTarget.keyword.keyword" label="키워드" />
									</td>
									<td>
										<v-autocomplete v-model="selectedTarget.keyword.search_tool" :items="['google', 'youtube']" small-chips label="검색도구" deletable-chips />
									</td>
									<td>{{ target.keywords_count }}</td>
									<td>
										<v-btn color="primary" small @click="submitEdit('keyword')">수정</v-btn>&nbsp;
										<v-btn color="warning" small @click="selectedTarget.keyword = null">취소</v-btn>
									</td>
								</template>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { checkForm } from '@/utils/check';
export default {
	data() {
		return {
			form: {
				device_group_id: '',
				keyword_group_id: [],
			},
			newDeviceGroup: '',
			newKeywordGroup: '',
			newKeywordGroup_keyword: '',
			newKeywordGroup_search_tool: '',
			selectedTarget: {
				relation: null,
				device: null,
				keyword: null,
			},
		};
	},
	methods: {
		onChangeDeviceGroup() {
			if (this.form.device_group_id) {
				this.form.keyword_group_id = [];
				this.$store.state.group.groups.forEach(e => {
					if (e.device_group_id == this.form.device_group_id) {
						this.form.keyword_group_id.push(e.keyword_group_id);
					}
				});
			} else {
				this.form.keyword_group_id = [];
			}
		},
		onClickDeleteRelation(target) {
			if (confirm('정말 삭제하시겠습니까?')) {
				const access_token = this.$cookie.get('access_token');
				const data = {
					device_group_id: target.device_group_id,
					keyword_group_id: [target.keyword_group_id],
				};
				this.$store.dispatch('group/deleteGroupRelation', { data, type: 'relation', access_token });
			}
		},
		onClickDelete(id, type) {
			if (confirm('정말 삭제하시겠습니까?')) {
				const access_token = this.$cookie.get('access_token');
				this.$store.dispatch('group/deleteGroup', { id, type, access_token });
			}
		},
		onClickEdit(target, type) {
			this.selectedTarget[type] = null;
			this.selectedTarget[type] = JSON.parse(JSON.stringify(target));
		},
		submitGroup() {
			if (!checkForm(this.form)) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}
			const data = JSON.parse(JSON.stringify(this.form));
			const access_token = this.$cookie.get('access_token');
			this.$store.dispatch('group/createGroup', { data, access_token });
			this.form.device_group_id = '';
			this.form.keyword_group_id = [];
		},
		submitDeviceGroup() {
			const data = {
				group_name: this.newDeviceGroup,
			};
			if (!checkForm(data)) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}
			const access_token = this.$cookie.get('access_token');
			this.$store.dispatch('group/createDeviceGroup', { data, access_token });
			this.newDeviceGroup = '';
		},
		submitKeywordGroup() {
			const data = {
				group_name: this.newKeywordGroup,
				keyword: this.newKeywordGroup_keyword,
				search_tool: this.newKeywordGroup_search_tool,
			};
			if (!checkForm(data)) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}
			const access_token = this.$cookie.get('access_token');
			this.$store.dispatch('group/createKeywordGroup', { data, access_token });
			this.newKeywordGroup = '';
			this.newKeywordGroup_keyword = '';
			this.newKeywordGroup_search_tool = '';
		},
		submitEdit(type) {
			const access_token = this.$cookie.get('access_token');
			const data = this.selectedTarget[type];
			switch (type) {
				case 'relation':
					this.$store.dispatch('group/deditGroup', { data, access_token });
					break;
				case 'device':
					this.$store.dispatch('group/editDeviceGroup', { data, access_token });
					break;
				case 'keyword':
					this.$store.dispatch('group/editKeywordGroup', { data, access_token });
					break;
				default:
					break;
			}
			this.selectedTarget[type] = null;
		},
		howManyChecked() {
			let cnt = 0;
			this.$store.state.device.devices.forEach(e => {
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
				this.$store.state.device.devices.forEach(e => {
					e.check = false;
				});
			}
			this.checked = 0;
		},
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		this.$store.dispatch('group/loadGroups', { access_token });
		this.$store.dispatch('group/loadDeviceGroups', { access_token });
		this.$store.dispatch('group/loadKeywordGroups', { access_token });
	},
};
</script>

<template>
	<div>
		<v-form @submit.prevent="submitSearchForm()">
			<v-row style="justify-content:center;">
				<v-col cols="12" sm="2">
					<v-text-field v-model="searchText" label="검색어" style="margin:0;" :error-messages="$store.state.device.searchingMsg" />
				</v-col>
				<v-col cols="12" sm="2">
					<v-btn color="primary" type="submit">검색</v-btn>
					<v-btn color="secondary" @click="loadDevices">되돌리기</v-btn>
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
								<th @click="onClickSort('device_name')">
									이름
									<span v-if="'device_name' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('group_name')">
									기기 그룹
									<span v-if="'group_name' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('os')">
									os
									<span v-if="'os' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('login_verify')">
									로그인
									<span v-if="'login_verify' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('browser')">
									브라우저
									<span v-if="'browser' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('vpn_ddns')">
									vpn ddns
									<span v-if="'vpn_ddns' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('real_ip')">
									ip
									<span v-if="'real_ip' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('installed_area')">
									광역
									<span v-if="'installed_area' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('installed_local')">
									지역
									<span v-if="'installed_local' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('server_name')">
									서버이름
									<span v-if="'server_name' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('auto_start')">
									자동시작
									<span v-if="'auto_start' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th @click="onClickSort('memo')">
									메모
									<span v-if="'memo' === sortedTarget">
										<span v-if="sortedType === 'descend'">🔻</span>
										<span v-if="sortedType === 'ascend'">🔺</span>
									</span>
								</th>
								<th>관리</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(target, idx) in $store.state.device.devices" :key="target.id">
								<!-- <template v-if="!selectedTarget || selectedTarget.id !== target.id"> -->
								<template>
									<td>{{ idx + 1 }}</td>
									<td>
										{{ target.device_name }}
									</td>
									<td>
										<div v-if="target.device_group && target.device_group.id">{{ target.device_group.group_name }}</div>
									</td>
									<td>{{ target.os }}</td>
									<td>
										<div v-if="target.login_verify && target.login_verify != 0">
											{{ target.login_verify == 1 ? 'Y' : 'N' }}
										</div>
									</td>
									<td>{{ target.browser }}</td>
									<td>{{ target.vpn_ddns }}</td>
									<td>{{ target.real_ip }}</td>
									<td>{{ target.installed_area }}</td>
									<td>{{ target.installed_local }}</td>
									<td>{{ target.server_name }}</td>
									<td>
										<div v-if="target.auto_start || target.auto_start == 0">
											{{ target.auto_start == 1 ? 'Y' : 'N' }}
										</div>
									</td>
									<td>{{ target.memo }}</td>
									<td>
										<v-icon class="mr-2" @click="onClickEdit(target)">
											mdi-pencil
										</v-icon>
										<v-icon @click="onClickDelete(target)">
											mdi-delete
										</v-icon>
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
		<div style="position:fixed; bottom:0; right:0; padding:20px;">{{ $store.state.device.devices.length }}개</div>
		<!-- 기기 생성 -->
		<v-dialog v-model="dialog" light max-width="900px">
			<v-card>
				<v-card-title>
					<span class="headline">기기 추가</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form @submit.prevent="submitDevice" style="display:contents">
							<v-row>
								<v-col cols="12" sm="2">
									<v-text-field v-model="form.device_name" label="기기명" />
								</v-col>
								<v-col cols="12" sm="2">
									<v-autocomplete
										v-model="form.device_group_id"
										:items="$store.state.group.device_groups"
										item-text="group_name"
										item-value="id"
										small-chips
										label="기기 그룹"
										deletable-chips
									></v-autocomplete>
								</v-col>
								<v-col cols="12" sm="2">
									<v-autocomplete v-model="form.os" :items="['win10', 'android']" small-chips label="os" deletable-chips></v-autocomplete>
								</v-col>
								<v-col cols="12" sm="2">
									<v-select v-model="form.login_verify" label="로그인" :items="['Y', 'N']"> </v-select>
								</v-col>
								<v-col cols="12" sm="2">
									<v-autocomplete v-model="form.browser" :items="['chrome', 'edge', 'ie']" small-chips label="브라우저" deletable-chips></v-autocomplete>
								</v-col>
								<v-col cols="12" sm="2">
									<v-text-field v-model="form.vpn_ddns" label="vpn ddns" />
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" sm="2">
									<v-text-field v-model="form.real_ip" label="ip" />
								</v-col>
								<v-col cols="12" sm="2">
									<v-text-field v-model="form.installed_area" label="광역" />
								</v-col>
								<v-col cols="12" sm="2">
									<v-text-field v-model="form.installed_local" label="지역" />
								</v-col>
								<v-col cols="12" sm="2">
									<v-text-field v-model="form.memo" label="메모" />
								</v-col>
								<v-col cols="12" sm="2">
									<v-text-field v-model="form.server_name" label="서버이름" />
								</v-col>
								<v-col cols="12" sm="2">
									<v-select v-model="form.auto_start" label="자동시작" :items="['Y', 'N']"> </v-select>
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
		<!-- 기기 수정 -->
		<v-dialog v-model="editDialog" light max-width="900px">
			<v-card>
				<v-card-title>
					<span class="headline">기기 수정</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form @submit.prevent="submitEdit" style="display:contents">
							<div v-if="selectedTarget">
								<v-row> ID: {{ selectedTarget.id }} 기기이름: {{ selectedTarget.device_name }} </v-row>
								<v-row>
									<v-col cols="12" sm="3">
										<v-autocomplete
											v-model="selectedTarget.device_group_id"
											:items="$store.state.group.device_groups"
											item-text="group_name"
											item-value="id"
											small-chips
											label="기기 그룹"
											deletable-chips
										></v-autocomplete>
									</v-col>
									<v-col cols="12" sm="2">
										<v-autocomplete v-model="selectedTarget.os" :items="['win10', 'android']" small-chips label="os" deletable-chips></v-autocomplete>
									</v-col>
									<v-col cols="12" sm="2">
										<select style="border:1px solid black;" v-model="selectedTarget.login_verify">
											<option style="color:black;" value="">로그인</option>
											<option style="color:black;" value="1">Y</option>
											<option style="color:black;" value="0">N</option>
										</select>
									</v-col>
									<v-col cols="12" sm="2">
										<v-autocomplete v-model="selectedTarget.browser" :items="['chrome', 'edge', 'ie']" small-chips label="브라우저" deletable-chips></v-autocomplete>
									</v-col>
									<v-col cols="12" sm="2">
										<v-text-field v-model="selectedTarget.vpn_ddns" label="vpn ddns" />
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="2">
										<v-text-field v-model="selectedTarget.real_ip" label="ip" />
									</v-col>
									<v-col cols="12" sm="2">
										<v-text-field v-model="selectedTarget.installed_area" label="광역" />
									</v-col>
									<v-col cols="12" sm="2">
										<v-text-field v-model="selectedTarget.installed_local" label="지역" />
									</v-col>
									<v-col cols="12" sm="2">
										<v-text-field v-model="selectedTarget.memo" label="메모" />
									</v-col>
									<v-col cols="12" sm="2">
										<v-text-field v-model="selectedTarget.server_name" label="서버이름" />
									</v-col>
									<v-col cols="12" sm="2">
										<select style="border:1px solid black;" v-model="selectedTarget.auto_start">
											<option style="color:black;" value="">자동시작</option>
											<option style="color:black;" value="1">Y</option>
											<option style="color:black;" value="0">N</option>
										</select>
									</v-col>
								</v-row>
								<v-row style="justify-content:center;">
									<v-btn large color="primary" type="submit">저장</v-btn>
								</v-row>
							</div>
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
				device_name: '',
				device_group_id: '',
				os: '',
				login_verify: '',
				browser: '',
				vpn_ddns: '',
				real_ip: '',
				installed_area: '',
				installed_local: '',
				memo: '',
				auto_start: '',
				server_name: '',
			},
			selectedTarget: null,
			page: 1,
			dialog: false,
			editDialog: false,
			sortedTarget: null,
			sortedType: 'ascend', //ascend, descend
		};
	},
	computed: {
		lastPage() {
			return this.$store.state.device.last_page;
		},
	},
	watch: {
		page: function(newVal) {
			const access_token = this.$cookie.get('access_token');
			if (access_token) {
				this.$router.replace('device?page=' + newVal);
				this.$store.dispatch('device/loadDevices', { access_token, page: newVal });
			}
		},
	},
	methods: {
		onClickOrigin() {
			this.$store.state.device.devices = JSON.parse(JSON.stringify(this.$store.state.device.devices_origin));
			this.sortedTarget = null;
		},
		onClickSort(target) {
			if (this.sortedTarget == target) {
				this.sortedType = this.sortedType === 'ascend' ? 'descend' : 'ascend';
			} else {
				this.sortedTarget = target;
				this.sortedType = 'descend';
			}
			if (target === 'group_name') {
				this.$store.state.device.devices.sort((a, b) => {
					if (!a.device_group || !b.device_group) {
						return 1;
					}
					if (this.sortedType === 'ascend') {
						return a.device_group[this.sortedTarget] > b.device_group[this.sortedTarget] ? 1 : -1;
					} else {
						return a.device_group[this.sortedTarget] < b.device_group[this.sortedTarget] ? 1 : -1;
					}
				});
			} else {
				this.$store.state.device.devices.sort((a, b) => {
					if (this.sortedType === 'ascend') {
						return a[this.sortedTarget] > b[this.sortedTarget] ? 1 : -1;
					} else {
						return a[this.sortedTarget] < b[this.sortedTarget] ? 1 : -1;
					}
				});
			}
		},
		onClickDelete(target) {
			if (confirm('정말 삭제하시겠습니까?')) {
				const access_token = this.$cookie.get('access_token');
				this.$store.dispatch('device/deleteDevice', { id: target.id, access_token });
			}
		},
		onClickEdit(target) {
			this.selectedTarget = JSON.parse(JSON.stringify(target));
			this.editDialog = true;
		},
		submitSearchForm() {
			const access_token = this.$cookie.get('access_token');
			const text = this.searchText;
			this.$store.dispatch('device/searchDevices', { access_token, text });
		},
		submitDevice() {
			if (!checkForm(this.form)) {
				this.$store.commit('popSnack', { color: 'warning', msg: '다시 확인해주세요' });
				return false;
			}
			const data = JSON.parse(JSON.stringify(this.form));
			data.login_verify = data.login_verify === 'Y' ? 1 : 0;
			data.auto_start = data.auto_start === 'Y' ? 1 : 0;
			const access_token = this.$cookie.get('access_token');
			const page = Number(this.$route.query.page);
			this.$store.dispatch('device/createDevice', { data, access_token, page });
			this.form.device_name = '';
			this.form.device_group_id = '';
			this.form.os = '';
			this.form.login_verify = '';
			this.form.browser = '';
			this.form.vpn_ddns = '';
			this.form.real_ip = '';
			this.form.installed_area = '';
			this.form.installed_local = '';
			this.form.memo = '';
			this.form.server_name = '';
			this.form.auto_start = '';
			this.dialog = false;
		},
		submitEdit() {
			let data = JSON.parse(JSON.stringify(this.selectedTarget));
			const access_token = this.$cookie.get('access_token');
			const page = this.$route.query.page;
			this.$store.dispatch('device/editDevice', { data, access_token, page });
			this.selectedTarget = null;
			this.editDialog = false;
		},
		loadDevices() {
			this.searchText = null;
			const access_token = this.$cookie.get('access_token');
			const page = this.$route.query.page;
			this.$store.dispatch('device/loadDevices', { access_token, page });
		},
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		let page = this.$route.query.page;
		page ? (this.page = Number(page)) : this.$router.push('/device?page=1');
		if (access_token) {
			this.$store.dispatch('device/loadDevices', { access_token, page });
			this.$store.dispatch('group/loadDeviceGroups', { access_token });
		}
	},
};
</script>

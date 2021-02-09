<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-btn text small :color="showEverything == 1 ? 'success' : 'error'" @click="toggleShowingFilter">
					전체보기
				</v-btn>
			</v-col>
			<v-col cols="12">
				<v-simple-table dense fixed-header height="800px">
					<template v-slot:default>
						<thead>
							<tr>
								<th>번호</th>
								<th>ID</th>
								<th>기기 ID</th>
								<th>기기 이름</th>
								<th>IP</th>
								<th>구분</th>
								<th>키워드 ID</th>
								<th>키워드</th>
								<th>컨텐츠 ID</th>
								<th>os</th>
								<th>브라우저</th>
								<th>상세</th>
								<th>생성일</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(target, idx) in $store.state.log.logs" :key="target.id">
								<td>{{ idx + 1 }}</td>
								<td>{{ target.id }}</td>
								<td>{{ target.device_id }}</td>
								<td>{{ target.device_name }}</td>
								<td>{{ target.real_ip }}</td>
								<td>{{ target.classify }}</td>
								<td>{{ target.keyword_id }}</td>
								<td>
									<div v-if="target.keyword">
										{{ target.keyword.keyword }}
									</div>
								</td>
								<td>{{ target.content_id }}</td>
								<td>{{ target.os }}</td>
								<td>{{ target.browser }}</td>
								<td>{{ target.detail }}</td>
								<td>{{ target.created_at | formatDate }}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
		</v-row>
		<div class="text-center">
			<v-pagination v-model="page" :length="lastPage" :total-visible="7"></v-pagination>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			showEverything: 0,
		};
	},
	computed: {
		lastPage() {
			return this.$store.state.log.last_page;
		},
	},
	watch: {
		page: function(newVal) {
			const access_token = this.$cookie.get('access_token');
			if (access_token) {
				this.$router.replace(`log?page=${newVal}&all=${this.showEverything}`);
				this.$store.dispatch('log/loadLogs', { access_token, page: newVal, all: this.showEverything });
			}
		},
		showEverything: function(newVal) {
			const access_token = this.$cookie.get('access_token');
			if (access_token) {
				this.$router.replace(`log?page=${this.page}&all=${newVal}`);
				this.$store.dispatch('log/loadLogs', { access_token, page: this.page, all: newVal });
			}
		},
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		let str = '/log';
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
			this.$store.dispatch('log/loadLogs', { access_token, page: this.page, all: this.showEverything });
		}
	},
	methods: {
		toggleShowingFilter() {
			this.showEverything = this.showEverything == 1 ? 0 : 1;
		},
	},
};
</script>

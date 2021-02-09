<template>
	<div>
		<form @submit.prevent="onSubmitForm">
			<v-row>
				<v-col cols="12" sm="1"></v-col>
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

		<v-row>
			<v-col cols="12">
				<v-simple-table dense fixed-header height="700px">
					<template v-slot:default>
						<thead>
							<tr>
								<th>ID</th>
								<th>사용자</th>
								<th>분류</th>
								<th>액션</th>
								<th>상세</th>
								<th>날짜</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="target in $store.state.revision.revisions" :key="target.id">
								<td>{{ target.id }}</td>
								<td>{{ target.user_name }}</td>
								<td>{{ target.classify }}</td>
								<td>{{ target.action }}</td>
								<td>{{ target.detail }}</td>
								<td>{{ target.date | formatDate }}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
		</v-row>
		<div style="position:fixed; bottom:0; right:0; padding:20px;">{{ $store.state.revision.revisions.length }}개</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			from: '',
			to: '',
		};
	},
	methods: {
		onSubmitForm() {
			const access_token = this.$cookie.get('access_token');
			this.$router.replace({ path: `revision?from=${this.from}&to=${this.to}` });
			this.$store.dispatch('revision/loadRevisions', { access_token, from: this.from, to: this.to });
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
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		if (this.$route.query.from && this.$route.query.to) {
			this.from = this.$route.query.from;
			this.to = this.$route.query.to;
		} else {
			this.setDate('week');
			this.$router.push({ path: `revision?from=${this.from}&to=${this.to}` });
		}
		this.$store.dispatch('revision/loadRevisions', { access_token, from: this.from, to: this.to });
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
</style>

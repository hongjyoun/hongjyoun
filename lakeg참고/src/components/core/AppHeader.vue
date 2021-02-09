<template>
	<v-app-bar app clipped-left id="headerWrapper">
		<v-toolbar-title>
			<template v-if="!isLogin">
				<v-form v-if="$store.state.user.toggle" ref="form" v-model="loginValid" @submit.prevent="submitForm">
					<v-text-field dense style="display:inline-block;" v-model="email" label="email" :rules="emailRules" />
					&nbsp;
					<v-text-field dense style="display:inline-block;" v-model="password" label="password" :rules="passwordRules" type="password" />
					<v-btn type="submit" outlined color="#fff">로그인</v-btn>
				</v-form>
			</template>
			<div v-else>
				<span> Hello! {{ $store.state.user.user.name }} </span>&nbsp;
				<v-btn outlined color="#fff" @click="logout">로그아웃</v-btn>
			</div>
		</v-toolbar-title>

		<v-spacer></v-spacer>
		<template v-if="$store.state.user.access_token">
			<router-link to="/statistics" class="menu" :class="slug.indexOf('statistics') !== -1 ? '-current' : ''">통계</router-link>
			<router-link to="/target-keyword" class="menu" :class="slug.indexOf('target-keyword') !== -1 ? '-current' : ''">타겟키워드</router-link>
			<router-link to="/relation-keyword" class="menu" :class="slug.indexOf('relation-keyword') !== -1 ? '-current' : ''">연관키워드</router-link>
			<router-link to="/content" class="menu" :class="slug.indexOf('content') !== -1 ? '-current' : ''">컨텐츠</router-link>
			<router-link to="/group" class="menu" :class="slug.indexOf('group') !== -1 ? '-current' : ''">그룹</router-link>
			<router-link to="/device" class="menu" :class="slug.indexOf('device') !== -1 ? '-current' : ''">기기</router-link>
			<router-link to="/random-keyword" class="menu" :class="slug.indexOf('random-keyword') !== -1 ? '-current' : ''">랜덤키워드</router-link>
			<router-link to="/log" class="menu" :class="slug.indexOf('log') !== -1 ? '-current' : ''">로그</router-link>
			<router-link to="/revision" class="menu" :class="slug.indexOf('revision') !== -1 ? '-current' : ''">수정내역</router-link>
		</template>
	</v-app-bar>
</template>

<script>
export default {
	data() {
		return {
			loginValid: false,
			email: '',
			emailRules: [v => !!v || '이메일을 입력해주세요', v => /.+@.+/.test(v) || '이메일 형식으로 입력해주세요'],
			password: '',
			passwordRules: [v => !!v || '비밀번호를 입력해주세요'],
		};
	},
	computed: {
		slug() {
			return this.$route.path;
		},
		isLogin() {
			return this.$store.getters['user/isLogin'];
		},
	},
	methods: {
		clearData() {
			this.email = '';
			this.password = '';
		},
		submitForm() {
			if (!this.loginValid) {
				return false;
			}
			this.$store.dispatch('user/login', { email: this.email, password: this.password });
			this.clearData();
		},
		logout() {
			this.$store.commit('user/logout');
			this.$router.push('/');
		},
	},
	created() {
		const access_token = this.$cookie.get('access_token');
		if (access_token) {
			this.$store.dispatch('user/autoLogin', access_token);
		} else {
			this.$cookie.delete('access_token');
			this.$router.push('/');
		}
	},
};
</script>

<style>
#headerWrapper {
	user-select: none;
}
input {
	vertical-align: middle;
	border: 1px solid white;
	padding: 0 5px;
}
.menu {
	display: inline-block;
	margin-left: 15px;
	font-weight: bold;
	text-decoration: none;
}
.menu.-current {
	color: #ff5252;
	/* color: #663399; */
}
</style>

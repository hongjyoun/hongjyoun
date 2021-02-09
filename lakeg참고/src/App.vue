<template>
	<v-app>
		<app-header></app-header>
		<app-content></app-content>
		<!-- <app-footer></app-footer> -->
		<snack-bar></snack-bar>
	</v-app>
</template>

<script>
import AppHeader from '@/components/core/AppHeader.vue';
import AppContent from '@/components/core/AppContent.vue';
// import AppFooter from '@/components/core/AppFooter.vue';
import SnackBar from '@/components/SnackBar.vue';
export default {
	components: {
		AppHeader,
		AppContent,
		// AppFooter,
		SnackBar,
	},
	created() {
		this.$vuetify.theme.dark = true;
	},
};
</script>

<style>
input {
	border: none;
}

th {
	background-color: #4169e1 !important;
}
td {
	padding: 5px;
}
.editInput {
	border: 1px solid white;
}
.subMenu {
	width: 350px;
	height: 100px;
	background-color: purple;
	position: fixed;
	top: 100px;
	right: 0;
	transition: ease-in-out all 0.5s;
	padding: 10px;
	text-align: center;
	z-index: 999;
}
.subMenu.-off {
	right: -350px;
	transition: ease-in-out all 0.5s;
}
</style>

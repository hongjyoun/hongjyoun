import Vue from 'vue';
import VueRouter from 'vue-router';
// import userStore from '@/store/modules/user';
import cookie from 'vue-cookie';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('@/views/MainPage.vue'),
		},
		{
			path: '/statistics',
			component: () => import('@/views/StatisticsPage.vue'),
			meta: { auth: true },
		},
		{
			path: '/target-keyword',
			component: () => import('@/views/TargetKeyowrdPage.vue'),
			meta: { auth: true },
		},
		{
			path: '/relation-keyword',
			component: () => import('@/views/RelationKeywordPage.vue'),
			meta: { auth: true },
		},
		{
			path: '/content',
			component: () => import('@/views/ContentPage.vue'),
			meta: { auth: true },
		},
		{
			path: '/group',
			component: () => import('@/views/GroupPage.vue'),
			meta: { auth: true },
		},
		{
			path: '/device',
			component: () => import('@/views/DevicePage.vue'),
			meta: { auth: true },
		},
		{
			path: '/random-keyword',
			component: () => import('@/views/RandomKeywordPage.vue'),
			meta: { auth: true },
		},
		{
			path: '/log',
			component: () => import('@/views/LogPage.vue'),
			meta: { auth: true },
		},
		{
			path: '/revision',
			component: () => import('@/views/RevisionPage.vue'),
			meta: { auth: true },
		},
	],
});

/**
 * router navigation guard
 */
router.beforeEach((to, from, next) => {
	const access_token = cookie.get('access_token');
	if (to.meta.auth && !access_token) {
		next('/');
		return;
	}
	next();
});

export default router;

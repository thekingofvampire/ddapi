import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import update from './views/update.vue'
import manage from './views/manage.vue'
import upload from './views/upload.vue'
import applyText from './views/applyText.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		}, 
		{
			path: '/update',
			name: 'update',
			component: update
		},
		{
			path: '/manage',
			name: 'manage',
			component: manage
		},
		{
			path: '/upload',
			name: 'upload',
			component: upload
		},
		{
			path: '/applyText',
			name: 'applyText',
			component: applyText
		}
	]
})

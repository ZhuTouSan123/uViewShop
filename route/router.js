import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// console.log(uni.getStorageSync('lifeData'));
	if((to.name == 'mine' || to.name == 'cart') && !uni.getStorageSync('lifeData')){
		uni.showToast({
			title:'请先登录',
			icon:'error'
		});
		setTimeout(()=>{
			next('/pages/auth/login');
		},1500)
	}else{
		next();
	}
});
// // 全局路由后置守卫
// router.afterEach((to, from) => {
//     console.log('跳转结束')
// })

export {
	router,
	RouterMount
}
const install = (Vue, vm) => {
	const userUpdate = async () => {
		//获取用户信息
		const userInfo = await vm.$u.api.userInfo();
		//修改vuex
		vm.$u.vuex('vuex_user', userInfo);
		vm.$u.toast('更新成功');
	}

	vm.$u.utils = {
		userUpdate
	}
}



export default {
	install
}

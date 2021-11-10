// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let hotSearchUrl = '/ebapi/store_api/hot_search';
// let indexUrl = '/ebapi/public_api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	vm.$u.api = {};

	// 此处没有使用传入的params参数
	// 认证相关
	// 注册
	vm.$u.api.authReg = (params = {}) => vm.$u.post('/api/auth/register', params);
	// 登录
	vm.$u.api.authLogin = (params = {}) => vm.$u.post('/api/auth/login', params);
	// 退出
	vm.$u.api.authLogout = () => vm.$u.post('/api/auth/logout');
	// 找回密码
	// 获取邮箱验证码	
	vm.$u.api.authCode = (params = {}) => vm.$u.post('/api/auth/reset/password/email/code', params);
	// 通过邮箱验证
	vm.$u.api.authFindpwd = (params = {}) => vm.$u.post('/api/auth/reset/password/email', params);
	// 获取阿里云OSS Token
	vm.$u.api.authOssToken = () => vm.$u.get('/api/auth/oss/token');

	// 首页
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index', params);

	// 用户相关
	// 获取用户信息
	vm.$u.api.userInfo = () => vm.$u.get('/api/user');
	// 更新用户信息/api/user
	vm.$u.api.userUpdate = (params = {}) => vm.$u.put('/api/user', params);
	// 更新头像 调用前先去上方接口中调用获取阿里云OSS Token的接口
	vm.$u.api.userUpdateAvatar = (params = {}) => vm.$u.patch('/api/user/avatar', params);

	// 商品相关
	// 商品列表
	vm.$u.api.getGoodsList = (params = {}) => vm.$u.get('/api/goods', params);
	// 商品详情
	vm.$u.api.getGoodsDetail = (id) => vm.$u.get(`/api/goods/${id}`);
	// 搜索商品
	vm.$u.api.goodsSearch = (title) => vm.$u.get("/api/goods",title);
	
	// 收藏/取消
	vm.$u.api.isCollect = (id) => vm.$u.post(`/api/collects/goods/${id}`);
	// 我的收藏
	vm.$u.api.myCollectGoods = (params = {}) => vm.$u.get("/api/collects", params);
	
	// 添加进购物车
	vm.$u.api.addToCart = (params) => vm.$u.post("/api/carts", params);
	// 购物车列表
	vm.$u.api.getCartList = (include = {}) => vm.$u.get("/api/carts", include);
	// 改变选中
	vm.$u.api.checkCarts = (params = {}) => vm.$u.patch("/api/carts/checked", params);
	// 购物车数量改变
	vm.$u.api.setCartsNum = (num,id) => vm.$u.put(`/api/carts/${id}`, num);
	// 移出购物车
	vm.$u.api.deleteCart = (id) => vm.$u.delete(`/api/carts/${id}`);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	// vm.$u.api = {getSearch, getInfo};
}

export default {
	install
}

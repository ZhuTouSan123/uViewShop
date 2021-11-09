<template>
	<view id="cart">
		<scroll-view scroll-y="true" >
			<view></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartList:[]
			};
		},
		onShow() {
			if(!uni.getStorageSync('lifeData')){
				uni.showToast({
					title:'请先登录',
					icon:'error'
				});
				setTimeout(()=>{
					uni.redirectTo({
						url:'/pages/auth/login'
					})
				},1500)
			}
		},
		onLoad() {
			this.getCartList();
		},
		methods:{
			async getCartList(){
				const {data} = await this.$u.api.getCartList({include: "goods"});
				this.cartList = data;
			}
		}
	}
</script>

<style lang="less">

</style>

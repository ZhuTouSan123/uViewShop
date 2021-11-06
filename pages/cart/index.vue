<template>
	<view>
		cart
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'123'
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
	}
</script>

<style lang="less">

</style>

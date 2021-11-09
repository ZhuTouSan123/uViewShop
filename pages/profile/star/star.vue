<template>
	<view>
		收藏
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad() {
			this.getMyCollectGoods()
		},
		methods: {
			async getMyCollectGoods() {
				const res = await this.$u.api.myCollectGoods();
				console.log(res);
			}
		}
	}
</script>

<style lang="scss">

</style>

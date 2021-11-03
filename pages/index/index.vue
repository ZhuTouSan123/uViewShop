<template>
	<view>
		首页
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		async onLoad() {
			const res = await this.$u.patch("/api/orders/1/confirm");
			console.log(res);
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>

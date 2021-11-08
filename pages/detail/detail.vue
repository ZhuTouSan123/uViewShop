<template>
	<view>
		{{title}}
		<image :src="cover_url" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				cover_url: ""
			};
		},
		onLoad(option) {
			this.getGoodsDetail(option.good);
		},
		methods:{
			async getGoodsDetail(id){
				const good = await this.$u.api.getGoodsDetail(id);
				console.log(good);
				this.title = good.goods.title;
				this.cover_url = good.goods.cover_url;
			}
		}
	}
</script>

<style lang="scss">

</style>

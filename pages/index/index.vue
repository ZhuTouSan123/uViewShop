<template>
	<view id="index">
		<view class="wrap">
			<u-swiper :list="slides" name='img_url' height="320"></u-swiper>
		</view>
		<u-tabs class="tabs" :list="list" :is-scroll="false" :current="current" @change="changeSort"></u-tabs>
		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="(g,index) in goods" :key='index'>
				<goods-card :g='g'></goods-card>
			</u-col>
		</u-row>
		<u-divider color="#6d6d6d" half-width="200" border-color="#6d6d6d" v-if="noMore">没有更多了</u-divider>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				slides: [],
				goods: [{},{},{},{}],
				list: [{
						name: '默认'
					},
					{
						name: '销量'
					},
					{
						name: '推荐',
					},
					{
						name: '最新',
					}
				],
				current: 0,
				page: 1,
				noMore: false,
				loading: false
			}
		},
		onLoad() {
			this.getGoods();
		},
		methods: {
			changeSort(i) {
				this.current = i;
				//重置商品列表和页码
				this.goods = [{},{},{},{}];
				this.page = 1;
				this.getGoods();
			},
			async getGoods() {
				this.loading = true;
				const params = {
					page: this.page
				};
				if (this.current == 1) params.sales = 1;
				if (this.current == 2) params.recommend = 1;
				if (this.current == 3) params.new = 1;
				const res = await this.$u.api.index(params);
				this.loading = false;
				this.slides = res.slides;
				this.noMore = res.goods.data == 0 ? true : false;
				this.goods = this.goods[0].title ? [...this.goods, ...res.goods.data] : res.goods.data;
			}
		},
		onReachBottom() {
			if (this.noMore == false) {
				this.page += 1;
				this.getGoods();
			}
		}
	}
</script>

<style lang="scss" scoped>
	#index {
		.tabs {
			padding: 10rpx 0;
			border-bottom: 1px solid lightgray;
			font-weight: 600;
		}
		.u-row {
			padding: 20rpx;
		}
	}
</style>

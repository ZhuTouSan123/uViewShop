<template>
	<navigator url="" class="goodsBox">	
		<u-image width="100%" height="300rpx" :src="g.cover_url" class="u-skeleton-fillet"></u-image>
		<view class="title u-line-1 u-skeleton-fillet">{{g.title ? g.title:"@@"}}</view>
		<view class="u-flex u-row-between">
			<view class="price u-skeleton-fillet"><text>￥</text>{{g.price}}</view>
			<view class="sales u-skeleton-fillet">{{g.sales}}已付款</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		props:{
			g:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsBox {
		border-radius: 30rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, .1);

		.title {
			margin: 10rpx 0;
			font-size: 32rpx;
			font-weight: 800;
			width: 100%;
		}

		.price {
			color: red;
			font-weight: 600;
			font-size: 36rpx;
			width: 40%;

			text {
				font-size: 24rpx;
			}
		}

		.sales {
			color: #888;
			width: 40%;
		}
	}
</style>

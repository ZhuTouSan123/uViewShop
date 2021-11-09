<template>
	<view id="star">
		<scroll-view scroll-y="true">
			<block v-for="s,index in starGoodsList" :key="s.id">
				<view class="star-card u-flex u-padding-30 u-row-between u-relative">
					<u-image :src="s.goods.cover_url" width="200" height="200" @click="detail(s.goods_id)"></u-image>
					<view class="card-left" @click="detail(s.goods_id)">
						<view class="title">{{ s.goods.title }}</view>
						<view class="description u-line-1">{{ s.goods.description }}</view>
						<view class="price">￥ {{ s.goods.price }}</view>
						<view class="date u-absolute">{{ s.created_at }} 收藏</view>
					</view>
					<view class="card-right" @click="cancelStar(s.goods_id,index)">
						<button type="warn" size="mini">取消收藏</button>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				starGoodsList: [],
			};
		},
		onLoad() {
			this.getMyCollectGoods();
		},
		methods: {
			async getMyCollectGoods() {
				const res = await this.$u.api.myCollectGoods();
				this.starGoodsList = res.data;
			},
			detail(id) {
				uni.navigateTo({
					url: "/pages/detail/detail?good=" + id
				})
			},
			cancelStar(id, index) {
				uni.showModal({
					content: "您确定要取消收藏吗",
					success: async (res) => {
						if (res.confirm) {
							await this.$u.api.isCollect(id);
							this.$u.toast("取消成功");
							this.starGoodsList.splice(index, 1);
						} else if (res.cancel) return
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.star-card {
		margin-bottom: 4rpx;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);

		button {
			margin-left: auto;
		}

		.card-left {
			height: 160rpx;
			width: 40%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.date {
				left: 60rpx;
				bottom: 0;
				font-size: 24rpx;
				color: #999;
			}

			.price {
				color: red;
			}

			.title {
				font-weight: 600;
				font-size: 28rpx;
			}

			.description {
				font-size: 24rpx;
				color: #888;
			}
		}
	}
</style>

<template>
	<view id="detail">
		<scroll-view scroll-y="true" class="scrollbar">
			<view class="detail-img u-p-l-20 u-p-r-20">
				<view class="imgbox u-flex u-row-center">
					<image :src="good.cover_url" mode="widthFix"></image>
				</view>
				<view class="good-title">{{good.title}}</view>
			</view>

			<view class="detail-price u-p-l-20 u-p-r-20 u-flex u-row-between u-m-t-35 u-m-b-35">
				<view class="price">￥ {{good.price}}</view>
				<view class="sales">销量 {{good.sales}}</view>
			</view>

			<view class="detail-tabs u-p-l-20 u-p-r-20 u-relative">
				<u-badge :count="count" type="error" :offset="[10, 300]" :show-zero="true"></u-badge>
				<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" class="u-m-b-20"></u-tabs>
				<view class="val" v-if="current == 0" v-html="good.details"></view>
				<!-- 评论 -->
				<block v-if="current == 1">
					<view class="comment" v-for="(res, index) in good.comments" :key="res.id">
						<view class="left">
							<image :src="res.user.avatar_url" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="top">
								<view class="name">{{ res.user.name }}</view>
							</view>
							<view class="content">{{ res.content }}</view>
							<view class="reply-box">
								<view class="item" v-for="(item, index) in res.reply" :key="item.index">
									<view class="username">{{ index }}</view>
									<view class="text">{{ item }}</view>
								</view>
								<view class="all-reply" v-if="res.reply != undefined">
									共{{ res.reply.length }}条回复
									<u-icon class="more" name="arrow-right" :size="26"></u-icon>
								</view>
							</view>
							<view class="bottom">
								{{ res.created_at }}
								<view class="reply">回复</view>
							</view>
						</view>
					</view>
				</block>
				<!-- 推荐商品 -->
				<u-row gutter="16" v-if="current == 2">
					<u-col span="6" v-for="g,index in likegoods" :key="g.id">
						<goods-card :g="g"></goods-card>
					</u-col>
				</u-row>
			</view>
		</scroll-view>

		<view class="navigation">
			<view class="left">
				<view class="item" @click="goKefu">
					<u-icon name="kefu-ermai" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
				<view class="item" @click="collectGood">
					<u-icon name="star" :size="40" :color="starColor"></u-icon>
					<view class="text u-line-1">收藏</view>
				</view>
				<view class="item car" @click="goCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="addToCart">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				good: {},
				current: 0,
				list: [{
						name: "商品详情"
					},
					{
						name: "商品评论"
					},
					{
						name: "推荐商品"
					}
				],
				count: 0,
				likegoods: [],
				cartCount: 0
			};
		},
		computed: {
			starColor() {
				return this.good.is_collect ? '#ff0000' : '';
			}
		},
		onLoad(option) {
			this.getGoodsDetail(option.good);
		},
		onShow(){
			this.getCartList();
		},
		methods: {
			async getCartList(){
				const res = await this.$u.api.getCartList();
				this.cartCount = res.data.length;
			},
			async collectGood() {
				await this.$u.api.isCollect(this.good.id);
				if (this.starColor == '') {
					this.$u.toast("收藏成功");
					this.good.is_collect = 1;
				} else {
					this.$u.toast("取消成功");
					this.good.is_collect = 0;
				}
			},
			goKefu() {
				this.$Router.push('/pages/kefu/kefu')
			},
			change(index) {
				this.current = index
			},
			async getGoodsDetail(id) {
				const good = await this.$u.api.getGoodsDetail(id);
				this.good = good.goods;
				this.count = good.goods.comments.length;
				this.likegoods = good.like_goods;
			},
			async addToCart(){
				await this.$u.api.addToCart({goods_id: this.good.id});
				this.$u.toast("添加成功");
				this.getCartList();
			},
			goCart(){
				uni.switchTab({
					url:'/pages/cart/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.good-title {
		font-weight: bold;
		font-size: 40rpx;
	}

	.price {
		font-size: 36rpx;
		color: #d00000;
		font-weight: 600;
	}

	.sales {
		font-size: 28rpx;
		color: #888;
	}

	.scrollbar {
		padding-bottom: 120rpx;
	}

	.navigation {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 10rpx;
		justify-content: space-between;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 16rpx;

				&.car {
					text-align: center;
					position: relative;

					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}

			.buy {
				background-color: #ff7900;
			}
		}
	}

	.comment {
		display: flex;
		padding: 30rpx;
	
	.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>

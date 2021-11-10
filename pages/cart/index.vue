<template>
	<view id="cart">
		<scroll-view scroll-y="true" class="scrollbar">
			<view class="cart-card u-flex u-relative u-padding-20" v-for="(c,index) in cartList" :key="c.id">
				<view class="cart-radio">
					<label>
						<checkbox :value="c.id + ''" :checked="c.is_checked == '0' ? false : true "
							@click="oneChecked(c.id)" />
					</label>
				</view>
				<view class="cart-good u-flex">
					<u-image :src="c.goods.cover_url" width="200" height="200" @click="detail(c.goods_id)"></u-image>
					<view class="cart-left u-flex-col u-row-between">
						<view class="title">{{c.goods.title}}</view>
						<view class="description u-line-1">{{ c.goods.description }}</view>
						<view class="price u-m-r-16">￥ {{c.goods.price}}</view>
					</view>
					<view class="cart-right u-absolute">
						<u-icon name="close" @click="deleteCart(c.id)"></u-icon>
					</view>
					<u-number-box class="numberbox u-absolute" v-model="c.num" @change="valChange" :index="c.id">
					</u-number-box>
				</view>
			</view>
		</scroll-view>
		<view class="totalbox u-flex u-padding-20 u-row-between">
			<view class="u-flex">
				<label>
					<checkbox value="all" :checked="isAllChecked" @click="allChecked" />
				</label>
				<view class="total-price u-m-l-40 u-font-xl">
					合计: <text>￥{{totalPrice}}</text>
				</view>
			</view>
			<button type="warn" size="mini">去结算</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartList: []
			};
		},
		computed: {
			isAllChecked() {
				return this.cartList.every(el => el.is_checked == 1)
			},
			totalPrice() {
				let sum = 0;
				this.cartList.forEach(el => {
					if (el.is_checked) {
						sum += el.num * el.goods.price
					}
				});
				return sum
			}
		},
		onShow() {
			if (!uni.getStorageSync('lifeData')) {
				uni.showToast({
					title: '请先登录',
					icon: 'error'
				});
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/auth/login'
					})
				}, 1500)
			}
			this.getCartList();
		},
		methods: {
			async valChange(val) {
				await this.$u.api.setCartsNum({
					num: val.value
				}, val.index)
			},
			async oneChecked(id) {
				this.cartList.forEach(el => {
					if (el.id == id) {
						el.is_checked = !el.is_checked
					}
				})
				this.checkCartsApi();
			},
			allChecked() {
				let flag = null;
				flag = !this.isAllChecked;
				this.cartList.forEach(el => el.is_checked = flag);
				this.checkCartsApi();
			},
			async checkCartsApi() {
				let arr = [];
				this.cartList.forEach(el => {
					if (el.is_checked) {
						arr.push(el.id)
					}
				});
				await this.$u.api.checkCarts({
					cart_ids: arr
				})
			},
			async getCartList() {
				const {
					data
				} = await this.$u.api.getCartList({
					include: "goods"
				});
				this.cartList = data;
			},
			deleteCart(id) {
				uni.showModal({
					content: "您确定要删除此项吗",
					success: async (res) => {
						if (res.confirm) {
						await this.$u.api.deleteCart(id);
						this.cartList = this.cartList.filter(el => el.id !== id)
						}else if (res.cancel) return
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.scrollbar {
		padding-bottom: 100rpx;
	}

	.cart-right {
		top: 20rpx;
		right: 20rpx;
	}

	.cart-left {
		height: 160rpx;

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

	.description {
		width: 300rpx;
	}

	.numberbox {
		right: 20rpx;
		bottom: 40rpx;
	}

	.totalbox {
		width: 100%;
		position: fixed;
		// #ifdef H5
		bottom: 90rpx;
		// #endif
		
		// #ifndef H5
		bottom: -1rpx;
		// #endif
		
		border-top: 1px solid #888;
		background-color: #fff;
	
	button {
			width: 30%;
			margin-right: 0;
		}

		.total-price {
			text {
				margin-left: 20rpx;
				color: red;
			}
		}
	}
</style>

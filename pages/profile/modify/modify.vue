<template>
	<view>
		<u-field
			v-model="name"
			label="昵称"
			required
		>
		</u-field>
		<button type="primary" class="u-m-t-20" @click="userUpdate">确认修改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:''
			};
		},
		onLoad() {
			this.name = this.vuex_user.name
		},
		methods:{
			async userUpdate(){
				await this.$u.api.userUpdate({name: this.name});
				this.$u.utils.userUpdate();
			}
		}
	}
</script>

<style lang="scss">

</style>

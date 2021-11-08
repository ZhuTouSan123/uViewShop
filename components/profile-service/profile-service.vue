<template>
	<navigator class="profile-service" :url="path">
		<u-icon :name='iconName' size="36"></u-icon>
		<text class="u-m-l-20">{{title}}</text>
		<u-icon name='arrow-right' class="arrow-right"></u-icon>
	</navigator>
</template>

<script>
	export default {
		name:"profile-service",
		props:['path','iconName','title'],
	}
</script>

<style lang="scss" scoped>
	.profile-service{
		display: flex;
		margin-bottom: 10rpx;
		background-color: #FFFFFF;
		padding: 30rpx;
		font-size: 32rpx;
		.arrow-right{
			margin-left: auto;
			color: #888;
		}
	}
</style>

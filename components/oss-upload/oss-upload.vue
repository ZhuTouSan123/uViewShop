<template>
	<view>
		<u-upload 
		ref="upload"
		:action="action"
		:before-upload="beforeUpload"
		max-count="1"
		:custom-btn="true"
		:show-progress="false"
		:multiple="false"
		:deletable="false"
		:form-data="formData"
		:file-list="fileList"
		@on-success="onSuccess"
		:show-upload-list="false"
		>
			
			<u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="120"></u-avatar>
			
		</u-upload>
	</view>
</template>

<script>
	let _this;
	export default {
		name:"oss-upload",
		data() {
			return {
				action:'http://www.example.com',
				formData:{},
				fileList:[],
				key:''
			};
		},
		created() {
			_this = this;
		},
		methods:{
			//上传前钩子
			async beforeUpload(index, list) {
				//处理唯一文件名
				const {file} = list[0];//获取文件对象
				//兼容性处理
				//#ifdef H5
				const imgTitle = file.name;
				//#endif
				
				//#ifndef H5
				const imgTitle = file.path;
				//#endif
				
				//取后缀
				let str = imgTitle.slice(imgTitle.lastIndexOf('.'));
				let id = _this.$u.guid(20);
				const key = id + str;
				_this.key = key;
				const oss = await _this.$u.api.authOssToken();
				_this.action = oss.host;
				_this.formData = {
					'key' : key, //文件名
					'policy': oss.policy,
					'OSSAccessKeyId': oss.accessid, 
					'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
					'signature': oss.signature,
				}
				return true;
			},
			async onSuccess(){
				this.$refs.upload.remove(0);
				await this.$u.api.userUpdateAvatar({avatar: this.key});
				this.$u.utils.userUpdate();
			}
		}
	}
</script>

<style lang="scss">

</style>

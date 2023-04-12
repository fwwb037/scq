<template>
	<view>
		
	
	<view>
		<button type="default" @click="()=>{show = true}" style="width: 80%;background-color: #007AFF;color: #fff;margin-top: 60rpx;">选择文件</button>
		<view class="textStyle" v-for="(item,index) in pathArr" :key="index">
			<view>
				文件名：{{item.name}}
			</view>
			<view>
				文件地址：{{item.url}}
			</view>
			<view>
				文件大小：{{item.sizeMB}}
			</view>
		</view>
		<nk-select-file v-model="show" @confirm="getPath"></nk-select-file>
	</view>
	</view>
	
	
	
</template>

<script>
	import tmFullView from "@/tm-vuetify/components/tm-fullView/tm-fullView.vue"
	import tmMenubars from "@/tm-vuetify/components/tm-menubars/tm-menubars.vue"
	import tmSheet from "@/tm-vuetify/components/tm-sheet/tm-sheet.vue"
	import tmUpload from "@/tm-vuetify/components/tm-upload/tm-upload.vue"
	import tmButton from "@/tm-vuetify/components/tm-button/tm-button.vue"
	export default {
		components:{tmFullView,tmMenubars,tmSheet,tmUpload,tmButton},
		data() {
			return {
				show: false,
				pathArr: [],
				header:{abc:122},
				fileList1:[],
				success_submit:[],
			}
		},
		methods: {
			// 删除图片
						deletePic(event) {
							this[`fileList${event.name}`].splice(event.index, 1)
						},
						// 新增图片
						async afterRead(event) {
							// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
							let lists = [].concat(event.file)
							let fileListLen = this[`fileList${event.name}`].length
							lists.map((item) => {
								this[`fileList${event.name}`].push({
									...item,
									status: 'uploading',
									message: '上传中'
								})
							})
							for (let i = 0; i < lists.length; i++) {
								const result = await this.uploadFilePromise(lists[i].url)
								let item = this[`fileList${event.name}`][fileListLen]
								this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
									status: 'success',
									message: '',
									url: result
								}))
								fileListLen++
							}
							console.log(this.success_submit)
						},
						uploadFilePromise(url) {
							
							let fileName = Math.round(new Date() / 1000)
							this.success_submit.push(fileName + '.png')
							return new Promise((resolve, reject) => {
								let a = uni.uploadFile({
									url: 'http://upload.qiniup.com', // 仅为示例，非真实的接口地址
									filePath: url,
									name: 'file',
									formData: {
										'key': fileName + '.png', // 时间戳 + 随机字符串的名字
										'token': this.$store.state.qny_token // 后台给的七牛云上传的token
									},
									success: (res) => {
										setTimeout(() => {
											resolve(res.data.data)
											console.log(res.data.data)
										}, 1000)
									}
								});
							})
						},
			addImage(e){
				console.log(e)
			},
			delImage(e){
				console.log(e)
			},
			getPath(event){
				console.log(event);
				this.pathArr = event;
				let fileName = Math.round(new Date() / 1000)
				uni.uploadFile({
					url: 'http://upload.qiniup.com', // http://upload.qiniup.com 七牛云的地址
					filePath: event[0].url,
					name: 'file',
					formData: {
						'key': fileName + '.xlsx', // 时间戳 + 随机字符串的名字
						'token': this.$store.state.qny_token // 后台给的七牛云上传的token
					},
					
					success: (uploadFileRes) => {
				
						let uploadData = JSON.parse(uploadFileRes.data)
						
						console.log('uploadData', uploadData)
						
						
						console.log("this.phtotName",this.photoName)
						
						
						
						if (uploadData.code === 0) {
							console.log(uploadData.data.filePath)
							console.log(uploadData.data.id)
							this.list.push(uploadData.data.filePath)
							this.ids.push(uploadData.data.id)
				
						}
				
					}
				})
									
				
				
				
			},
			loadimg(){
				let t = this;
				this.$refs.myupload.startupload();
				
			}
		}
	}
</script>

<style>
.textStyle{
	width: 100%;
	text-align: center;
	margin-top: 40rpx;
}
</style>

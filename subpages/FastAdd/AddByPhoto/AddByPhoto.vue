<template>
	<view>		
		<tm-sheet style="height: 230rpx;opacity: 0.92;margin-top: 30rpx;" @click="choosePhoto"><text>拍照</text></tm-sheet>
		<tm-grouplist @change="test" title="支出列表(识别)" title-theme="blue text">
			<tm-listitem v-for="(item, index) in expenseDetailList" group>
				<tm-row style="width: 640rpx;">
					<tm-col :grid="2">
						<tm-icons :name="item.typeIcon" size="60"></tm-icons>
					</tm-col>
					<tm-col :grid="6" justify="left">
						<text>{{item.outcomeName}}</text><br />
						<text style="font-size: 12rpx;">￥{{item.outcome}}</text>
					</tm-col>
					<tm-col :grid="4" style="margin-top: 12rpx;">
						<text style="font-size: 13rpx;">{{item.date}}</text>
					</tm-col>
				</tm-row>


				<template v-slot:group>
					<tm-sheet :margin="[0, 0]" :shadow="0" color="blue text">
						<tm-input :required="true" title="支出名称" v-model="item.outcomeName" placeholder="请输入贷款名称"
							align="left"></tm-input>
						<tm-input :required="true" title="支出金额" v-model="item.outcome" placeholder="请输入贷款金额"
							align="left"></tm-input>

						<view style="margin-top: 50rpx;margin-left: 30rpx;margin-right: 30rpx;">
							<tm-dragGrid :disabled="disabledGrid" :list="typeList" :item-height="150" :col="5">
								<template v-slot:default="{item}">
									<view class="flex-center flex-col" style="width:70% margin-top:50rpx;">
										<tm-badges v-if="item.pick" :offset="[0,-5]" icon="icon-plus"></tm-badges>
										<tm-icons :name="item.typeIcon" :size="50" @click="pickType(item)"></tm-icons>

										<text class="text-size-s pt-10">{{item.typeName}}</text>
									</view>
								</template>
							</tm-dragGrid>
						</view>

						<tm-pickersDate @confirm="dateChange_start($event,item)" :default-value="item.date"
							end="2023-12-31">
							<view class="fulled">
								<tm-input :required="true" :disabled="true" title="开始时间" v-model="item.date"
									right-icon="icon-angle-right" placeholder="请输入贷款开始时间" align="right"></tm-input>
							</view>
						</tm-pickersDate>
					</tm-sheet>
				</template>


			</tm-listitem>

		</tm-grouplist>

		<view class="ma-32 pa-24">
			
			<tm-button @click="addExpenseConfirm">确认提交</tm-button>
		</view>
		
		<view style="height: 100upx;"></view>
	</view>
</template>

<script>
	import tmDivider from "@/tm-vuetify/components/tm-divider/tm-divider.vue"
	import tmCol from "@/tm-vuetify/components/tm-col/tm-col.vue"
	import tmRow from "@/tm-vuetify/components/tm-row/tm-row.vue"
	import tmDragList from '@/tm-vuetify/components/tm-dragList/tm-dragList.vue';
	import tmSheet from "@/tm-vuetify/components/tm-sheet/tm-sheet.vue"
	import tmGrid from "@/tm-vuetify/components/tm-grid/tm-grid.vue"
	import tmForm from '@/tm-vuetify/components/tm-form/tm-form.vue';
	import tmPoup from '@/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmDragGrid from '@/tm-vuetify/components/tm-dragGrid/tm-dragGrid.vue';
	import tmMenubars from '@/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmFullView from '@/tm-vuetify/components/tm-fullView/tm-fullView.vue';
	import tmButton from '@/tm-vuetify/components/tm-button/tm-button.vue';
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons.vue';
	import tmBadges from '@/tm-vuetify/components/tm-badges/tm-badges.vue';
	import tmTags from '@/tm-vuetify/components/tm-tags/tm-tags.vue';
	import * as echarts from 'echarts'

	import Request from '@/utils/luch-request/index.js' // 下载的插件
	// import Request from 'luch-request' // 使用npm

	const http = new Request();
	export default {
		components: {
			tmDragGrid,
			tmMenubars,
			tmFullView,
			tmButton,
			tmIcons,
			tmBadges,
			tmTags,
			tmPoup,
			tmForm,
			tmSheet,
			tmGrid,
			tmDragList,
			tmCol,
			tmRow,
			tmDivider
		},
		data() {
			return {
				disabledGrid: true,
				typeList: [],
				typeId: -1,
				typeIcon:"",
				pos: "bottom",
				show_addCost: false,
				indexlen: 0,
				loanList: [],
				expenseDetail: {
					outcomeName: '',
					outcome: 0,
					typeId: 0,
					typeIcon: "",
					typeName: "",
					date: this.$store.state.nowTime,
				},
				new_expenseDetail: {
					outcomeName: '',
					outcome: 0,
					typeId: 0,
					typeIcon: "",
					typeName: "",
					date: this.$store.state.nowTime,
				},
				expenseDetailList: [],
				expenseDetailList_new: [],
				photoName: "fakePhotoName",
				fileName_list:[],
			}
		},
		created() {

			
			http.get('/youngster/getTypeList', {
				header: { token: this.$store.state.token }
			}).then(res => {
				this.typeList = res.data.data
				var typeList_temp = []
			
				for (var i = 0; i < this.typeList.length; i++) {
					typeList_temp.push({
						typeId: this.typeList[i].typeId,
						typeName: this.typeList[i].typeName,
						typeIcon: this.typeList[i].typeIcon,
						pick: false
					})
				}
				this.typeList = typeList_temp
				console.log("typelist")
				console.log(this.typeList)
			}).catch(err => {
			
			})
		},
		methods: {
		
			
			//调用相机获取图片地址和图片名字
			choosePhoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: ({ tempFilePaths }) => {
						let fileName = Math.round(new Date() / 1000)
						uni.uploadFile({
							url: 'http://upload.qiniup.com', // http://upload.qiniup.com 七牛云的地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'key': fileName + '.png', // 时间戳 + 随机字符串的名字
								'token': this.$store.state.qny_token // 后台给的七牛云上传的token
							},
							
							success: (uploadFileRes) => {

								let uploadData = JSON.parse(uploadFileRes.data)
								
								console.log('uploadData', uploadData)
								http.get('/youngster/identifyPicture', {
									params: { fileName: uploadData.key},
									header: { token: this.$store.state.token }
								}).then(res => {
									console.log(res)
									this.expenseDetailList = [res.data.data]
								
								}).catch(err => {
								
								})
								
								console.log("this.phtotName",this.photoName)
								
								
								
								if (uploadData.code === 0) {
									console.log(uploadData.data.filePath)
									console.log(uploadData.data.id)
									this.list.push(uploadData.data.filePath)
									this.ids.push(uploadData.data.id)

								}

							}
						})
					
					
					}
				});
			},

			photo() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //这要注意，camera掉拍照，album是打开手机相册
					success: (res) => {
						console.log(res);
						const tempFilePaths = res.tempFilePaths;
					}
				});
				uni.uploadFile({
					url: "http://127.0.0.1:5000/getPhoto", //服务器地址
					fileType: "image", //ZFB必填,不然报错
					filePath: tempFilePaths[0], //这个就是我们上面拍照返回或者先中照片返回的数组
					name: 'imgFile',
					success: (uploadFileRes) => {
						let imgData = JSON.parse(uploadFileRes.data)
						console.log(imgData.data.imgUrl);
						console.log(this);
						this.imgDataUrl = imgData.data.imgUrl
					}
				});


			},
			pickType(item) {
				this.show_cal = true
				console.log(item.pick)
				item.pick = !item.pick
				var picknum = 0
				for (var i = 0; i < this.typeList.length; i++) {
					if (this.typeList[i].pick === true) {
						picknum = picknum + 1
					}
				}
				if (picknum > 1) {
					for (var i = 0; i < this.typeList.length; i++) {
						if (this.typeList[i].pick === true && this.typeList[i].typeId !== item.typeId) {
							this.typeList[i].pick = false
						}
					}
				}




				for (var i = 0; i < this.typeList.length; i++) {

					if (this.typeList[i].pick === true) {
						this.typeId = this.typeList[i].typeId
						this.typeIcon=this.typeList[i].typeIcon
					}

				}
				this.expenseDetailList[0].typeIcon=this.typeIcon
				this.expenseDetailList[0].typeId=this.typeId
			},
			addExpenseConfirm() {
				console.log(this.expenseDetailList)
			},
			dateChange_start(e, item) {

				var newDate = e.year + '-' + e.month + '-' + e.day;
				for (var i = 0; i < this.expenseDetailList.length; i++) {
					if (this.expenseDetailList[i].outcomeName === item.outcomeName) {
						this.expenseDetailList[i].date = newDate
						
					}
				this.new_expenseDetail=newDate
				}
			},

			confirmAddExpense() {
				this.expenseDetailList.push(this.new_expenseDetail)

			},
			addExpense() {
				this.show_addCost = true
			},
			outcomeName(e) {
				for (var i = 0; i < this.expenseDetailList.length; i++) {
					if (this.expenseDetailList[i].outcomeName === e) {
						this.expenseDetailList[i] = this.expenseDetail
					}
				}
			},
			deleteLoan(loanid) {

			},
			test(e) {}
		}
	}

</script>

<style>

</style>


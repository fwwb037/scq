<template>

	<tm-fullView>
		<tm-sheet style="height: 1100rpx;">
			<view style="font-size: 35rpx;font-weight: 600;">常用场景记账</view>
			<view style="margin-left: 45rpx;margin-right: 45rpx;margin-top: 30rpx;">
				<tm-dragGrid :disabled="disabledGrid" :list="sceneList" :width="560" :col="5">
				<template v-slot:default="{item}">
					<view class="flex-center flex-col" style="width:70%">
						<tm-badges @click="delitem(item)" v-if="!disabledGrid" :offset="[0,-5]"
							icon="icon-times"></tm-badges>
						<tm-icons :size="45" :name="item.sceneIcon" @click='sceneDetail(item)'></tm-icons>
						<text class="text-size-s pt-10">{{item.sceneName}}</text>
					</view>
				</template>
			</tm-dragGrid>
			</view>
			
		</tm-sheet>
		
		<tm-poup v-model="show_scene_detail" :position="pos" :height="1000">
			<tm-grouplist @change="test" :title="scenedetail.sceneName" title-theme="blue text">
				<tm-listitem v-for="(item, index) in scenedetail.details" group :title="item.detailName">
					<template v-slot:group>
						<view>

							<tm-input  title="事件名称" v-model="detail.outcomeName"
								:placeholder="item.detailName" align="left"></tm-input>
							<tm-input  title="事件金额" v-model="detail.outcome" placeholder="请输入金额"
								align="left"></tm-input>
							<tm-row>
								<tm-col :grid="3" justify="right" style="margin-top: 20rpx;margin-left: -14rpx;">
									<text style="font-size: 29rpx;margin-top: -10rpx;">事件类别</text>
								</tm-col>
								<tm-col :grid="1" justify="left" style=" margin-top: 23rpx; margin-left: 10;">
									
									<tm-icons :name='item.typeIcon' style="margin-left: 35rpx;" size="40rpx"></tm-icons>
									
								</tm-col>
								<tm-col :grid="7" justify="left" style=" margin-top: 22rpx; margin-left: 27rpx;">
									
									<text style="font-size: 26rpx;"> {{item.typeName}}</text>
								</tm-col>
							</tm-row>
							
							<tm-pickersDate @confirm="dateChange" default-value="2022-12-31" end="2021-12-31">
								<view class="fulled">
									<tm-input  :disabled="true" title="时间" v-model="detail.date"
										right-icon="icon-angle-right" placeholder="请输入时间" align="right"></tm-input>
								</view>
							</tm-pickersDate>
							<tm-button @click="submitSceneDetail(item.typeId)">提交事件</tm-button>
						</view>
					</template>

				</tm-listitem>
			</tm-grouplist>
		</tm-poup>


	</tm-fullView>
</template>

<script>
	import tmGrouplist from '@/tm-vuetify/components/tm-grouplist/tm-grouplist.vue';
	import tmPickersDate from '@/tm-vuetify/components/tm-pickersDate/tm-pickersDate.vue';
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
			tmPickersDate,
			tmGrouplist
		},
		data() {
			return {
				show_poup: false,
				pos: 'bottom',
				reqData: {
					typeName: '',
					typeIcon: ''
				},
				show_1: false,
				detail: {
					typeId: '',
					outcomeName: '',
					outcome: '',
					date: ''
				}

				,
				show_scene_detail: false,
				scenedetail: [],
				disabledGrid: true,
				sceneList: [],


				iconList: [
					{ typeIcon: "myicon-fukuan", typeName: "myicon-fukuan" },


				],
			};
		},
		onLoad() {

			http.get('/youngster/getConsumeSceneList', {header:{token:this.$store.state.token}}).then(res => {
				console.log(res)
				this.sceneList = res.data.data

			}).catch(err => {

			})
		},
		methods: {
			test(e) {
				console.log(e)
			},
			dateChange(e) {
				this.detail.date = e.year + '-' + e.month + '-' + e.day;
			},
			submitSceneDetail(id) {
				this.detail.typeId = id
				console.log(this.detail)
				http.post('/youngster/addScenedOutcome', this.detail, {
				header:{token:this.$store.state.token}
				
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},

			sceneDetail(i) {

				this.show_scene_detail = true

				http.get('/youngster/getConsumeSceneDetail', {
					params: {
						sceneId: i.sceneId
					},
					header:{token:this.$store.state.token}
				}).then(res => {
					console.log("sceneDetailList")
					console.log(res)
					this.scenedetail = res.data.data

				}).catch(err => {

				})
			},


			addtype() {
				console.log(this.reqData)
				http.post('/youngster/addConsumeType', {
					"typeName": this.reqData.typeName,
					"typeIcon": this.reqData.typeIcon
				}, {header:{token:this.$store.state.token}}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			ooo(e) {
				console.log(e)
				console.log("0000")
				this.show_poup = true
				console.log(this.show_poup)
			},
			add() {
				this.show_poup = true
			},
			delitem(item) {
				console.log(item.typeId)
				http.put('/youngster/deleteConsumeType', {
					"typeId": item.typeId,
				}, {header:{token:this.$store.state.token}}).then(res => {

				}).catch(err => {
					console.log(err)
				})
				http.get('/youngster/getTypeList', {header:{token:this.$store.state.token}}).then(res => {
					console.log(res)
					this.typeList = res.data.data

				}).catch(err => {

				})
			},
			submit(e) {
				console.log(e)
				//e为false表示校验未通过。否则为数据集合对象数据。
				if (e === false) {
					uni.$tm.toast("请填写必填项。")
				}
			},

			//当前使用自动验证提交数据到服务器时，提交后，会触发此request事件，下面 的e是服务器返回的数据。
			success(e) {
				//提交成功 。
				uni.$tm.toast(e.msg)
			},
			change(e) {
				console.log(e),
					this.reqData.typeIcon = e.data.text
				this.$tm.toast(`点击了：${e.index},数据为：${JSON.stringify(e.data)}`)
			},
		},
	};

</script>


<style lang="scss">

</style>


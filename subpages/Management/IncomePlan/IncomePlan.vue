<template>
	<tm-full-view>
		<tm-sheet>
			<tm-row>
				<tm-col :grid="6" justify="right">
					<text style="font-size: 35rpx; margin-right: 20rpx;font-weight: 600;">选择月份  :</text>
				</tm-col>
				<tm-col :grid="6" style="margin-top: 6rpx;" justify="left">
					<tm-pickersDate :start="start_d" :end="end_d" :showDetail="showDetail" :default-value="date"
					@confirm="dateSet">
					<text style="font-size: 35rpx;font-weight: 600;" >{{date}}</text>
				</tm-pickersDate>
				</tm-col>
				
			</tm-row>


		</tm-sheet>
		<tm-sheet style="height: 800rpx;">

			<tm-switchList v-for="(item,index) in incomePlanList" :key="index" @actionsClick="onClick(item)"
				:actions="item_1" :height="100">
				<tm-row style="width:560rpx">
					<tm-col :grid="2" justify="left">
						<tm-icons :name="item.typeIcon" size="40rpx"></tm-icons>
					</tm-col>
					<tm-col :grid="8" justify="left">
						<text style="font-size: 28rpx;">{{item.incomePlanName}}</text>
					</tm-col>
					<tm-col :grid="2" justify="right">
						<text style="margin-right: 30rpx ;font-size: 25rpx;">￥{{item.cost}}</text>
					</tm-col>
				</tm-row>
			</tm-switchList>
		</tm-sheet>
		<tm-button @click="addincomePlan_show=!addincomePlan_show" block :width="560" style="margin-left: 90rpx;position: absolute;bottom:70rpx">添加收入规划</tm-button>
		<tm-poup v-model="addincomePlan_show" :position="pos" :height="1000">
			
			<!-- <tm-input name="routineDetailName" required title="消费名称" v-model="nodeData.routineDetailName"></tm-input>
			<view style="margin-left: 50rpx;margin-right: 50rpx;">
				<tm-dragGrid :disabled="disabledGrid" :list="typeList">
					<template v-slot:default="{item}">
						<view class="flex-center flex-col" style="width:70%">
							<tm-icons :size="45" :name="item.typeIcon" @click="pickNodeType(item)"></tm-icons>
							<text class="text-size-s pt-10">{{item.typeName}}</text>
						</view>
					</template>
				</tm-dragGrid>
			</view>
				
			
				
			<tm-input name="routineDetailCost" required title="消费金额" v-model="nodeData.routineDetailCost"></tm-input>
			<tm-row style="position: absolute;bottom:0">
				<tm-col :grid="12">
					<tm-button @click="addConsumeNode">提交数据</tm-button>
				</tm-col>
			</tm-row> -->
			
		</tm-poup>
	</tm-full-view>
</template>

<script>
	import tmFlotbutton from "@/tm-vuetify/components/tm-flotbutton/tm-flotbutton.vue"

	import tmDropDownMenu from "@/tm-vuetify/components/tm-dropDownMenu/tm-dropDownMenu.vue"
	import tmInput from "@/tm-vuetify/components/tm-input/tm-input.vue"
	import tmMenu from "@/tm-vuetify/components/tm-menu/tm-menu.vue"
	import tmAvatar from '@/tm-vuetify/components/tm-avatar/tm-avatar.vue'
	import tmSwitchList from '@/tm-vuetify/components/tm-switchList/tm-switchList.vue';
	import tmSearch from '@/tm-vuetify/components/tm-search/tm-search.vue';
	import * as echarts from 'echarts'
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
			tmFlotbutton,
			tmDropDownMenu,
			tmInput,
			tmMenu,
			tmAvatar,
			tmSwitchList,
			tmSearch,
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
				addincomePlan_show:false,
				pos:"bottom",
				item_1: [
					{ text: "删除", width: 125, color: 'red' }
				],
				incomePlanList: [],
				showDetail: { year: true, month: true },
				date: '2023-1',
				start_d: '2020-12',
				end_d: '',
				options5: [{
					icon: 'trash-fill',
					style: {
						backgroundColor: '#f56c6c',
						width: '40px',
						height: '40px',
						borderRadius: '100px',
						margin: '0 6px'
					}
				}, {
					icon: 'heart-fill',
					style: {
						backgroundColor: '#5ac725',
						width: '40px',
						height: '40px',
						borderRadius: '100px',
						margin: '0 6px'
					}
				}]
			}
		},
		onLoad() {
			http.get('/youngster/getIncomePlanList', { params: { date: this.date }, header: {token:this.$store.state.token} }).then(res => {
				console.log(res)
				this.incomePlanList = res.data.data

			}).catch(err => {

			})
		},
		methods: {
			dateSet(e) {
				// {year: 2021, month: 8, day: 23}
				this.date = e.year + '-' + e.month;
				http.get('/youngster/getIncomePlanList', { params: { date: this.date }, header: {token:this.$store.state.token} }).then(res => {
					console.log(res)
					this.incomePlanList = res.data.data

				}).catch(err => {

				})
			},
			ooo(e) {
				console.log(e)
				console.log("0000")
				this.show_poup = true
			},

			onClick(t) {
				
					console.log('删除')
					http.put('/youngster/deleteIncomePlan', {
						"incomePlanId": t.incomePlanId,

					}, { header: {token:this.$store.state.token}, header: {token:this.$store.state.token}}).then(res => {
						console.log(res)
						console.log("删除一条记录")
					}).catch(err => {
						console.log(err)
					})
				


			},
			change(e) {
				console.log(e)
				console.log('change')
			},
			submit(e) {
				console.log(e)
				//e为false表示校验未通过。否则为数据集合对象数据。
				if (e === false) {
					uni.$tm.toast("请填写必填项。")
				}
			},
			//通过ref手动获取表单数据，不会验证。
			async getData(e) {
				let d = await this.$refs.formData.getFormData();
				uni.showModal({
					title: "数据如下",
					content: JSON.stringify(d),
					showCancel: false
				})
			},
			//当前使用自动验证提交数据到服务器时，提交后，会触发此request事件，下面 的e是服务器返回的数据。
			success(e) {
				//提交成功 。
				uni.$tm.toast(e.msg)
			}
		}
	}

</script>

<style>

</style>


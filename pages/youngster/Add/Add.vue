<template>
	<tm-fullView>
		<tm-menubars title="添加记账" color="teal"  :showback="true"></tm-menubars>
		<tm-sheet style="height: 230rpx;opacity: 0.92;margin-top: 30rpx;" @click="fastadd(2)" shadow="0" >
			<tm-row>
				<tm-col :grid="12">
					<tm-icons name="myicon-xiangji" size="120"></tm-icons>
				</tm-col>
			</tm-row>
			<tm-row>
				<tm-col :grid="12">
					<text style="font-size: 40rpx;">拍照记账</text>
				</tm-col>
			</tm-row>
			<tm-row>
				<tm-col :grid="12">
					<text style="font-size: 25rpx;">任何票据，马上就记</text>
				</tm-col>
			</tm-row>
		</tm-sheet>


		<tm-row style="margin-top: -38rpx;opacity: 0.92;">
			<tm-col :grid="7">
				<tm-sheet style="height: 260rpx;width: 312rpx;" @click="fastadd(1)" shadow="0">

					<tm-icons name="icon-database-plus" size="100" color="black" style="margin-top: 50rpx;"></tm-icons><br/>
					<view style="margin-top: 20rpx;">
						<text style="font-size: 50rpx;">类别记账</text>
					</view>
					


				</tm-sheet>

			</tm-col>
			<tm-col :grid="5">
				<tm-row>
					<tm-col :grid="12">
						<tm-sheet style="height: 86rpx;width:220rpx;margin-left:-6rpx;opacity: 0.92;" shadow="0"  @click="fastadd(3)">
							<tm-icons name="myicon-yuyin" size="80" style="margin-left: 0rpx;margin-top: -20rpx;"></tm-icons><br/>
							<text style="font-size: 30rpx;">语音记账</text>
						</tm-sheet>
					</tm-col>
				</tm-row>
				<tm-row style="margin-top: -45rpx;">
					<tm-col :grid="12">
						<tm-sheet style="height: 86rpx;width:220rpx;margin-left:-6rpx;opacity: 0.92;" shadow="0"  @click="fastadd(4)">
							<tm-icons name="myicon-shouxieqianming" size="55"></tm-icons><br/>
							<text style="font-size: 30rpx;">手写记账</text>
						</tm-sheet>

					</tm-col>
				</tm-row>
			</tm-col>
		</tm-row>

		
		
		
		
		<tm-sheet style="height: 70rpx;margin-top: -10rpx;opacity: 0.92;" @click="fastadd(5)" shadow="0">
			<tm-col :grid="2"></tm-col>
			<tm-col :grid="1" justify="right" style="margin-right: -15rpx;margin-top: 10rpx;">
				<tm-icons name="icon-folder-plus" size="45" color="black" style="margin-top: -20rpx;"></tm-icons>

			</tm-col>
			<tm-col :grid="1" style="margin-top: -10rpx;">
				<text style="font-size: 60rpx;font-weight: 600;">/</text>

			</tm-col>	
			<tm-col :grid="1" justify="left" style="margin-left: -15rpx;margin-top:25rpx ;">
			
				<tm-icons name="icon-picture" size="45" color="black"></tm-icons>

			</tm-col>
			<tm-col :grid="6" style="margin-top:5rpx">
				<text style="font-size: 40rpx;">批量记账</text>
			</tm-col>

		</tm-sheet>
		
		<tm-row>
			<tm-col :grid="6">
				<tm-sheet style="height: 70rpx;margin-top: -10rpx;opacity: 0.92;width: 262rpx;" @click="fastadd(6)" shadow="0">
					<tm-col :grid="4" justify="right">
						<tm-icons name="myicon-a-02_luxian" size="70" color="black"></tm-icons>
					</tm-col>
					<tm-col :grid="7" style="margin-top:15rpx">
						<text style="font-size: 30rpx;">路线记账</text>
					</tm-col>
				
				</tm-sheet>
			</tm-col>
			<tm-col :grid="6">
				<tm-sheet style="height: 70rpx;margin-top: -10rpx;opacity: 0.92;width: 262rpx;margin-left: 8rpx;" @click="fastadd(7)" shadow="0">
					<tm-col :grid="4" justify="right">
						<tm-icons name="icon-location" size="60" color="black"></tm-icons>
					</tm-col>
					<tm-col :grid="7" style="margin-top:15rpx">
						<text style="font-size: 30rpx;">场景记账</text>
					</tm-col>
				
				</tm-sheet>
			</tm-col>
		</tm-row>
		




		<tm-bottomnavigation
			:safe="true"
			style="height: 90rpx;"
			
			position="bottom"
			:round="2"
			:offset-left="15"
			:bottom="10"
			:icon-color="[$tm.vx.state().tmVuetify.color]"
			:list="list_1"
		></tm-bottomnavigation>
	</tm-fullView>

</template>

<script>
	import tmEcharts from '@/tm-vuetify/components/tm-echarts/tm-echarts.vue';
	import tmFlotbutton from "@/tm-vuetify/components/tm-flotbutton/tm-flotbutton.vue"
	import tmCol from "@/tm-vuetify/components/tm-col/tm-col.vue"
	import tmRow from "@/tm-vuetify/components/tm-row/tm-row.vue"
	import indexBackgroundImage from "@/static/image/TopImage.png"
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
	import tmBottomnavigation from "@/tm-vuetify/components/tm-bottomnavigation/tm-bottomnavigation.vue"

	// import Request from 'luch-request' // 使用npm

	const http = new Request();
	export default {
		components: {
			tmBottomnavigation,
			tmEcharts,
			tmCol,
			tmRow,
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
				show_1: false,
				active: 2,
				list_manage: [{
						icon: 'icon-QQ',
						text: '消费类型',
						color: 'blue',
						dot: true,
						url: '../../../subpages/Management/ConsumeType/ConsumeType'
					},
					{
						icon: 'icon-weibo',
						text: '支出记录',
						iconSize: 40,
						color: 'red',
						dot: true,
						url: '../../../subpages/Management/OutcomeRecord/OutcomeRecord'
					},
					{
						icon: 'icon-pengyouquan',
						text: '固定消费',
						color: 'green',
						fontColor: 'green',
						dot: true,
						url: '../../../subpages/Management/ConsumeRoutine/ConsumeRoutine'
					},
					{
						icon: 'icon-aliwangwang',
						text: '提前消费',
						color: 'blue-grey',
						dot: true,
						url: '../../../subpages/Management/LoanRecord/LoanRecord'
					},
					{
						icon: 'icon-pengyouquan',
						text: '收入',
						color: 'green',
						fontColor: 'green',
						url: '../../../subpages/Management/IncomeRecord/IncomeRecord'
					},
					{
						icon: 'icon-pengyouquan',
						text: '管理圈子',
						color: 'green',
						fontColor: 'green',
						url: '../../../subpages/Management/GoingDutch/GoingDutch'
					},
				],
				list_1: [
					{ iconSize: 46, icon: 'icon-border-bottom', value: '首页', path: '/pages/youngster/Pindex/Pindex' },
					{ iconSize: 46, icon: 'icon-user-group', value: '好友', path: '/pages/youngster/Analysis/Analysis' },
					{
						iconSize: 46,
						icon: 'icon-plus',
						value: '记账',
						custom: true,
						customColor: 'teal',
						customFontColor: 'a1d4d0',
						path: '/pages/youngster/Add/Add'
					},
					{ iconSize: 46, icon: 'icon-chart-line', value: '分析', path: '/pages/youngster/Manage/Manage' },
					{ iconSize: 46, icon: 'icon-process', value: '我', path: '/pages/youngster/Me/Me' }
				],
				list: [{
						icon: 'myicon-xiangji',
						color: 'white'
					},
					{
						icon: 'myicon-shouxieqianming',
						color: 'white'
					},
					{
						icon: 'myicon-yuyin',
						color: 'white'
					}
				],
				pickType: "",
				if_resetDate: false,
				resetDate: {
					startTime: "2023-01-01",
					endTime: "2023-04-08"
				},

			}
		},

		created() {

			this.day_List = this.formatEveryDay(this.$store.state.thisMonth_begin, this.$store.state.nowTime)
			this.getMonData(this.$store.state.thisMonth_begin, this.$store.state.nowTime, this.$store.state.thisMonth_end,
				this.pickType)

		},

		mounted() {},
		methods: {
			fastadd(e) {
				if (e === 1) {
					uni.navigateTo({
						url: '/subpages/FastAdd/AddByRecord/AddByRecord'
					})
				}
				if (e === 2) {
					uni.navigateTo({
						url: '/subpages/FastAdd/AddByPhoto/AddByPhoto'
					})
				}
				if (e === 3) {
					uni.navigateTo({
						url: '/subpages/FastAdd/AddBySound/AddBySound'
					})
				}
				if (e === 4) {
						uni.navigateTo({
							url: '/subpages/FastAdd/AddByPhoto/AddByPhoto'
						})
					}
					if (e === 5) {
							uni.navigateTo({
								url: '/subpages/FastAdd/AddBatch/AddBatch'
							})
						}
				if (e === 6) {
						uni.navigateTo({
							url: '/subpages/Management/ConsumeRoutine/ConsumeRoutine'
						})
					}
				if (e === 7) {
						uni.navigateTo({
							url: '/subpages/Management/ConsumeScene/ConsumeScene'
						})
					}
				
				}
				
				
			
			

		}
	}

</script>

<style>

</style>


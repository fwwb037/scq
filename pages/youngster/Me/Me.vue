<template>
	<tm-full-view>
		<tm-menubars title="设置" color="teal"  :showback="true"></tm-menubars>
		<image src="/static/image/ShangShou_Me.png" style="width: 100%; margin-top: -50rpx;"></image>
		<tm-sheet :shadow="24" style="margin-top: -230rpx; position: relative;z-index: 10;height: 250rpx;opacity: 0.96;"
			bgColor="#e2f4f3">



			<tm-row>
				<tm-col :grid="5" style="margin-top: -140rpx; margin-left: 0rpx;">
					<tm-avatar :src="userDetail.headImg" :size="250"></tm-avatar>
				</tm-col>
				<tm-col :grid="7" justify="right" style="margin-top: -12rpx;margin-left: -40rpx;">
					<tm-row>
						<tm-col :grid="12" justify="right">

							<text style="font-size: 38px;font-weight: 600;">{{userDetail.userName}}</text>
						</tm-col>
					</tm-row>
					<tm-row style="margin-top: 10rpx;">
						<tm-col :grid="12" justify="right">
							<text style="font-size: 10px;font-weight: 800;">编号：</text>
							<text style="font-size: 10px;font-weight: 500;">{{userDetail.userId}}</text>
						</tm-col>
					</tm-row>

				</tm-col>
			</tm-row>
			<tm-divider :fllowTheme="false" color="green" style="margin-top: 20rpx;"></tm-divider>

			<tm-row style="margin-top: 20rpx;">
				<tm-col :grid="5">
					<text style="font-size: 18px;font-weight: 800;">号码：</text>
					<text style="font-size: 18px;font-weight: 500;">{{userDetail.phoneNumber}}</text>
				</tm-col>
				<tm-col :grid="7">
					<text style="font-size: 18px;font-weight: 800;">年龄：</text>
					<text style="font-size: 18px;font-weight: 500;">{{userDetail.ageGroup}}</text>

				</tm-col>
			</tm-row>

		</tm-sheet>
		<tm-sheet style="opacity: 0.9;">
			<tm-dragGrid :disabled="disabledGrid" :list="this.ManageList" style="margin-top: 50rpx;" :item-height="150">
				<template v-slot:default="{item}">
					<view class="flex-center flex-col" style="width:70% margin-top:50rpx">
						<tm-icons :name="item.Icon" :size="50" @click="ManageItem(item)" color="black"></tm-icons>
						<text class="text-size-s pt-10">{{item.iconName}}</text>
					</view>
				</template>
			</tm-dragGrid>
		</tm-sheet>
		
		<view  style="opacity: 0.9;">
			<tm-grouplist title="数据管理" title-color="#c4e2e0" :shadow="24" :round="10" :padding="[42, 42]" >
			<tm-listitem title="消息" left-icon="icon-comment-lines" show-left-icon></tm-listitem>
			<tm-listitem title="云同步" left-icon="icon-clouddownload" show-left-icon></tm-listitem>
			<tm-listitem title="数据备份" left-icon="icon-cloud-machine" show-left-icon left-icon-color="green"></tm-listitem>
		</tm-grouplist>
		</view>
		<view style="height: 120rpx;">
			
		</view>



		<tm-poup v-model="show_setColor" :position="pos" :height="900">
			<view class="ma-32  ">
				<view class=" round-8 mb-24 fulled py-n16"
					:class="$tm.vx.state().tmVuetify.black ? 'grey-darken-5 bk' : 'white'">
					<view class="flex-center flex-col pa-32">
						<view class="text-size-lg text-weight-b">更换主题</view>
						<view class="text-size-n py-12">当前:{{$tm.vx.state().tmVuetify.color}},更多主题请查阅官方文档</view>

						<view class="flex">
							<tm-pickers @confirm="change" :default-value="defaultTheme" :list='themeSList' title="请选择主题"
								btn-color="pr imary">
								<tm-tags color="primary" size="g" model="text">选择内置主题</tm-tags>
							</tm-pickers>
							<view class="flex-shrink"><tm-tags @click="clearTheme" color="primary" size="g"
									model="text">恢复默认布局</tm-tags></view>
						</view>
					</view>
				</view>

				<view class=" round-8 mb-24 fulled  py-n16"
					:class="$tm.vx.state().tmVuetify.black ? 'grey-darken-5 bk' : 'white'">
					<view class="flex-center flex-col pa-32">

						<view class="text-size-lg text-weight-b">暗黑主题的切换</view>
						<view class="text-size-n py-12">当前:{{$tm.vx.state().tmVuetify.black?'暗黑模式':'亮色模式'}}</view>
						<view class="flex">
							<tm-tags @click="$tm.theme.setBlack(true)" color="primary" size="g"
								model="text">切换暗黑</tm-tags>
							<view class="flex-shrink"><tm-tags @click="$tm.theme.setBlack(false)" color="primary"
									size="g" model="text">切换亮色</tm-tags></view>
						</view>
					</view>
				</view>
			</view>
		</tm-poup>
		
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
	</tm-full-view>
</template>

<script>
	import tmDivider from "@/tm-vuetify/components/tm-divider/tm-divider.vue"
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
			tmDivider,
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
				show_setColor:false,
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
				ManageList: [
					{ Icon: 'icon-home', iconName: '家庭' },
					{ Icon: 'icon-chart-relation', iconName: '主题' },
					{ Icon: 'icon-tag', iconName: '类型' },
					{ Icon: 'myicon-gerendaikuan-copy', iconName: '贷款' },
					{ Icon: 'myicon-dixiaofei', iconName: '收入规划' },
					{ Icon: 'myicon-yujing', iconName: '预警' },
					{ Icon: 'myicon-a-02_luxian', iconName: '路线' },
					{ Icon: 'icon-location', iconName: '场景' }
				],
				disabledGrid: true,
				userDetail: [],
				list_1: [
					{ iconSize: 46, icon: 'icon-border-bottom', value: '首页', path: '/pages/youngster/Pindex/Pindex' },
					{ iconSize: 46, icon: 'icon-user-group', value: '好友',path:'/pages/youngster/Analysis/Analysis' },
					{ iconSize: 46, icon: 'icon-plus', value: '记账' ,custom: true,customColor: 'teal',customFontColor:'a1d4d0', path: '/pages/youngster/Add/Add' },
					{ iconSize: 46, icon: 'icon-chart-line', value: '分析', path: '/pages/youngster/Manage/Manage' },
					{ iconSize: 46, icon: 'icon-process', value: '我', path: '/pages/youngster/Me/Me' }
				],
				defaultTheme: [],
				themeSList: ["primary", "red", "green", "blue", "pink", "orange", "yellow", "indigo"],
				infoHeight: 0
			};
		},
		created() {
			http.get('/youngster/getFriendInfo', {
				params: { userId: this.$store.state.username },
				header: {token:this.$store.state.token}
			}).then(res => {
				console.log(res)
				this.userDetail = res.data.data
				this.show_userDetail = true
			}).catch(err => {

			})
			this.defaultTheme = [this.$tm.vx.state().tmVuetify.color || 'primary']
			this.infoHeight = uni.getSystemInfoSync().windowHeight
		},
		methods: {
			
			ManageItem(e) {
				console.log(e)
				if(e.iconName==='家庭'){
					uni.navigateTo({
						url: '/subpages/Family/FamilyIndex/FamilyIndex'
					})
				}
				if(e.iconName==='路线'){
					uni.navigateTo({
						url: '/subpages/Management/ConsumeRoutine/ConsumeRoutine'
					})
				}
				if(e.iconName==='主题'){
					this.show_setColor=true
				}
				if(e.iconName==="类型"){
					uni.navigateTo({
						url: '/subpages/Management/ConsumeType/ConsumeType'
					})
				}
				if(e.iconName==="收入规划"){
					uni.navigateTo({
						url: '/subpages/Management/IncomePlan/IncomePlan'
					})
				}
				if(e.iconName==="路线"){
					uni.navigateTo({
						url: '/subpages/Management/ConsumeRoutine/ConsumeRoutine'
					})
				}
				if(e.iconName==="贷款"){
					uni.navigateTo({
						url: '/subpages/Management/LoanRecord/LoanRecord'
					})
				}
				if(e.iconName==="场景"){
					uni.navigateTo({
						url: '/subpages/Management/ConsumeScene/ConsumeScene'
					})
				}
			},
			change(e) {
				this.defaultTheme = [e[0].data]
				this.$tm.theme.setTheme(e[0].data)
			},
			clearTheme() {
				this.$tm.theme.clear();
				this.defaultTheme = ['primary']
			},
			flotChange(e) {
				console.log(e)
				if (e === 0) {
					plus.camera.getCamera().captureImage(function(e) {
						plus.io.resolveLocalFileSystemURL(e, function(entry) {
							entry.file(function(file) {
								// console.log(e, entry.toLocalURL());
								this.img = entry.toLocalURL() //图片的本地路径
								this.imgfile = file.name //图片的文件名
							})
						}, function(e) {
							console.log("读取拍照文件错误：" + e.message);
						});
					});
				}
				if (e === 1) {
					uni.chooseImage({
						count: 6, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							console.log(JSON.stringify(res.tempFilePaths));
						}
					});
				}
				if (e === 2) {
					uni.navigateTo({
						url: '/subpages/FastAdd/AddBySound/AddBySound'
					})
				}
			},

		},
	}

</script>

<style lang="scss">

</style>


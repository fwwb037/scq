<template>
	<tm-fullView>


		<tm-row>
			<tm-col :grid="2" justify="left">
				<text style="font-size: 60rpx;font-weight: 500;">

				</text>
			</tm-col>
			<tm-col :grid="8">
				<tm-segTabs :gutter="10" round="0" :list="list_top" fontSize="s" activeFontColor="primary" v-model="active"
					@change="setType"></tm-segTabs>
			</tm-col>
			<tm-col :grid="1" justify="right">
				<tm-menu :list="!flag?list_friend:list_group" ment-direction="right" tip-direction="right"
					@change="manage">
					<tm-icons name="icon-plus" :size="40" style="margin-top:18rpx; margin-left: 50rpx;"></tm-icons>
				</tm-menu>
			</tm-col>
		</tm-row>



		
		<tm-search placeholder="搜索小程序/公众号" @focus="showRightSearch=true" @blur="showRightSearch=false" confirmText="取消"
			:showRight="showRightSearch"></tm-search>
		<view  v-if="!flag">

			
			<tm-switchList v-for="(item,index) in friendList" :key="index" @click="open_dialog(item)"
				@actionsClick="friendAc($event,item)" dot="999+" :rightLabel="item.lastDialogueTime"
				rightIcon="icon-comment-dots" :icon="item.headImg" :title="item.userName" :label="item.lastDialogue"
				:actions="item_1"></tm-switchList>

		</view>
		<view  v-if="flag">
			
			<tm-switchList v-for="(item,index) in groupList" :key="index" @click="open_dialog(item)" dot="999+"
				@actionsClick="groupAc($event,item)"
				:rightLabel="item.lastDialogueTime" rightIcon="icon-comment-dots" :icon="item.groupImg"
				:title="item.groupName" :label="item.lastDialogue" :actions="item_2"></tm-switchList>

		</view>
		<view style="height: 120rpx;">
			
		</view>

		<tm-poup v-model="show_userDetail" :position="pos" :height="700">
			<tm-sheet>
				<tm-row>
					<tm-col :grid="4.5"></tm-col>
					<tm-col :grid="2" justify="left">
						<tm-avatar :src="userDetail.headImg" :size="150"></tm-avatar>
					</tm-col>
				</tm-row>
				<tm-row style="margin-top:20rpx">

					<tm-col :grid="6"><text style="font-size: 18px;font-weight: 800;"> 编号：</text></tm-col>
					<tm-col :grid="6" justify="left"><text
							style="font-size: 18px;font-weight: 500;">{{userDetail.userId}}</text></tm-col>
				</tm-row>
				<tm-row style="margin-top:20rpx">

					<tm-col :grid="6"><text style="font-size: 18px;font-weight: 800;">昵称：</text></tm-col>
					<tm-col :grid="6" justify="left"><text
							style="font-size: 18px;font-weight: 500;">{{userDetail.userName}}</text></tm-col>
				</tm-row>
				<tm-row style="margin-top:20rpx">

					<tm-col :grid="6"><text style="font-size: 18px;font-weight: 800;">性别：</text></tm-col>
					<tm-col :grid="6" justify="left"><text
							style="font-size: 18px;font-weight: 500;">{{userDetail.sex}}</text></tm-col>
				</tm-row>
				<tm-row style="margin-top:20rpx">

					<tm-col :grid="6"><text style="font-size: 18px;font-weight: 800;">号码：</text></tm-col>
					<tm-col :grid="6" justify="left"><text
							style="font-size: 18px;font-weight: 500;">{{userDetail.phoneNumber}}</text></tm-col>
				</tm-row>
				<tm-row style="margin-top:20rpx">

					<tm-col :grid="6"><text style="font-size: 18px;font-weight: 800;">年龄：</text></tm-col>
					<tm-col :grid="6" justify="left"><text
							style="font-size: 18px;font-weight: 500;">{{userDetail.ageGroup}}</text></tm-col>
				</tm-row>
			</tm-sheet>
		</tm-poup>
		<tm-poup v-model="show_addFriend" :position="pos" :height="900">
			<tm-search @confirm="searchFriend" clear v-model="search_value" placeholder="用户编号" confirmText="添加好友"
				color="green" insertColor="green" align="center"></tm-search>

			<tm-card v-if="show_search" :img="searchDetail.headImg" :imgRound="24" subTitle="完整卡片"
				:title="searchDetail.userName" :subText="searchDetail.phoneNumber" :content="searchDetail.ageGroup"
				:action="['确认']" :btnColor="['primary', 'red']" statusText="当前未领取" statusColor="red"
				@action-click="cardClick($event,searchDetail.phoneNumber)"></tm-card>
		</tm-poup>

		<tm-poup v-model="show_dutch_friend" :position="pos" :height="1100">
			<tm-full-view
				:class="$tm.vx.state().tmVuetify.black ? 'grey-darken-5' : 'white'">
				
				<tm-sheet>
					<text>好友列表</text>
					<tm-dragGrid :disabled="disabledGrid" :list="list_dutch" style="margin-top: 50rpx;" :item-height="150">
					<template v-slot:default="{item}">
						<view class="flex-center flex-col" style="width:70% margin-top:50rpx">
							<tm-badges v-if="item.pick" :offset="[0,-5]" icon="icon-plus"></tm-badges>
							<tm-avatar :src="item.headImg" @click="addDutch(item)"></tm-avatar>
							<text class="text-size-s pt-10">{{item.userName}}</text>
						</view>
					</template>
				</tm-dragGrid>
				</tm-sheet>
				<tm-sheet>
					
					<tm-input  title="名称" v-model="add_dutch_friend_record.outcomeName" placeholder="请输入事件名称"
						align="right" style="margin-left: 20rpx;"></tm-input>
					<tm-input  title="金额" v-model="add_dutch_friend_record.outcome" placeholder="请输入产品价格"
						align="right" style="margin-left: 20rpx;"></tm-input>
					<tm-pickersDate @confirm="dateChange" :default-value=" add_dutch_friend_record.date" end="2025-12-31">
						<view class="fulled">
							<tm-input :required="true" :disabled="true" title="日期"  v-model="add_dutch_friend_record.date"   right-icon="icon-angle-right"  placeholder="情选择日期" align="right"></tm-input>
						</view>
					</tm-pickersDate>
					<tm-row style="margin-top: 20rpx;">
						<tm-col :grid="3">
							<text style="font-size: 14px;">类别</text>

						</tm-col>
					<tm-col :grid="9" >
						<tm-dropDownMenu @confirm="confirm" unColor="black" activeColor="gray" bg-color="white" color="whtie" :list="list_test" style="width: 70%;margin-left: 130rpx;"></tm-dropDownMenu>

					</tm-col>
					</tm-row>
					
				
				</tm-sheet>
				
				

					

				
				<view class="pa-32">
					<tm-button theme="bg-gradient-green-accent" block
						@click="submit_add_dutch">提交选择</tm-button>
				</view>
			</tm-full-view>
		</tm-poup>
		<tm-poup  v-model="show_Request" :position="pos" :height="900">
			<tm-sheet v-for="(item,index) in requestList" :key="index" >
				
					<tm-row>
						<tm-col :grid="2">
							<tm-avatar :src="item.headImg"></tm-avatar>
						</tm-col>
						<tm-col :grid="6" justify="left">
							<text style="font-size: 20px;font-weight: 600;">{{item.userName}}</br></text>
							<text style="font-size: 15px;font-weight: 300;margin-top:40rpx">{{item.createdTime}}</text>
						</tm-col>
						<tm-col :grid="4">
							<tm-button @click="acceptFriendRequest(item)">同意</tm-button>
						</tm-col>
					</tm-row>
				
				
				
			</tm-sheet>
		</tm-poup>
		<tm-poup  v-model="show_createGroup" :position="pos" :height="900">
			<tm-full-view
				:class="$tm.vx.state().tmVuetify.black ? 'grey-darken-5' : 'white'">
				
				<tm-sheet>
					<text>好友列表</text>
					<tm-dragGrid :disabled="disabledGrid" :list="list_dutch" style="margin-top: 50rpx;" :item-height="150">
					<template v-slot:default="{item}">
						<view class="flex-center flex-col" style="width:70% margin-top:50rpx">
							<tm-badges v-if="item.pick" :offset="[0,-5]" icon="icon-plus"></tm-badges>
							<tm-avatar :src="item.headImg" @click="addDutch(item)"></tm-avatar>
							<text class="text-size-s pt-10">{{item.userName}}</text>
						</view>
					</template>
				</tm-dragGrid>
				</tm-sheet>
				<tm-sheet>
					
					<tm-input  title="名称" v-model="add_group_record.groupName" placeholder="请输入群名称"
						align="right" style="margin-left: 20rpx;"></tm-input>				
				</tm-sheet>

				<view class="pa-32">
					<tm-button theme="bg-gradient-green-accent" block
						@click="submit_create_group">提交选择</tm-button>
				</view>
			</tm-full-view>
			
		</tm-poup>
	<tm-poup v-model="show_group_dutch" :position="pos" :height="850">
		<tm-full-view
			:class="$tm.vx.state().tmVuetify.black ? 'grey-darken-5' : 'white'">
			<tm-sheet>
				<tm-row>
					<tm-col :grid="4.5"></tm-col>
					<tm-col :grid="2" justify="left">
						<tm-avatar :src="group_headImg" :size="150"></tm-avatar>
					</tm-col>
				</tm-row>
				<tm-input  title="名称" v-model="add_dutch_group_record.outcomeName" placeholder="请输入事件名称"
					align="right" style="margin-left: 20rpx;"></tm-input>
				<tm-input  title="金额" v-model="add_dutch_group_record.outcome" placeholder="请输入产品价格"
					align="right" style="margin-left: 20rpx;"></tm-input>
				<tm-pickersDate @confirm="dateChange" :default-value=" add_dutch_group_record.date" end="2025-12-31">
					<view class="fulled">
						<tm-input :required="true" :disabled="true" title="日期"  v-model="add_dutch_group_record.date"   right-icon="icon-angle-right"  placeholder="情选择日期" align="right"></tm-input>
					</view>
				</tm-pickersDate>
				<tm-row style="margin-top: 20rpx;">
					<tm-col :grid="3">
						<text style="font-size: 14px;">类别</text>
	
					</tm-col>
				<tm-col :grid="9" >
					<tm-dropDownMenu @confirm="confirm" unColor="black" activeColor="gray" bg-color="white" color="whtie" :list="list_test" style="width: 70%;margin-left: 130rpx;"></tm-dropDownMenu>
	
				</tm-col>
				</tm-row>
				
			
			</tm-sheet>
			
			
			<view class="pa-32">
				<tm-button theme="bg-gradient-green-accent" block
					@click="submit_add_dutch_group">提交选择</tm-button>
			</view>
		</tm-full-view>
	</tm-poup>	
	<tm-poup  v-model="show_groupDetail" :position="pos" :height="900">
		<tm-full-view
			:class="$tm.vx.state().tmVuetify.black ? 'grey-darken-5' : 'white'">
			
			<tm-sheet>
				<tm-row>
					<tm-col :grid="4" >
						<text style="font-size: 20px;font-weight: 800;">群组名称:</text>
					</tm-col>
					<tm-col :grid="8" justify="left">
						<text style="font-size: 20px;font-weight: 800;">{{groupDetail.groupName}}</text>

					</tm-col>
				</tm-row>
				<tm-row style="margin-top: 30rpx;">
					<tm-col :grid="4">
						<text style="font-size: 20px;font-weight: 800;">群组编号:</text>
					</tm-col>
					<tm-col :grid="8" justify="left">
						<text style="font-size: 20px;font-weight: 800;">{{groupDetail.groupId}}</text>

					</tm-col>
				</tm-row>
				<tm-row style="margin-top: 30rpx;">
					<tm-col :grid="3"><text style="font-size: 14px;font-weight: 500;">群友列表</text></tm-col>
				</tm-row>
				<tm-dragGrid :disabled="disabledGrid" :list="this.groupDetail.groupMembers" style="margin-top: 50rpx;" :item-height="150">
				<template v-slot:default="{item}">
					<view class="flex-center flex-col" style="width:70% margin-top:50rpx">
						
						<tm-avatar :src="item.headImg" ></tm-avatar>
						<text class="text-size-s pt-10">{{item.userName}}</text>
					</view>
				</template>
			</tm-dragGrid>
			</tm-sheet>
			<tm-sheet>
				
				<tm-input  title="修改名称" v-model="ReGroupName" placeholder="请输入群名称"
					align="right" style="margin-left: 20rpx;"></tm-input>				
			</tm-sheet>
	
			<view class="pa-32">
				<tm-button theme="bg-gradient-green-accent" block
					@click="Reset_groupName">提交选择</tm-button>
			</view>
		</tm-full-view>
		
	</tm-poup>
		
		
		<tm-flotbutton @change="flotChange" 
		:absolute="true"
		 :fixed="false"
		:safe="true"
		bottom="10rpx"
		style="margin-top: -100rpx;"
		actions-pos="top" 
		label="快记" 
		:show-text="true"
		bgcolor	="#80CBC4" 
		:actions="list">
		</tm-flotbutton>
		
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
				list_1: [
					{ iconSize: 46, icon: 'icon-border-bottom', value: '首页', path: '/pages/youngster/Pindex/Pindex' },
					{ iconSize: 46, icon: 'icon-user-group', value: '好友',path:'/pages/youngster/Analysis/Analysis' },
					{ iconSize: 46, icon: 'icon-plus', value: '记账' ,custom: true,customColor: 'teal',customFontColor:'a1d4d0', path: '/pages/youngster/Add/Add' },
					{ iconSize: 46, icon: 'icon-chart-line', value: '分析', path: '/pages/youngster/Manage/Manage' },
					{ iconSize: 46, icon: 'icon-process', value: '我', path: '/pages/youngster/Me/Me' }
				],
				ReGroupName:"",
				show_Request:false,
				list_test: [{
						title: '请选择',
						children: [{
							
							model: "list",
							name:"list",
							children:[]
						}]
					}
				],
				add_dutch_group_record:{
					outcomeName:"",
					outcome:0,
					typeId:0,
					date:"2023-04-03",
				},
				add_group_record:{
					users:[],
					groupName:"",
					
				},
				add_dutch_friend_record:{
					friends:[],
					outcomeName:"",
					outcome:0,
					typeId:0,
					date:"2023-04-03"
				},
				disabledGrid: true,
				list_dutch: [],

				list_friend: [

					{ title: '添加好友', iconColor: 'blue' },
					{ title: '好友均摊', iconColor: 'blue' },
					{ title: '请求列表', iconColor: 'blue' },

				],
				list_group: [

					{ title: '新建群组', iconColor: 'blue' }
					
				],
				show_search: false,
				search_value: "",
				show_addFriend: false,
				open: false,
				open_1: false,
				showRightSearch: false,
				pos: "bottom",
				item_1: [
					{ text: "删除", width: 125, color: 'red' },
					{ text: "信息", width: 125, color: 'blue' },
				],
				item_2: [
					{ text: "解散", width: 83, color: 'red' },
					{ text: "记账", width: 83, color: 'green' },
					{ text: "信息", width: 83, color: 'blue' },
				],
				
				listLeng: 1,


				avatrUrl: "http://rse3hedfs.hd-bkt.clouddn.com/avater.jpg",

				incomePlanList: [],
			
				active: 0,
				list_top: ['好友', '群组'],

				flag: false,

				friendList: [],
				groupList: [],
				userDetail: [],
				searchDetail: [],
				show_userDetail: false,
				show_dutch_friend: false,
				show_createGroup:false,
				typeList:[],
				requestList:[],
				groupDetail:[],
				show_groupDetail:false,
				show_group_dutch:false,
				group_headImg:"",
				
				
			}
		},
		created() {
			http.get('/youngster/getFriendsList', {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)
					var list_dutch_temp = []
					this.list_dutch = res.data.data.friends
					for (var i = 0; i < this.list_dutch.length; i++) {
						list_dutch_temp.push({
							userId: this.list_dutch[i].userId,
							userName: this.list_dutch[i].userName,
							headImg: this.list_dutch[i].headImg,
							pick: false
						})
					}
					this.list_dutch = list_dutch_temp
				}).catch(err => {
			
				}),
			http.get('/youngster/getFriendsList', {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)
					this.friendList = res.data.data.friends
				}).catch(err => {

				}),
				http.get('/youngster/getGroupList', {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)
					this.groupList = res.data.data
				}).catch(err => {

				}),
				http.get('/youngster/getRequestList', {
					params:{
						header: {token:this.$store.state.token}
					}
				}).then(res => {
					console.log(res)
					this.requestList = res.data.data
				}).catch(err => {
				
				}),
				http.get('/youngster/getTypeList', {header: {token:this.$store.state.token}}).then(res => {
					console.log("getTypeList")
					console.log(res)
					this.typeList = res.data.data
					for(var i=0;i<this.typeList.length;i++){
						this.list_test[0].children[0].children.push(
						{
						title:this.typeList[i].typeName,
						id:this.typeList[i].typeId,
						}
						
						)
					}
				}).catch(err => {
				
				})
		},
		mounted() {

		},

		methods: {
			Reset_groupName(){
				console.log(this.groupDetail)
				console.log(this.ReGroupName)
				http.post('/youngster/updateGroupInfo', {
					groupId: this.groupDetail.groupId,
					groupName: this.ReGroupName
					
				
				}, {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)
				
				}).catch(err => {
					console.log(err)
				})
			},
			groupAc(e,i){
				console.log(e)
				
				if (e.index === 0) {
					console.log('删除好友')
					http.put('/youngster/deleteGroup', {
						params: { groupId: i.groupId }
				
					}, {header: {token:this.$store.state.token}}).then(res => {
						console.log(res)
						console.log("删除成功")
					}).catch(err => {
						console.log(err)
					})
				}
				if (e.index === 1) {
					this.show_group_dutch=true
					this.group_headImg=i.groupImg
				}
				if (e.index === 2) {
					http.get('/youngster/getGroupDetails', {
						params: {  groupId: i.groupId  },
						header: {token:this.$store.state.token}
					}).then(res => {
						console.log(res)
						this.groupDetail = res.data.data
						this.show_groupDetail = true
					}).catch(err => {
				
					})
				}
				
				console.log(i)
			},
			submit_create_group(){
				for(var i=0;i<this.list_dutch.length;i++){
					if(this.list_dutch[i].pick===true){
						this.add_group_record.users.push({
							userId:this.list_dutch[i].userId
						})
					}
				}
				console.log( this.add_group_record)
				http.post('/youngster/createGroup', {
					users: this.add_group_record.users,
					groupName: this.add_group_record.groupName
					
				
				}, {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)
				
				}).catch(err => {
					console.log(err)
				})
				
			},
			acceptFriendRequest(t){
				http.post('/youngster/acceptFriendRequest', {
					requestId:t.requestId
				
				}, {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)
				
				}).catch(err => {
					console.log(err)
				})
			},
			dateChange(e){
							this.add_dutch_friend_record.date = e.year + '-' + e.month + '-' + e.day;
						},
			submit_add_dutch_group(){
				
				console.log(this.add_dutch_group_record)
				http.post('/youngster/goingDutchToGroup', this.add_dutch_group_record, {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)
				
				}).catch(err => {
					console.log(err)
				})
			},
			submit_add_dutch(){
				
				
				for(var i=0;i<this.list_dutch.length;i++){
					if(this.list_dutch[i].pick===true){
						this.add_dutch_friend_record.friends.push({
							friendUserId:this.list_dutch[i].userId
						})
					}
				}
				console.log( this.add_dutch_friend_record)
				http.post('/youngster/goingDutchToFriends', {
					friends: this.add_dutch_friend_record.friends,
					outcomeName: this.add_dutch_friend_record.outcomeName,
					outcome: this.add_dutch_friend_record.outcome,
					typeId: this.add_dutch_friend_record.typeId,
					date: this.add_dutch_friend_record.date,
				
				}, {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)
				
				}).catch(err => {
					console.log(err)
				})
				
			},
			confirm(e){
							console.log('您选中了的数据为：',e);
							this.list_test[0].title=e[0].children[0].title
							this.add_dutch_friend_record.typeId=e[0].children[0].id
							this.add_dutch_group_record.typeId=e[0].children[0].id
							
						},
			addDutch(item) {
				console.log(item.pick)
				item.pick = !item.pick
			},
			changall(e) {
				console.log(e);
			},
			manage(e) {
				console.log(e)
				if (e.value.title === "添加好友") { this.show_addFriend = true }
				if (e.value.title === "好友均摊") {
					for (var i = 0; i < this.list_dutch.length; i++) {
						this.list_dutch[i].pick=false
					}
					this.add_dutch_friend_record.friends=[]
						this.show_dutch_friend = true
				}
				if (e.value.title === "请求列表") {
					this.show_Request=true
				}
				if (e.value.title === "新建群组") {
					for (var i = 0; i < this.list_dutch.length; i++) {
						this.list_dutch[i].pick=false
						
					}
					this.add_group_record.users=[]
					this.show_createGroup=true
				}
				
			},
			cardClick(e, n) {
				if (e === 0) {
					http.post('/youngster/sendFriendRequest', {
						phoneNumber: n,
						
					}, {header: {token:this.$store.state.token}}).then(res => {
						console.log(res)

					}).catch(err => {
						console.log(err)
					})
				}
			},
			searchFriend(e) {
				this.show_search = true
				http.get('/youngster/getFriendInfo', {
					params: { userId: e },
					header: {token:this.$store.state.token}
				}).then(res => {
					console.log(res)
					this.searchDetail = res.data.data

				}).catch(err => {

				})

			},
			friendAc(e, i) {
				console.log(e)
				if (e.index === 0) {
					console.log('删除好友')
					http.put('/youngster/unfriend', {
						params: { userId: i.userId },
						header: {token:this.$store.state.token}

					}, {}).then(res => {
						console.log(res)
						console.log("删除成功")
					}).catch(err => {
						console.log(err)
					})
				}
				if (e.index === 1) {
					http.get('/youngster/getFriendInfo', {
						params: { userId: i.userId },
						header: {token:this.$store.state.token}
					}).then(res => {
						console.log(res)
						this.userDetail = res.data.data
						this.show_userDetail = true
					}).catch(err => {

					})
				}
				console.log(i)
			},
			setType(e) {

				console.log(e)
				if (e === 0) {
					this.flag = false

				}
				if (e === 1) {
					this.flag = true
				}


			},
			open_dialog(item) {
				console.log(item)
				if (this.flag === false) {
					uni.navigateTo({
						url: '/subpages/Friend/Chatting/Chatting?userId=' + item.userId
					})
				}
				if (this.flag === true) {
					uni.navigateTo({
						url: '/subpages/Friend/GroupChatting/GroupChatting?groupId=' + item.groupId
					})
				}
			},
			addOpen() {
				this.open = !this.open
				this.listLeng = 2

			},
			ct(e) {
				console.log(e);
			},
			flotChange(e) {
				console.log(e)
				if (e === 0) {
					plus.camera.getCamera().captureImage(function(e) {
						plus.io.resolveLocalFileSystemURL(e, function(entry) {
							entry.file(function(file) {
								// console.log(e, entry.toLocalURL());
								this.img = entry.toLocalURL()  //图片的本地路径
								this.imgfile = file.name  //图片的文件名
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
						success: function (res) {
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
<style>
	.set_center {
		display: flex;
		justify-content: center;
	}

</style>


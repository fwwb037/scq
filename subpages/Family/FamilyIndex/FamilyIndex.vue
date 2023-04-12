<template>
	<tm-full-view text="true">
		<tm-menubars title="财务分析" color="teal"  :showback="true">
			
		</tm-menubars>
		
		<image src="/static/image/FamilyIndex.png" style="width: 100%; margin-top: -50rpx;"></image>
			<view style="position: relative;margin-top: -290rpx;height: 200rpx;margin-left: 30rpx;" >
				<tm-row>
					<tm-col :grid="5" justify="right">
						
					</tm-col>
					<tm-col :grid="7" justify="right">
						<tm-icons name="icon-home" color="white" size="50" style="margin-right: 10rpx;"></tm-icons>
						<text style="  font-size: 20px;font-weight: 600;color: white; margin-right: 80rpx; ">
							家庭财务总览
						</text>
					</tm-col>
				</tm-row>
			</view>
			
		<tm-sheet :shadow="24" style="margin-top: -100rpx; position: relative;height: 210rpx;"  bgColor="#2F7E79">
			<tm-row>
				<tm-col :grid="6" justify="left" style="margin-top: 10rpx;">
\
						<text style="font-size: 19px;color: #fff;font-weight: 600;font-family: YouYuan;" @click="pageChange(1)">家庭支出</text>
						<tm-icons name="myicon-zhichu1" size="35" style="margin-left: 15rpx;"></tm-icons><br/>
						<text style="font-size: 25px;color: #fff;font-family: YouYuan;" @click="pageChange(1)">￥{{family_sum}}</text>
					
				</tm-col>
				<tm-col :grid="6" justify="right"><text style="font-size: 50rpx;color: white;font-weight: 750;">···</text></tm-col>
			</tm-row>
			
			<tm-row style="margin-top: 35rpx;">
				
			
				<tm-col :grid="5"  justify="left">
					<tm-icons name="icon-chart-pie-alt" size="35" style="margin-left: 15rpx;" color="white"></tm-icons>
					<text style="font-size: 18px; color: #fff;margin-left: 15rpx;font-family: YouYuan;font-weight: 600;"  @click="pageChange(2)">财务分析</text><br/>
					
				</tm-col>
				<tm-col :grid="6"  justify="right">
					<tm-icons name="icon-user-group-fill" size="35" style="margin-right: 15rpx;" color="white"></tm-icons>
					<text style="font-size: 18px;color: #fff;font-family: YouYuan;font-weight: 600;"  @click="pageChange(3)">家庭管理</text><br/>
					
				</tm-col>
				
			</tm-row>

		</tm-sheet>
		<tm-row style="margin-top: 10rpx;">
			<tm-col :grid="2"></tm-col>
			<tm-col :grid="10" >
				<view style="background-color:lightgray;width: 430rpx;height: 50rpx;border-radius:5px;opacity: 1;margin-left: 34rpx;">
				<tm-calendar @rang-end="TimeEnd" :default-value.sync="ceshit" color="bg-gradient-red-lighten-b"
					mode="rang" :bing-start.sync="bts" :bing-end.sync="ets" style="margin-top: 10rpx;">
					
						<text style="color:teal;font-size: 30rpx;font-weight: 600;">{{start_time}}----{{end_time}}</text>
		
				</tm-calendar>
				</view>
			</tm-col>
		</tm-row>
		<tm-sheet v-if="familyPage===1">
			
			<tm-row style="margin-top: 10rpx;">
				<tm-col :grid="8">
			
					<tm-segTabs :list="ListType" v-model="active_list" @change="changeList"></tm-segTabs>
			
			
				</tm-col>
				<tm-col :grid="4" style="margin-top: 30rpx;">
					<text @click="addFamilyExpense=!addFamilyExpense"
						style="height: 40rpx; font-size: 17rpx;width: 250rpx;">添加家庭支出</text>
			
				</tm-col>
			</tm-row>
			
			
			
			<tm-switchList v-if="active_list===0" v-for="(item,index) in familyExpenseList" :key="index"
				@actionsClick="deleteFamilyList(item)" color="white" :rightLabel="item.date" :icon="item.typeIcon"
				:title="item.jointOutcomeName" :icon-size="60" :label="'￥'+item.jointOutcome"
				:actions="item_1"></tm-switchList>
			<tm-switchList  v-if="active_list===1" v-for="(item,index) in FamilyLoanList" :key="index"
				@actionsClick="deleteFamilyLoan(item)" @click="loanDetail(item)" color="white"
				:rightLabel="'已还贷'+item.pastMonth+'月'" icon="myicon-fukuan" :title="item.loanName" :icon-size="60"
				:label="''+item.loanDuration"></tm-switchList>
			

		</tm-sheet>

		<tm-sheet v-if="familyPage===3">

			<text style="font-size: 16px;font-weight: 600;">家庭成员列表</text>
			<text style="font-size: 10px;font-weight: 400;color: teal;margin-left: 260rpx;"
				@click="show_memberManage=!show_memberManage">成员管理>></text>
			<tm-dragGrid :disabled="disabledGrid" :list="FamilyMemberList" style="margin-top: 50rpx;"
				:item-height="150">
				<template v-slot:default="{item}">
					<view class="flex-center flex-col" style="width:70% margin-top:50rpx">
						<tm-badges v-if="item.pick" :offset="[0,-5]" icon="icon-plus"></tm-badges>
						<tm-avatar :src="item.headImg" @click="pickMember(item)"></tm-avatar>

						<text class="text-size-s pt-10">{{item.userName}}</text>
					</view>
				</template>
			</tm-dragGrid>


		</tm-sheet>

		<tm-sheet style="margin-left: 18px;margin-right: 18px;height: 320px;" v-if="familyPage===2">
			<tm-row>
				<tm-col :grid="12">
					<tm-segTabs :list="Radiolist" v-model="active" @change="changeRadio"></tm-segTabs>
				</tm-col>
			</tm-row>

			<l-echart ref="chart" @finished="init"></l-echart>

		</tm-sheet>
		<tm-poup v-model="show_memberManage" :position="pos" :height="900">

			<tm-dragGrid :disabled="!show_memberManage_1" :list="FamilyMemberList" style="margin-top: 50rpx;"
				:item-height="150">
				<template v-slot:default="{item}">
					<view class="flex-center flex-col" style="width:70% margin-top:50rpx">
						<tm-badges v-if="show_memberManage_1" :offset="[0,-5]" icon="icon-minus"
							@click="DeleteMemberList(item)"></tm-badges>
						<tm-avatar :src="item.headImg"></tm-avatar>

						<text class="text-size-s pt-10">{{item.userName}}</text>
					</view>
				</template>
			</tm-dragGrid>
			<tm-button @click="show_memberManage_1=!show_memberManage_1">删除成员</tm-button>
			<tm-button @click="showAddMember=!showAddMember">添加成员</tm-button>

		</tm-poup>
		<tm-poup v-model="showAddMember" :position="pos" :height="900">
			<tm-search @confirm="searchFamily" clear v-model="search_value" placeholder="用户编号" confirmText="添加家人"
				color="green" insertColor="green" align="center"></tm-search>

			<tm-card v-if="show_search" :img="searchDetail.headImg" :imgRound="24" subTitle="完整卡片"
				:title="searchDetail.userName" :subText="searchDetail.phoneNumber" :content="searchDetail.ageGroup"
				:action="['确认']" :btnColor="['primary', 'red']" statusText="当前未领取" statusColor="red"
				@action-click="cardClick($event,searchDetail)"></tm-card>

		</tm-poup>

		<tm-poup v-model="show_loanDetail" :position="pos" :height="1100">
			<tm-sheet style="margin-top: 100rpx;">
				<tm-row>
					<tm-col :grid="5"></tm-col>
					<tm-col :grid="2" style="margin-top: -100rpx; margin-left: -40rpx;">
						<tm-avatar :src="loan_detail.headImg" :size="200"></tm-avatar>
					</tm-col>
				</tm-row>
				<tm-row>
					<tm-col :grid="12">
						<text>创建者信息</text>
					</tm-col>
				</tm-row>
				<tm-row style="margin-top:20rpx">

					<tm-col :grid="3"><text style="font-size: 20px;font-weight: 800;"> 编号：</text></tm-col>
					<tm-col :grid="3" justify="left" style="margin-top: 10rpx;"><text
							style="font-size: 18px;font-weight: 500;">{{loan_detail.userId}}</text></tm-col>
					<tm-col :grid="3"><text style="font-size: 20px;font-weight: 800;">昵称：</text></tm-col>
					<tm-col :grid="3" justify="left" style="margin-top: 10rpx;"><text
							style="font-size: 18px;font-weight: 500;">{{loan_detail.userName}}</text></tm-col>

				</tm-row>
			</tm-sheet>


			<tm-sheet>
				<tm-row style="margin-top:20rpx">
					<tm-col :grid="3"><text style="font-size: 20px;font-weight: 800;">名称：</text></tm-col>
					<tm-col :grid="3" justify="left" style="margin-top: 10rpx;"><text
							style="font-size: 18px;font-weight: 500;">{{loan_detail.loanName}}</text></tm-col>
					<tm-col :grid="3"><text style="font-size: 20px;font-weight: 800;">金额：</text></tm-col>
					<tm-col :grid="3" justify="left" style="margin-top: 10rpx;"><text
							style="font-size: 18px;font-weight: 500;">{{loan_detail.loanSum}}</text></tm-col>
				</tm-row>
				<tm-row style="margin-top:20rpx">
					<tm-col :grid="3"><text style="font-size: 20px;font-weight: 800;">月付：</text></tm-col>
					<tm-col :grid="3" justify="left" style="margin-top: 10rpx;"><text
							style="font-size: 18px;font-weight: 500;">{{loan_detail.monthlyPayment}}</text></tm-col>
					<tm-col :grid="3"><text style="font-size: 20px;font-weight: 800;">已还：</text></tm-col>
					<tm-col :grid="3" justify="left" style="margin-top: 10rpx;"><text
							style="font-size: 18px;font-weight: 500;">{{loan_detail.pastMonth}}月</text></tm-col>
				</tm-row>
				<tm-row style="margin-top:20rpx">
					<tm-col :grid="3"><text style="font-size: 20px;font-weight: 800;">需还：</text></tm-col>
					<tm-col :grid="3" justify="left" style="margin-top: 10rpx;"><text
							style="font-size: 18px;font-weight: 500;">{{loan_detail.loanDuration}}月</text></tm-col>
					<tm-col :grid="3"><text style="font-size: 20px;font-weight: 800;">结清：</text></tm-col>
					<tm-col :grid="3" justify="left" style="margin-top: 10rpx;"><text
							style="font-size: 18px;font-weight: 500;">{{loan_detail.loanDeadline}}+月</text></tm-col>
				</tm-row>
			</tm-sheet>


		</tm-poup>
		<tm-poup v-model="addFamilyExpense" :position="pos" :height="900" >
			<tm-input required title="消费" v-model="familyExpense.outcomeName"></tm-input>
			<tm-input required title="金额" input-type="digit" v-model="familyExpense.outcome" suffix="元"></tm-input>
			
			<tm-pickersDate start="2002-10-1"   @confirm="chuchangchange" :default-value="familyExpense.date">
				<tm-input required title="消费时间" placeholder="请选择记录时间" disabled
					:value="familyExpense.date" right-icon="icon-angle-right"></tm-input>
			</tm-pickersDate>
			<tm-button @click="submitFamilyExpense">
				提交家庭支出
			</tm-button>
		</tm-poup>
	</tm-full-view>
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
				show_loanDetail: false,
				item_1: [
					{ text: "删除", width: 140, color: 'red' }
				],
				addFamilyExpense: false,
				showAddMember: false,
				pos: "bottom",
				show_memberManage_1: false,
				show_memberManage: false,
				disabledGrid: true,
				active: 0,
				Radiolist: ['家人占比', '类别占比'],
				active_list: 0,
				ListType: ['支出列表', '贷款列表'],
				start_time: "",
				end_time: "",
				ceshit: '2021-8-1',
				bts: '2021-8-10',
				ets: '2021-8-10',

				option_new: {

					tooltip: {
						trigger: 'item',
						// padding: 5,
						formatter: '{a} : {b} ({c}%)',
					},

					legend: {

						left: '67%',
						top: '20%'

					},
					toolbox: {
						show: false,
						feature: {
							mark: { show: true },
							dataView: { show: true, readOnly: false },
							restore: { show: true },
							saveAsImage: { show: true }
						}
					},
					series: [{
						name: 'Radius Mode',
						type: 'pie',
						radius: [50, 100],
						center: ['30%', '35%'],
						roseType: 'radius',
						itemStyle: {
							borderRadius: 5
						},
						label: {
							show: false
						},
						emphasis: {
							label: {
								show: false
							}
						},
						data: []
					}]
				},
				FamilyMemberList: [],
				JointExpenseList: [],
				AllFamilyBills: [],
				FamilyLoanList: [],
				Ratio: [],
				TypeRatio: [],
				TypeRatio_temp: [],
				SumRatio: [],
				menberId: "",
				searchDetail: [],
				search_value: "",
				show_search: false,
				familyName: "",
				familyExpenseList: [],
				loan_detail: [],
				familyPage: 1,

				familyExpense: {
					outcomeName: '',
					outcome: '',
					typeId: '',
					date: ''
				},
				family_sum:0,

				typeList: []
			}
		},
		onLoad() {


		},
		onShow() {

		},

		created() {
			this.familyExpense.date = this.$store.state.nowTime
			this.start_time = this.$store.state.lastMon_begin
			this.end_time = this.$store.state.lastMon_end
			http.get('/youngster/getTypeRatio', {
				params: {
					startTime: this.start_time,
					endTime: this.end_time
				},
				header: {token:this.$store.state.token}
			}).then(res => {
				console.log(res)
				this.TypeRatio = res.data.data
				for (var i = 0; i < this.TypeRatio.length; i++) {
					console.log(this.TypeRatio[i])
					this.option_new.series[0].data.push({
						value: this.TypeRatio[i].ratio,
						name: this.TypeRatio[i].typeName,
						id: this.TypeRatio[i].typeId
					})
				};

			}).catch(err => {

			})
			http.get('/youngster/getFamilyMemberList', {
				header: {token:this.$store.state.token}
			}).then(res => {
				this.familyName = res.data.data.familyName
				this.FamilyMemberList = res.data.data.members
				var FamilyMemberList_temp = []

				for (var i = 0; i < this.FamilyMemberList.length; i++) {
					FamilyMemberList_temp.push({
						userId: this.FamilyMemberList[i].userId,
						userName: this.FamilyMemberList[i].userName,
						userImg: this.FamilyMemberList[i].typeImg,
						pick: false
					})

				}
				this.FamilyMemberList = FamilyMemberList_temp
				console.log("typelist")
				console.log(this.FamilyMemberList)
			}).catch(err => {

			})
			http.get('/youngster/getJointExpenseList', {
				params: {
					startTime: this.start_time,
					endTime: this.end_time
					
				},
				header: {token:this.$store.state.token}
			}).then(res => {
				this.familyExpenseList = res.data.data
				this.get_sum(this.familyExpenseList)
			}).catch(err => {
				
			})
			http.get('/youngster/getFamilyLoanList', {
				params: {
					is_family_loan: 1
				},
				header: {token:this.$store.state.token}
			}).then(res => {
				this.FamilyLoanList = res.data.data

			}).catch(err => {

			})


		},

		mounted() {

			let timer = setTimeout(() => {
				clearTimeout(timer)
				console.log("timer")

				this.$refs.chart.init(echarts, chart => {
					console.log("setOption")
					chart.setOption(this.option_new);
					this.$refs.chart.resize({ width: 350, height: 320 })

				});

			}, 200)

		},
		methods: {
			submitFamilyExpense(){
				http.post('/youngster/createJointExpenses', {
					
				}, {token:this.$store.state.token}).then(res => {
					console.log(res)
					
					
				}).catch(err => {
					console.log(err)
				})
			},
			get_sum(el){
				for(var e=0;e<el.length;e++){
					this.family_sum=this.family_sum+el[e].jointOutcome
				}
			},
			chuchangchange(e){
				console.log(e)
				this.familyExpense.date=e.year+'-'+e.month+'-'+e.day
			},
			pageChange(p) {
				if (p === 1) { this.familyPage = 1 }
				if (p === 2) { this.familyPage = 2 }
				if (p === 3) { this.familyPage = 3 }
			},
			loanDetail(item) {
				this.show_loanDetail = true
				console.log(item)
				http.get('/youngster/getFamilyLoanDetail', {
					params: { loanId: item.loanId },
					header: {token:this.$store.state.token}

				}, {}).then(res => {
					console.log(res)
					this.loan_detail = res.data.data


				}).catch(err => {
					console.log(err)
				})
			},
			deleteFamilyList(item) {
				console.log(item)
				http.put('/youngster/deleteJointExpense', {
					params: { jointOutcomeId: item.jointOutcomeId },
					header: {token:this.$store.state.token}

				}, {}).then(res => {
					console.log(res)
					console.log("删除成功")
				}).catch(err => {
					console.log(err)
				})
			},
			deleteFamilyLoan(item) {
				console.log(item)
				http.put('/youngster/deleteJointExpense', {
					params: { loanId: item.loanId },
					header: {token:this.$store.state.token}

				}, {}).then(res => {
					console.log(res)
					console.log("删除成功")
				}).catch(err => {
					console.log(err)
				})
			},
			cardClick(e, item) {
				console.log(item)
				this.FamilyMemberList.push({
					userId: item.userId,
					userName: item.userName,
					headImg: item.headImg
				})
				var familyList_submit = []
				for (var i = 0; i < this.FamilyMemberList.length; i++) {
					familyList_submit.push(this.FamilyMemberList[i].userId)
				}
				http.put('/youngster/updateGroupInfo', {
					familyMembers: familyList_submit,
					familyName: this.familyName


				}, {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)

				}).catch(err => {
					console.log(err)
				})
			},
			searchFamily(e) {
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
			DeleteMemberList(item) {
				var f_temp = []
				for (var i = 0; i < this.FamilyMemberList.length; i++) {
					if (this.FamilyMemberList[i].userId !== item.userId) {
						f_temp.push(this.FamilyMemberList[i])
					}
				}

				this.FamilyMemberList = f_temp
				var familyList_submit = []
				for (var i = 0; i < this.FamilyMemberList.length; i++) {
					familyList_submit.push(this.FamilyMemberList[i].userId)
				}
				http.put('/youngster/updateGroupInfo', {
					familyMembers: familyList_submit,
					familyName: this.familyName


				}, {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)

				}).catch(err => {
					console.log(err)
				})

			},

			pickMember(item) {
				console.log(item.pick)
				item.pick = !item.pick
				var picknum = 0
				for (var i = 0; i < this.FamilyMemberList.length; i++) {
					if (this.FamilyMemberList[i].pick === true) {
						picknum = picknum + 1
					}
				}
				if (picknum > 1) {
					for (var i = 0; i < this.FamilyMemberList.length; i++) {
						if (this.FamilyMemberList[i].pick === true && this.FamilyMemberList[i].userId !== item.userId) {
							this.FamilyMemberList[i].pick = false
						}
					}
				}




				for (var i = 0; i < this.FamilyMemberList.length; i++) {

					if (this.FamilyMemberList[i].pick === true) {
						this.menberId = this.FamilyMemberList[i].userId
					}

				}
				console.log(this.typeId)
			},
			changeList(e) {
				console.log(e)
				if (e === 0) { this.active_list = 0 }
				if (e === 1) { this.active_list = 1 }

			},
			changeRadio(e) {
				console.log(e)
				if (e === 0) { this.getSumRatio() }
				if (e === 1) { this.getTypeRatio() }
			},
			TimeEnd(e) {
				console.log(e)
				this.start_time = e.start.year + '-' + e.start.month + '-' + e.start.day
				this.end_time = e.end.year + '-' + e.end.month + '-' + e.end.day
				http.get('/youngster/getRatio', {
					params: {
						startTime: this.start_time,
						endTime: this.end_time

					},
					header: {token:this.$store.state.token}
				}).then(res => {
					console.log(res)
					this.SumRatio = res.data.data.memberRatios
					this.option_new.series[0].data = []
					for (var i = 0; i < this.SumRatio.length; i++) {
						console.log(this.SumRatio[i])
						this.option_new.series[0].data.push({
							value: this.SumRatio[i].ratio,
							name: this.SumRatio[i].userName,
							id: this.SumRatio[i].userId
						})
					};
					this.$refs.chart.init(echarts, chart => {
						console.log("setOption")
						chart.setOption(this.option_new);
						this.$refs.chart.resize({ width: 350, height: 320 })

					});

				}).catch(err => {

				})
				http.get('/youngster/getJointExpenseList', {
					params: {
						startTime: this.start_time,
						endTime: this.end_time
						
					},
					header: {token:this.$store.state.token}
				}).then(res => {
					this.familyExpenseList = res.data.data
					this.get_sum(this.familyExpenseList)
				}).catch(err => {
				
				})
				
				
			},

			getSumRatio() {
				http.get('/youngster/getRatio', {
					params: {
						startTime: this.start_time,
						endTime: this.end_time
					},
					header: {token:this.$store.state.token}
				}).then(res => {
					console.log(res)
					this.SumRatio = res.data.data.memberRatios
					this.option_new.series[0].data = []
					for (var i = 0; i < this.SumRatio.length; i++) {
						console.log(this.SumRatio[i])
						this.option_new.series[0].data.push({
							value: this.SumRatio[i].ratio,
							name: this.SumRatio[i].userName,
							id: this.SumRatio[i].userId
						})
					};
					this.$refs.chart.init(echarts, chart => {
						console.log("setOption")
						chart.setOption(this.option_new);
						this.$refs.chart.resize({ width: 350, height: 320 })

					});

				}).catch(err => {

				})
			},
			getTypeRatio() {
				http.get('/youngster/getTypeRatio', {
					params: {
						startTime: this.start_time,
						endTime: this.end_time
					},
					header: {token:this.$store.state.token}
				}).then(res => {
					console.log(res)
					this.TypeRatio = res.data.data
					this.option_new.series[0].data = []
					for (var i = 0; i < this.TypeRatio.length; i++) {
						console.log(this.TypeRatio[i])
						this.option_new.series[0].data.push({
							value: this.TypeRatio[i].ratio,
							name: this.TypeRatio[i].typeName,
							id: this.TypeRatio[i].typeId
						})
					};
					this.$refs.chart.init(echarts, chart => {
						console.log("setOption")
						chart.setOption(this.option_new);
						this.$refs.chart.resize({ width: 350, height: 320 })

					});

				}).catch(err => {

				})
			},
			async init() {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.chart.init(echarts);
				chart.setOption(this.option_new)
			},
		}
	}

</script>

<style>

</style>


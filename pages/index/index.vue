<template>
	
		<tm-full-view >
		<image src="/static/image/ShangShou_Index.png" style="width: 100%; margin-top: -50rpx;"></image>	
			<view style="position: relative;margin-top: -250rpx;z-index: 13;height: 200rpx;margin-left: 30rpx;" >
				<tm-row>
					<tm-col :grid="5" justify="right">
						
					</tm-col>
					<tm-col :grid="7" justify="right">
						<tm-icons name="myicon-zhangdan" color="white" size="50" style="margin-right: 20rpx;"></tm-icons>
						<text style="  font-size: 20px;font-weight: 600;color: white; margin-right: 100rpx; ">
							财务总览
						</text>
					</tm-col>
				</tm-row>
			</view>
			<tm-sheet :shadow="24" style="margin-top: -100rpx; position: relative;z-index: 10;height: 270rpx;"  bgColor="#2F7E79">
				<tm-row>
					<tm-col :grid="6" justify="left" style="margin-top: 10rpx;">
						
							
							
							<text style="font-size: 19px;color: #fff;font-weight: 600;font-family: YouYuan;" @click="changePage(1)">支       出</text>
							<tm-icons name="myicon-zhichu1" size="35" style="margin-left: 15rpx;"></tm-icons><br/>
							<text style="font-size: 25px;color: #fff;font-family: YouYuan;" @click="changePage(1)">￥{{sum.expense}}</text>
							
					</tm-col>
					<tm-col :grid="6" justify="right"><text style="font-size: 50rpx;color: white;font-weight: 750;">···</text></tm-col>
				</tm-row>
				
				<tm-row style="margin-top: 35rpx;">
		
				
					<tm-col :grid="5"  justify="left">
						<tm-icons name="myicon-shourucanshu" size="40"></tm-icons>
						<text style="font-size: 15px; color: #fff;margin-left: 15rpx;font-family: YouYuan;"  @click="changePage(2)">收  入</text><br/>
						<text style="font-size: 18px;color: #fff;margin-left: 15rpx;font-family: YouYuan;"  @click="changePage(2)">￥{{sum.income}}</text>
					</tm-col>
					<tm-col :grid="6"  justify="right">
						<tm-icons name="myicon-gerendaikuan" size="40" style="margin-right: 15rpx;"></tm-icons>
						<text style="font-size: 15px;color: #fff;font-family: YouYuan;"  @click="changePage(3)">支出规划</text><br/>
						<text style="font-size: 18px;color: #fff;font-family: YouYuan;"  @click="changePage(3)">￥{{sum.plan}}</text>
					</tm-col>
		
				</tm-row>
				
		
		
			</tm-sheet>
			
			
		
			
			
			<view  style="height: 400rpx;  position: relative;z-index: 10;" >
				<tm-row>
					<tm-col :grid="6" justify="left">
						<text style="font-size: 16px;font-weight: 600;margin-left: 25rpx;">收支情况</text>
					</tm-col>
					<tm-col :grid="3" justify="right">
						<text style="font-size: 10px;font-weight: 500">收</text>
						<text style="font-size: 10px;font-weight: 500;margin-left: 8rpx;color: green;"> 30.50</text>
					</tm-col>
					<tm-col  :grid="3">
						<text style="font-size: 10px;font-weight: 500">支</text>
						<text style="font-size: 10px;font-weight: 500;margin-left: 8rpx;color: crimson;">21.60</text>
					</tm-col>
				</tm-row>
				
				<view style=" margin-left: 22px;margin-right: 26px;margin-top: 10px;" v-if="show_page===1">
					<view>
						
						<tm-switchList 
						v-for="(item,index) in outcomeList" :key="index"  
						@actionsClick="deleteExpense(item)"
						:actions="item_1" 
						:height="90"
						>
						<tm-row style="width: 580rpx; margin-left: -30rpx;">
							<tm-col :grid="2" style="margin-top: 10rpx;">
								<tm-icons :name="item.typeIcon" size="45"></tm-icons>
							</tm-col>
							<tm-col :grid="6" justify="left"  style="margin-top: 10rpx;">
								<text style="font-size: 14px;">{{item.outcomeName}}</text>
							</tm-col>
							<tm-col :grid="3" justify="left"  style="margin-top: 10rpx;">
								<text  style= "font-size: 12px;">{{item.date}}</text>
							</tm-col>
							<tm-col :grid="1" justify="right"  style="margin-top: 10rpx;">
								<text  style= "font-size: 14px;color: crimson;">￥{{item.outcome}}</text>
							</tm-col>
							
						</tm-row>
						</tm-switchList>

						
					</view>
				</view>
				
				
				<view style=" margin-left: 22px;margin-right: 26px;margin-top: 10px;" v-if="show_page===2">
					<view>
						
						<tm-switchList 
						v-for="(item,index) in incomeList" :key="index"  
						@actionsClick="deleteExpense(item)"
						:actions="item_1" 
						:height="90"
						>
						<tm-row style="width: 580rpx; margin-left: -30rpx;">
							<tm-col :grid="2" style="margin-top: 10rpx;">
								<tm-icons :name="item.typeIcon" size="45"></tm-icons>
							</tm-col>
							<tm-col :grid="6" justify="left"  style="margin-top: 10rpx;">
								<text style="font-size: 14px;">{{item.incomeName}}</text>
							</tm-col>
							<tm-col :grid="3" justify="left"  style="margin-top: 10rpx;">
								<text  style= "font-size: 12px;">{{item.date}}</text>
							</tm-col>
							<tm-col :grid="1" justify="right"  style="margin-top: 10rpx;">
								<text  style= "font-size: 14px;color: green;">￥{{item.income}}</text>
							</tm-col>
							
						</tm-row>
						</tm-switchList>
				
						
					</view>
				</view>
				
				
			</view>
		<view style="height: 120rpx;">
			
		</view>
		
			
			
		
		
		
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
			
	</tm-full-view>

</template>

	
	
<script>
	
	import indexBackgroundImage from "@/static/image/TopImage.png"

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
				indexBackgroundImage:indexBackgroundImage,
				
				option_new: {
					
					tooltip: {
						trigger: 'item',
						// padding: 5,
						formatter: '{b} : {c} ({d}%)',
					},
					
					legend: {
						
						left:'63%',
						top:'20%'

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
						center: ['30%', '40%'],
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

				options5: [{
					icon: 'icon-delete',
					style: {
						backgroundColor: '#f56c6c',
						width: '40px',
						height: '40px',
						borderRadius: '100px',
						margin: '0 6px'
					}
				}, ],
				incomePlanList: [],
				list_1: [
					{ iconSize: 46, icon: 'icon-border-bottom', value: '首页', path: '/pages/youngster/Pindex/Pindex' },
					{ iconSize: 46, icon: 'icon-user-group', value: '好友',path:'/pages/youngster/Analysis/Analysis' },
					{ iconSize: 46, icon: 'icon-plus', value: '记账' ,custom: true,customColor: 'teal',customFontColor:'a1d4d0', path: '/pages/youngster/Add/Add' },
					{ iconSize: 46, icon: 'icon-chart-line', value: '分析', path: '/pages/youngster/Manage/Manage' },
					{ iconSize: 46, icon: 'icon-process', value: '我', path: '/pages/youngster/Me/Me' }
				],
				active: 1,
				list_day: ['上月', '本月', "年度"],
				nowTime: "",
				nowTime_year: "",
				nowTime_month: "",
				nowTime_day: "",
				beforeThreeMon: "",
				lastMon_begin: "",
				lastMon_end: "",
				lastWeek: "",
				nowTime_year_month: "",
				thisMon_begin:"",
				thisMon_end:"",
				flag: true,

				
				totalCost: 0,
				costDetail: [],
				typeId: -0,
				costDetail_temp: [],
				incomeList:[],
				outcomeList:[],
				show_page:1,
				monthly:{
					income:[],
					outcome:[],
					loan:[],
					surplus:[]
				},
				item_1: [
					{ text: "删除", width: 125, color: 'red' }
				],
				sum:{
					income:0,
					expense:0,
					plan:0
				}
			}
		},
		created() {
			http.get('/youngster/getAllOutcomes', {
					params: { 
						startTime: this.thisMon_begin ,
						endTime:this.nowTime,
						},
						 header: {token:this.$store.state.token}
				}).then(res => {
					console.log(res)
					this.outcomeList = res.data.data.bills
					for(var i =0 ;i<this.outcomeList.length;i++){
						this.sum.expense+=this.outcomeList[i].outcome
						
					}
				}).catch(err => {
			
				}),
			http.get('/youngster/getIncomePlanList', {
					params: { date: this.nowTime_year_month },
					 header: {token:this.$store.state.token}
				}).then(res => {
					console.log(res)
					this.incomePlanList = res.data.data
					for(var i =0 ;i<this.incomePlanList.length;i++){
						this.sum.plan+=this.incomePlanList[i].cost
						
					}
				}).catch(err => {

				}),
			http.get('/youngster/getIncomeList', {
					params: {
						startTime: this.thisMon_begin ,
						endTime:this.nowTime
						},
						 header: {token:this.$store.state.token}
				}).then(res => {
					console.log(res)
					this.incomeList = res.data.data
					for(var i =0 ;i<this.incomeList.length;i++){
						this.sum.income+=this.incomeList[i].income
						
					}
				}).catch(err => {
			
				}),
			
			
			http.get('/youngster/calculateMonthlyExpenses', {
				params: { data: this.nowTime_year_month },
				 header: {token:this.$store.state.token}
			}).then(res => {
				console.log(res)
				console.log("this.costDetail")
				this.costDetail = res.data.data.costDetail
				for (var i = 0; i < this.costDetail.length; i++) {
					console.log(this.costDetail[i])
					this.option_new.series[0].data.push({
						value: this.costDetail[i].cost,
						name: this.costDetail[i].typeName,
						id:this.costDetail[i].typeId
					})
				};

				console.log("this.option_new")
				console.log(this.option_new)
				this.totalCost = res.data.data.totalCost

			}).catch(err => {

			})
		},
		mounted() {
			this.getNowDate(),
			this.beforeThree(),
			this.lastMon_begin=this.getFirstDayOfMonth(this.nowTime_year, this.nowTime_month-1),
			this.lastMon_end= this.getLastDayOfMonth(this.nowTime_year, this.nowTime_month-1),
			this.thisMon_end=this.getLastDayOfMonth(this.nowTime_year, this.nowTime_month),
			this.getAweekago()
			this.$store.dispatch('set_thisMonth_end',this.thisMon_end)
			this.$store.dispatch('set_lastWeek',this.lastWeek)
			this.$store.dispatch('set_nowTime', this.nowTime)
			this.$store.dispatch('set_thisMonth_begin', this.thisMon_begin)
			this.$store.dispatch('set_lastMon_begin', this.lastMon_begin)
			this.$store.dispatch('set_lastMon_end', this.lastMon_end)

			let timer = setTimeout(() => {
				clearTimeout(timer)

				this.$refs.chart.init(echarts, chart => {
					console.log("setOption")
					chart.setOption(this.option_new);
					chart.on('click',function (params) {
					  console.log('params',params)
					  
					  this.typeId=params.data.id
					  console.log(this.typeId)
					 
					})
					this.$refs.chart.resize({ width: 350, height: 320 })

				});

			}, 200)

		},
		watch: {
			// outcomeList: {
			// 	deep: true,
			// 	handler: function() {
			// 		console.log("修改了")
			// 	}
			// },
			typeId:{
				handler: function(){
					console.log("type改变")
				}
			}
		},
		methods: {
			
			deleteExpense(item){
				console.log(item)
				http.put('/youngster/deleteOutcomeRecord', {outcomeId:item}, { header: {token:this.$store.state.token}}).then(res => {
				
				}).catch(err => {
					console.log(err)
				}),
				http.get('/youngster/getAllOutcomes', {
						params: { 
							startTime: this.thisMon_begin ,
							endTime:this.nowTime,
							},
							 header: {token:this.$store.state.token}
					}).then(res => {
						console.log(res)
						this.outcomeList = res.data.data.bills
				
					}).catch(err => {
				
					})
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
			changePage(n){
				this.show_page=n
			},
			ResetOutcomeList(){
				http.get('/youngster/getAllOutcomes', {
						params: { 
							startTime: this.thisMon_begin ,
							endTime:this.nowTime,
							typeId:this.typeId
							},
							 header: {token:this.$store.state.token}
					}).then(res => {
						console.log(res)
											this.outcomeList=res.data.data.bills
				// 		for(var i=0;i<this.outcomeLis.length;i++)
				// 		{
				// 			this.outcomeList.pop()
				// 		}
											// for(var i=0;i<res.data.data.bills.length;i++)
											// {
											// 	this.outcomeList.push(res.data.data.bills[i])
											// }
											console.log(this.outcomeList)
											
					}).catch(err => {
				
					})
			},
			async init() {
				// chart 图表实例不能存在data里
				const chart = await this.$refs.chart.init(echarts);
				chart.setOption(this.option_new)
			},
			setTime(e) {
				console.log(this.nowTime)
				console.log(e)
				if (e === 0) {
					this.flag = false
					
				}
				if (e === 1) {
					this.flag = true
				}
				if (e === 2) {
					this.flag = true
					this.getOutcomeList()
				}

			},
			getIncomeList() {
				
			},
			getOutcomeList() {
				http.get('/youngster/calculateMonthlyExpenses', {
					params: { data: this.nowTime_year_month },
					 header: {token:this.$store.state.token}
				}).then(res => {
					console.log(res)
					console.log("this.costDetail")
					this.costDetail = res.data.data.costDetail
					for (var i = 0; i < this.costDetail.length; i++) {
						console.log(this.costDetail[i])
						this.option_new.series[0].data.push({
							value: this.costDetail[i].cost,
							name: this.costDetail[i].typeName,
							id:this.costDetail[i].typeId
						})
					};
				
					console.log("this.option_new")
					console.log(this.option_new)
					this.totalCost = res.data.data.totalCost
				
				}).catch(err => {
				
				})
			},

			getNowDate() {
				var date = new Date();
				var sign2 = ":";
				var year = date.getFullYear() // 年
				var month = date.getMonth() + 1; // 月
				var day = date.getDate(); // 日
				var hour = date.getHours(); // 时
				var minutes = date.getMinutes(); // 分
				var seconds = date.getSeconds() //秒
				var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
				var week = weekArr[date.getDay()];
				// 给一位数的数据前面加 “0”
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (day >= 0 && day <= 9) {
					day = "0" + day;
				}
				if (hour >= 0 && hour <= 9) {
					hour = "0" + hour;
				}
				if (minutes >= 0 && minutes <= 9) {
					minutes = "0" + minutes;
				}
				if (seconds >= 0 && seconds <= 9) {
					seconds = "0" + seconds;
				}
				this.nowTime = year + "-" + month + "-" + day;
				this.nowTime_year = parseInt(year, 10)
				this.nowTime_month = parseInt(month, 10)
				this.nowTime_day = parseInt(day, 10)
				this.nowTime_year_month = year + "-" + month
				this.thisMon_begin= year + "-" + month+"-01"

			},

			beforeThree() {
				const dates = new Date()
				dates.setMonth(dates.getMonth() - 3)
				var pastMonth = dates.getMonth() + 1
				var pastDay = dates.getDate()
				if (pastMonth >= 1 && pastMonth <= 9) {
					pastMonth = '0' + pastMonth
				}
				if (pastDay >= 0 && pastDay <= 9) {
					pastDay = '0' + pastDay
				}
				const endDate = dates.getFullYear() + '-' + pastMonth + '-' + pastDay
				this.beforeThreeMon = endDate
			},

			getFirstDayOfMonth(year, month) {
			  // return new Date(year, month-1, 1);
			  let data = new Date(year, month - 1, 1);
			  return (
			    data.getFullYear() +
			    "-" +
			    (data.getMonth() + 1 > 9
			      ? data.getMonth() + 1
			      : "0" + (data.getMonth() + 1)) +
			    "-" +
			    (data.getDate() > 9 ? data.getDate() : "0" + data.getDate())
			  );
			},

			getLastDayOfMonth(year, month) {
			  let data = new Date(year, month, 0);
			  return (
			    data.getFullYear() +
			    "-" +
			    (data.getMonth() + 1 > 9
			      ? data.getMonth() + 1
			      : "0" + (data.getMonth() + 1)) +
			    "-" +
			    (data.getDate() > 9 ? data.getDate() : "0" + data.getDate())
			  );
			},
			
		
			
			getAweekago(){
			    var time = (new Date).getTime() - 7 * 24 * 60 * 60 * 1000;
			    var tragetTime = new Date(time);
			    var month = tragetTime.getMonth();
			    var day = tragetTime.getDate();
			    tragetTime = tragetTime.getFullYear() + "-" + (tragetTime.getMonth() > 9 ? (tragetTime.getMonth() + 1) : "0" + (tragetTime.getMonth() + 1)) + "-" + (tragetTime.getDate() > 9 ? (tragetTime.getDate()) : "0" + (tragetTime.getDate()));
			    this.lastWeek=tragetTime
			}
		


		}	
	
}	
</script>
<style>
	.set_center {
		display: flex;
		justify-content: center;
	}
	.bg-img{
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    z-index: -1;
	}
</style>


<template>
	<tm-fullView>
		<tm-menubars title="财务分析" color="teal"  :showback="true">
			
		</tm-menubars>

		<tm-row style="margin-top: 20rpx;">
			<tm-col :grid="12">
				<tm-segTabs :list="list_date" v-model="active" @change="changeDate"></tm-segTabs>
			</tm-col>
		</tm-row>

		
		<tm-sheet v-if="if_resetDate">
			
				<tm-row style="margin-top: 20rpx;">
					<tm-col :grid="12" style="margin-top: -23rpx;">
						<tm-calendar @rang-end="TimeEnd" :default-value.sync="ceshit" color="bg-gradient-red-lighten-b"
							mode="rang" :bing-start.sync="bts" :bing-end.sync="ets">
							<text style="color:teal;font-size: 33rpx;font-weight: 600;" >{{resetDate.startTime}}----{{resetDate.endTime}}</text>
						</tm-calendar>
					</tm-col>
				</tm-row>
			
			<tm-echarts ref="iechart" @init="initIe"></tm-echarts>
		</tm-sheet>
		<tm-sheet v-if="if_resetDate">
			<text>分类</text>
			<tm-segTabs :list="list_type" v-model="active_type" @change="change_in_out"></tm-segTabs>
			<tm-echarts ref="tChart"></tm-echarts>
		</tm-sheet>
		<tm-sheet v-show="!if_resetDate">
			<tm-segTabs :list="list_type" v-model="active_type" @change="change_in_out"></tm-segTabs>
			<tm-echarts ref="teCart" @init="gc"></tm-echarts>
		</tm-sheet>
		<view style="height: 120rpx;"></view>





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

				ceshit: '2023-04-03',
				bts: '2023-03-30',
				ets: '2023-04-10',
				expenseList: [],
				incomeList: [],
				loanList: [],
				incomePlanList: [],
				day_List: [],
				expenseList_daily: [],
				incomeList_daily: [],
				remain_List: [],

				monthly_data: {
					expenseList: [],
					incomeList: [],
					loanList: [],
					incomePlanList: []
				},
				monthly: {
					monthList: [],
					month_begin: [],
					month_end: []
				},

				option_ty: {
				  tooltip: {
				    trigger: 'item'
				  },
				  legend: {
				    top: '80%',
				    left: 'center'
				  },
				  series: [
				    {
				      name: 'Access From',
				      type: 'pie',
				      radius: ['40%', '70%'],
				      avoidLabelOverlap: false,
				      itemStyle: {
				        borderRadius: 10,
				        borderColor: '#fff',
				        borderWidth: 2
				      },
				      label: {
				        show: false,
				        position: 'center'
				      },
				      emphasis: {
				        label: {
				          show: true,
				          fontSize: 40,
				          fontWeight: 'bold'
				        }
				      },
				      labelLine: {
				        show: false
				      },
				      data: [
				       
				      ]
				    }
				  ]
				},
				option_Line: {
					xAxis: {
						type: 'category',
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [],
						type: 'line'
					}]
				},
				option_Line_new: {
					xAxis: {
						type: 'category',
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [],
						type: 'line'
					}]
				},
				option_ie : {
				 
				  legend: {
				    data: ['收入', '支出']
				  },
				  toolbox: {
				    // y: 'bottom',
				    feature: {
				      magicType: {
				        type: ['stack']
				      },
				      dataView: {},
				      saveAsImage: {
				        pixelRatio: 2
				      }
				    }
				  },
				  tooltip: {},
				  xAxis: {
				    data: [],
				    splitLine: {
				      show: false
				    }
				  },
				  yAxis: {},
				  series: [
				    {
				      name: '支出',
				      type: 'bar',
				      data: [],
				      emphasis: {
				        focus: 'series'
				      },
				      animationDelay: function (idx) {
				        return idx * 10;
				      }
				    },
				    {
				      name: '收入',
				      type: 'bar',
				      data: [],
				      emphasis: {
				        focus: 'series'
				      },
				      animationDelay: function (idx) {
				        return idx * 10 + 100;
				      }
				    }
				  ],
				  animationEasing: 'elasticOut',
				  animationDelayUpdate: function (idx) {
				    return idx * 5;
				  }
				},
				list_date: ['日常', '上月', '本月', '自定义'],
				list_type: ['支出', '收入'],
				active_type: 0,
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
				loanList_temp:[],
				loanDetail_temp:[],
				
				expense_ratio:[],
				income_ratio:[],
				
			}
		},

		created() {

			this.day_List = this.formatEveryDay(this.$store.state.thisMonth_begin, this.$store.state.nowTime)
			this.getMonData(this.$store.state.thisMonth_begin, this.$store.state.nowTime, this.$store.state.thisMonth_end,
				this.pickType)
			this.getMonthBetween("2023-04-01", "2023-04-08")
			this.getMonData(this.resetDate.startTime, this.resetDate.endTime, this.resetDate.endTime, this.pickType)
			this.get_typesum(this.expenseList,this.incomeList)
			
		},

		mounted() {
			
		},
		methods: {
			uniqArr(arr) {
			  var newArr = []
			  for (var i = 0; i < arr.length; i++) {
			    for (var j = i + 1; j < arr.length; j++) {
			      if (arr[i] == arr[j]) {
			        arr[j] = ' '
			      }
			    }
			    if (arr[i] != ' ') {
			      newArr.push(arr[i])
			    }
			  }
			  return newArr
			},
			get_typesum(el,il){
				
				var type_expense=[]
				var sum_expense=[]
				var type_income=[]
				var sum_income=[]
				for (var e=0;e<el.length;e++){
					type_expense.push(el[e].typeName)
				}
				for (var i=0;i<il.length;i++){
					type_income.push(il[i].typeName)
				}
				
				console.log("ioList_before",el,il)
				type_expense=this.uniqArr(type_expense)
				type_income=this.uniqArr(type_income)
				
				
				
				console.log("List",el,il)
				
				console.log("expensetypeList",type_expense)
				console.log("incometypeList",type_income)
				for (var e=0;e<el.length;e++){
					sum_expense.push(0)
				}
				for (var i=0;i<il.length;i++){
					sum_income.push(0)
				}
				for (var e=0;e<el.length;e++){
					
					for(var te=0;te<type_expense.length;te++){
						if(el[e].typeName===type_expense[te]){
							sum_expense[te]+=el[e].outcome
						}
						else{
							continue
						}
					}
				}
				for (var i=0;i<il.length;i++){
					for(var ti=0;ti<type_income.length;ti++){
						if(il[i].typeName===type_income[ti]){
						
							sum_income[ti]+=il[i].income
						}
						else{
							continue
							
						}
					}
				}
				console.log("sum_expense",sum_expense)
				console.log("sum_income",sum_income)
				
				console.log("type",type_expense,sum_expense,type_income,sum_income)
				for (var a=0;a<type_expense.length;a++){
					this.expense_ratio.push(
					{
						name:type_expense[a],
						value:sum_expense[a]
					}
					)
				}
				for(var b=0;b<type_income.length;b++){
					this.income_ratio.push(
					{
						name:type_income[b],
						value:sum_income[b]
					}
					)
				}
				
				console.log("type_sum_expense",this.expense_ratio)
				console.log("type_sum_income",this.income_ratio)
				this.option_ty.series[0].data=this.income_ratio
			},
			change_in_out(e) {
				
				console.log("beforeSetOption",this.income_ratio,this.expense_ratio)
				if (e === 0) { 
					this.option_Line_new.series[0].data = this.expenseList_daily
					this.option_ty.series[0].data=this.expense_ratio
					 }
				if (e === 1) { 
					this.option_Line_new.series[0].data = this.incomeList_daily
					this.option_ty.series[0].data=this.income_ratio
					
					 }
				console.log("beforeSet",this.option_ty)
				this.$refs.tChart.setOption(this.option_ty)
			},
			TimeEnd(e) {
				console.log(e)
				this.resetDate.startTime = e.start.year + '-' + e.start.month + '-' + e.start.day
				this.resetDate.endTime = e.end.year + '-' + e.end.month + '-' + e.end.day
				this.getMonthBetween(this.resetDate.startTime, this.resetDate.endTime)
				this.getMonData(this.resetDate.startTime, this.resetDate.endTime, this.resetDate.endTime, this.pickType)
				this.get_monthlyData(this.monthly,this.incomeList,this.expenseList)
				console.log("newIO",this.expenseList,this.incomeList)
				this.get_typesum(this.expenseList,this.incomeList)
				this.$refs.tChart.setOption(this.option_ty)
			},
			changeDate(e) {
				if (e === 0) {
					console.log("本周")
					this.if_resetDate = false
					this.day_List = this.formatEveryDay(this.$store.state.lastWeek, this.$store.state.nowTime)
					this.getMonData(this.$store.state.lastWeek, this.$store.state.nowTime, this.$store.state.thisMonth_end,
						this.pickType)
				}
				if (e === 1) {
					console.log("上月")
					this.if_resetDate = false
					this.day_List = this.formatEveryDay(this.$store.state.lastMon_begin, this.$store.state.lastMon_end)
					this.getMonData(this.$store.state.lastMon_begin, this.$store.state.lastMon_end, this.$store.state
						.lastMon_end, this.pickType)
				}
				if (e === 2) {
					console.log("本月")
					this.if_resetDate = false
					this.day_List = this.formatEveryDay(this.$store.state.thisMonth_begin, this.$store.state.nowTime)
					this.getMonData(this.$store.state.thisMonth_begin, this.$store.state.nowTime, this.$store.state
						.thisMonth_end, this.pickType)

				}
				if (e === 3) {
					console.log("自定义")
					this.if_resetDate = true

				}
			},
			get_monthlyData(ml, il, el) {
				
				for (var t = 0; t < ml.month_begin.length; t++) {
					
					var sum_expense = 0
					var sum_income = 0
					var sum_incomeplan = 0
					
					
					
					
					for (var e = 0; e < el.length; e++) {
						if (el[e].date >= ml.month_begin[t] && el[e].date <= ml.month_end[t]) {
							sum_expense = sum_expense + el[e].outcome
						}

					}
					for (var i = 0; i < il.length; i++) {
						if (il[i].date >= ml.month_begin[t] && il[i].date <= ml.month_end[t]) {
							sum_income = sum_income + il[i].income
						}

					}
					http.get('/youngster/getIncomePlanList', {
							params: {
								dateStart: ml.month_begin[t],
								endTime: ml.month_end[t],
								header: {token:this.$store.state.token}
							}
						}).then(res => {
							 sum_incomeplan = 0
							var ipl = res.data.data
							console.log("incomePlanList",ipl)
							for (var ip = 0; ip < ipl.length; ip++) {
								sum_incomeplan = sum_incomeplan + ipl[ip].cost
								console.log(sum_incomeplan)
							}
							this.monthly_data.incomePlanList.push(sum_incomeplan)
							console.log(sum_incomeplan,"sum_incomeplan")
						}).catch(err => {

						}),
					
				this.monthly_data.expenseList.push(sum_expense)
				this.monthly_data.incomeList.push(sum_income)
				
				
				console.log(sum_expense,"sum_expense")
				console.log(sum_income,"sum_income")
				
				
				console.log(ml.month_begin[t],ml.month_end[t])
				}
				console.log("monthly_data",this.monthly_data)
				this.option_ie.xAxis.data=this.monthly.monthList
				this.option_ie.series[0].data=this.monthly_data.incomeList
				this.option_ie.series[1].data=this.monthly_data.expenseList
				this.$refs.iechart.setOption(this.option_ie)
			},
			get_dailyData(dl, el, il) {
				this.expenseList_daily = []
				this.incomeList_daily = []
				for (var d = 0; d < dl.length; d++) {
					var sum_expense = 0
					var sum_income = 0
					for (var e = 0; e < el.length; e++) {
						if (el[e].date === dl[d]) {
							sum_expense = sum_expense + el[e].outcome
						}

					}
					for (var i = 0; i < il.length; i++) {
						if (il[i].date === dl[d]) {
							sum_income = sum_income + il[i].income
						}

					}
					this.expenseList_daily.push(sum_expense)
					this.incomeList_daily.push(sum_income)
				}
				this.option_Line_new.xAxis.data = dl
				this.option_Line_new.series[0].data = this.expenseList_daily
				console.log("this.option_Line_new")
				console.log(this.option_Line_new)
				this.$refs.teCart.setOption(this.option_Line_new);
			},
			formatEveryDay(start, end) {
				let dateList = [];
				var startTime = this.getDate(start);
				var endTime = this.getDate(end);

				while ((endTime.getTime() - startTime.getTime()) >= 0) {
					var year = startTime.getFullYear();
					var month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() +
					1;
			 	var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
					dateList.push(year + "-" + month + "-" + day);
					startTime.setDate(startTime.getDate() + 1);
				}
				return dateList;
			},
			getMonthBetween(start, end) { //传入的格式YYYY-MM
				let dateList_begin = []; // 时间格式 ‘2019-04-01’
				let dateList_end = [];
				let dateList_month = []; // 时间格式 ‘2019-04’ 
				var s = start.split("-");
				var e = end.split("-");
				var min = new Date();
				var max = new Date();
				min.setFullYear(s[0], s[1] * 1 - 1, 1); // 开始日期
				max.setFullYear(e[0], e[1] * 1 - 1, 1); // 结束日期
				var current = min;
				while (current <= max) {
					var year = current.getFullYear();
					var month = current.getMonth() + 1 < 10 ? '0' + (current.getMonth() + 1) : current.getMonth() + 1;
					var lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate()
					dateList_begin.push(year + "-" + month + "-" + '01');
					dateList_end.push(year + "-" + month + "-" + lastDay);
					dateList_month.push(year + "-" + month);
					current.setMonth(month);
				}
				this.monthly.month_begin = dateList_begin
				this.monthly.month_end = dateList_end
				this.monthly.monthList = dateList_month
				console.log("monthly_data")
				console.log(dateList_begin, dateList_end, dateList_month)
			},

			getDate(datestr) {
			 var temp = datestr.split("-");
				var date = new Date(temp[0], temp[1] - 1, temp[2]);
				return date;
			},
			getMonData(startTime, nowTime, endTime, typeId) {
				http.get('/youngster/getIncomeList', {
						params: {
							startTime: startTime,
							endTime: nowTime,
							typeId: typeId,
							header: {token:this.$store.state.token}
						}
					}).then(res => {

						console.log("getIncomeList",res)
						this.incomeList = res.data.data
					}).catch(err => {

					}),
					http.get('/youngster/getAllOutcomes', {
						params: {
							startTime: startTime,
							endTime: nowTime,
							typeId: typeId,
							header: {token:this.$store.state.token}
						}
					}).then(res => {

						console.log(res)
						this.expenseList = res.data.data.bills
					}).catch(err => {

					}),
					http.get('/youngster/getIncomePlanList', {
						params: {
							dateStart: startTime,
							endTime: endTime,
							header: {token:this.$store.state.token}
						}
					}).then(res => {
						console.log(res)
						this.incomePlanList = res.data.data
					}).catch(err => {

					}),
					http.get('/youngster/getLoanRecordList', {
						params: {
							isFinished: 0,
							header: {token:this.$store.state.token}
						}
					}).then(res => {
						console.log(res)
						this.loanList = res.data.data
						console.log("day_List")
						console.log(this.day_List)
						console.log(this.expenseList, this.incomeList)
						this.get_dailyData(this.day_List, this.expenseList, this.incomeList)
						console.log(this.expenseList_daily, this.incomeList_daily)
					}).catch(err => {

					})


			},
			Reset() {

				this.$refs.teCart.setOption(this.option_Line_new);

			},
			
			initIe(res){
				const { width, height, chart } = res;
				
				this.$nextTick(function() {
					chart.setOption(this.option_ie);
				})
				this.$refs.tChart.setOption(this.option_ty)
			},
			gc(res) {
				// 初始化成功后返回的数据如下：
				const { width, height, chart } = res;
				this.$nextTick(function() {
					chart.setOption(this.option_Line);
				})
			},

			openurl(e) {
				let t = this;
				console.log(e);
				console.log(e.data.url)
				uni.navigateTo({
					url: e.data.url,
					fail: e => {
						t.show = true;
					}
				})
			},
			tanchtest(e) {
				console.log(e);
			},
			change(e) {
				this.$tm.toast(`
				点击了：${e.index},数据为：${JSON.stringify(e.data)}`)
				this.show_1 = true
			},
			iconClick(e) {
				console.log(5);
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

		}
	}

</script>

<style>

</style>


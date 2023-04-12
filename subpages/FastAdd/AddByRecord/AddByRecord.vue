<template>
	<tm-full-view>
		<view style="flex: auto;">
			<tm-row>
				<tm-col :grid="2" justify="left">
					<text style="font-size: 60rpx;font-weight: 500;">

					</text>
				</tm-col>
				<tm-col :grid="8">
					<tm-segTabs :gutter="10" round="0" :list="list_head" fontSize="s" activeFontColor="primary"
						v-model="active" @change="setHead"></tm-segTabs>
				</tm-col>

			</tm-row>

			<view style="margin-top: 50rpx;margin-left: 30rpx;margin-right: 30rpx;">
				<tm-dragGrid :disabled="disabledGrid" :list="typeList"  :item-height="150" :col="5">
				<template v-slot:default="{item}">
					<view class="flex-center flex-col" style="width:70% margin-top:50rpx;">
						<tm-badges v-if="item.pick" :offset="[0,-5]" icon="icon-plus"></tm-badges>
						<tm-icons :name="item.typeIcon" :size="50" @click="pickType(item)"></tm-icons>

						<text class="text-size-s pt-10">{{item.typeName}}</text>
					</view>
				</template>
			</tm-dragGrid>
			</view>
			



		<tm-poup  v-model="show_cal" :position="pos" :height="700" round=2 :is-filter="false">
			<view class="calculator-view" style="position: absolute; bottom: 0px">
				<tm-row>
					
					<tm-col :grid="12" style="margin-top: 20rpx;">
						<tm-input  title="记账描述" v-model="text" placeholder="请输入备注" align="left"></tm-input>
						
					</tm-col >
				</tm-row>
				
			
				<view class="calculator-view-top">
			
					<tm-row>
						<tm-col :grid="10">
							<tm-row>
								<tm-col :grid="12" justify="right" style="margin-left: 70rpx;">
									<text class="calculator-view-top-a">{{ topText }}</text>
								</tm-col>
							</tm-row>
							<tm-row>
								<tm-col :grid="12">
									<view class="calculator-view-top-b">
										<!-- #ifdef APP-NVUE -->
										<text class="calculator-view-top-b1">{{ bottomText }}</text>
			
			
										<!-- #endif -->
										<!-- #ifndef APP-NVUE -->
										<view class="calculator-view-top-b1">{{ bottomText }}</view>
										<!-- #endif -->
										<image class="calculator-view-top-b2" src="/static/delete-1.png"
											@tap="deleteNum"></image>
									</view>
								</tm-col>
							</tm-row>
						</tm-col>
						<tm-col :grid="2">
							<tm-button @click="submitRecord" :width="210" :height="110" round="0" shadow="0" bgcolor="#fff"
								style="margin-left: 80rpx;">
									<tm-icons name="icon-calendaralt-fill" size="45" @click="show_calendar = true"></tm-icons>
								<text style="font-size: 35rpx;;color:teal;margin-left: 10rpx;margin-bottom:10rpx ;">今天</text>
								</tm-button>
						</tm-col>
					</tm-row>
			
				</view>
			
				<view class="calculator-button">
					<view class="calculator-button-left">
						<!-- 1-9 -->
						<!-- 小程序使用请改成 :key="ix" -->
						<view class="calculator-button-left-aview" v-for="(item, ix) in calculatorButAList"
							:key="'a' + ix">
							<view class="calculator-button-left-a2"></view>
							<view class="calculator-button-left-a" @tap="numTapA(item)">
								<text class="calculator-button-left-a1">{{ item }}</text>
							</view>
						</view>
						<!-- 小数点 -->
						<view class="calculator-button-left-aview">
							<view class="calculator-button-left-a2"></view>
							<view class="calculator-button-left-a" @tap="numTapC"><text
									class="calculator-button-left-a1">.</text></view>
						</view>
						<!-- 0 00 -->
						<!-- 小程序使用请改成 :key="ix" -->
						<view class="calculator-button-left-aview" v-for="(item, ix) in calculatorButBList"
							:key="'b' + ix">
							<view class="calculator-button-left-a2"></view>
							<view class="calculator-button-left-a" @tap="numTapB(item)">
								<text class="calculator-button-left-a1">{{ item }}</text>
							</view>
						</view>
					</view>
					<!-- 运算符号 -->
			
					<view class="calculator-button-right">
						<!-- ÷ × -->
						<!-- 小程序使用请改成 :key="ix" -->
			
						<view class="calculator-button-right-a" v-for="(item, ix) in calculatorButCList" :key="'c' + ix"
							@tap="operationalTapA(item)">
							<text class="calculator-button-right-a1">{{ item }}</text>
						</view>
						<!-- + - -->
						<!-- 小程序使用请改成 :key="ix" -->
						<view class="calculator-button-right-a" v-for="(item, ix) in calculatorButDList" :key="'d' + ix"
							@tap="operationalTapB(item)">
							<text class="calculator-button-right-a1">{{ item }}</text>
						</view>
						<!-- = -->
						<view class="calculator-button-right-a" @tap="operationalTapC"><text
								class="calculator-button-right-a1">=</text></view>
						<tm-button @click="submitRecord" :width="210" :height="85" round="0" shadow="0"
						style="margin-left: -10rpx;"
							>提交</tm-button>
					</view>
				</view>
				<!-- 按钮 -->
			
			</view>
		</tm-poup>
			
			<tm-poup v-model="show_calendar" :position="pos" :height="900">
				<tm-calendarView color="bg-gradient-red-lighten-b" @confirm="pick_data"></tm-calendarView>

			</tm-poup>
		</view>


	</tm-full-view>

</template>

<script>
	import tmCalendarView from "@/tm-vuetify/components/tm-calendarView/tm-calendarView.vue"
	import tmCalendar from "@/tm-vuetify/components/tm-calendar/tm-calendar.vue"
	import tmMonthCalendar from "@/tm-vuetify/components/tm-monthCalendar/tm-monthCalendar.vue"
	import tmScroll from '@/tm-vuetify/components/tm-scroll/tm-scroll.vue';
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
			tmCalendarView,
			tmCalendar,
			tmMonthCalendar,
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
			tmGrouplist,
			tmScroll
		},
		data() {
			return {
				list_1: [
					{ iconSize: 46, icon: 'icon-border-bottom', value: '首页', path: '/pages/youngster/Pindex/Pindex' },
					{ iconSize: 46, icon: 'icon-user-group', value: '好友', path: '/pages/youngster/Analysis/Analysis' },
					{ iconSize: 46, icon: 'icon-plus-square', value: '记账', path: '/pages/youngster/Add/Add' },
					{ iconSize: 46, icon: 'icon-chart-line', value: '分析', path: '/pages/youngster/Manage/Manage' },
					{ iconSize: 46, icon: 'icon-process', value: '我', path: '/pages/youngster/Me/Me' }
				],
				active: 0,
				list_head: ['收入', '支出'],
				show_calendar: false,
				ActionList: [{
						text: '选择今日',
						iconSize: 40,
						icon: 'icon-calendaralt-fill',

					},
					{
						text: '拍照导入',
						iconSize: 40,
						icon: 'myicon-xiangji'
					},
					{
						text: '语音导入',
						iconSize: 40,
						icon: 'myicon-yuyin'
					},
					{
						text: '截图导入',
						iconSize: 40,
						icon: 'icon-cut'
					},


					{
						text: '文件导入',
						iconSize: 40,
						icon: 'icon-folderplus-fill'
					},


				],
				calculatorButAList: ['7', '8', '9', '4', '5', '6', '1', '2', '3'],
				calculatorButBList: ['0', '00'],
				// calculatorButCList: ['÷', '×'],
				calculatorButDList: ['+', '-'],
				topText: '',
				bottomText: '',
				disabledGrid: true,
				typeList: [],
				pos: "bottom",
				in_exp: 0,

				show_cal:false,
				sum: 0,
				text: "",
				date: "",
				typeId: "",
			}
		},
		created() {

			http.get('/youngster/getTypeList', {
				header: {token:this.$store.state.token}
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
		watch: {
			sum: {
				handler(o, n) {
					console.log(o)
					console.log(n)
				}
			}
		},
		methods: {
			submitRecord() {
				console.log(this.typeId)
				console.log(this.text)
				console.log(this.sum)
				console.log(this.date)
				http.post('/youngster/addOutcomeRecord', {
					typeId: this.typeId,
					outcomeName: this.text,
					outcome: this.sum,
					date: this.date
				}, {header: {token:this.$store.state.token}}).then(res => {
					console.log(res)

				}).catch(err => {
					console.log(err)
				})
			},
			setHead(e) {
				console.log(e)
				this.in_exp = e

			},
			pick_data(e) {
				console.log(e)
				this.date = e.year + '-' + e.month + '-' + e.day
				this.ActionList[0].text = this.date
			},
			ClickButton(item) {
				console.log(item)
				if (item.icon === "icon-calendaralt-fill") { this.show_calendar = true }
				if (item.text === "拍照导入") {
					uni.navigateTo({
						url: '/subpages/FastAdd/AddByPhoto/AddByPhoto'
					})
				}
				if (item.text === "截图导入") {
					uni.chooseImage({
						count: 6, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							console.log(JSON.stringify(res.tempFilePaths));
						}
					});

				}
				if (item.text === "语音导入") {
					uni.navigateTo({
						url: '/subpages/FastAdd/AddBySound/AddBySound'
					})
				}
				if (item.text === "文件导入") {
					uni.getSavedFileList({
						success: function(res) {
							console.log(res.fileList);
						}
					});
				}
			},
			pickType(item) {
				this.show_cal=true
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
					}

				}
				console.log(this.typeId)
			},
			closeCalculatorPopup() {
				this.$emit('closeCalculatorPopup');
			},
			// 清零
			clearAll() {
				this.bottomText = '';
				this.topText = '';
			},
			// 删除一位字符
			deleteNum() {
				if (this.bottomText == 'Infinity' || this.bottomText == 'NaN') {
					this.bottomText = '';
					return;
				}
				if (this.bottomText) {
					this.bottomText = this.bottomText.slice(0, -1);
					// if(!this.bottomText){
					// 	this.topText = '';
					// }
					return;
				}

				if (this.topText) {
					let temp = this.topText.split(' ');
					temp.pop();
					this.topText = temp.join(' ');
					// this.topText = this.topText.slice(0, -1);
					// this.topText = '';
				}
			},
			// 1-9输入判断
			numTapA(item) {
				if (this.bottomText.length == 1 && this.bottomText == 0) {
					return;
				}
				if (this.bottomText == 'Infinity' || this.bottomText == 'NaN') {
					this.bottomText = '';
				}
				this.bottomText += item;
				this.sum = this.bottomText
			},
			// 0,00输入判断
			numTapB(item) {
				if (this.bottomText.length == 1 && this.bottomText == 0) {
					return;
				}
				if (item == '00' && this.bottomText == '') {
					return;
				}
				if (this.bottomText == 'Infinity' || this.bottomText == 'NaN') {
					this.bottomText = '';
				}
				this.bottomText += item;
				this.sum = this.bottomText
			},
			// .输入判断
			numTapC() {
				if (this.bottomText == 'Infinity' || this.bottomText == 'NaN') {
					this.bottomText = '';
				}
				if (!this.bottomText) {
					return;
				}
				if (this.bottomText.indexOf('.') != '-1') {
					return;
				}
				this.bottomText += '.';
				this.sum = this.bottomText
			},
			//  × ÷ 输入
			operationalTapA(item) {
				if (this.bottomText == 'Infinity' || this.bottomText == 'NaN') {
					this.bottomText = '';
					return;
				}
				if (this.bottomText) {
					// 小数点后不带字符
					if (this.bottomText.endsWith('.')) {
						return;
					}
					// 首位允许为 -,但未带字符
					if (this.bottomText.endsWith('-')) {
						return;
					}
					if (this.topText) {
						// 首行为计算表达式 则将计算结果与当前数值合并成新的表达式
						if (this.topText.endsWith('=')) {
							this.topText = this.bottomText + ' ' + item;
							this.bottomText = '';
							return;
						}
						// 兼容用户奇奇怪怪输入的特殊情况
						let numList = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
						let lastT = this.topText.slice(-1);
						if (numList.includes(lastT)) {
							this.topText = this.topText + this.bottomText + ' ' + item;
						} else {
							this.topText = this.topText + ' ' + this.bottomText + ' ' + item;
						}
					} else {
						this.topText = this.bottomText + ' ' + item;
					}
					this.bottomText = '';
					return;
				}
				if (this.topText) {
					let lastT = this.topText.slice(-1);
					if (lastT == '+' || lastT == '-' || lastT == '÷' || lastT == '×') {
						this.topText = this.topText.slice(0, -1);
						this.topText = this.topText + item;
						return;
					}
					this.topText = this.topText + ' ' + item;
				}
			},
			// + - 输入
			operationalTapB(item) {
				if (this.bottomText == 'Infinity' || this.bottomText == 'NaN') {
					this.bottomText = '';
					return;
				}
				if (this.bottomText) {
					if (this.bottomText.endsWith('.')) {
						return;
					}
					if (this.bottomText.endsWith('-')) {
						return;
					}
					if (this.topText) {
						if (this.topText.endsWith('=')) {
							this.topText = this.bottomText + ' ' + item;
							this.bottomText = '';
							return;
						}
						let numList = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
						let lastT = this.topText.slice(-1);
						if (numList.includes(lastT)) {
							this.topText = this.topText + this.bottomText + ' ' + item;
						} else {
							this.topText = this.topText + ' ' + this.bottomText + ' ' + item;
						}
					} else {
						this.topText = this.bottomText + ' ' + item;
					}
					this.bottomText = '';
					return;
				}
				// 首位字符允许为-
				if (item == '-') {
					this.bottomText = item;
					return;
				}
			},
			// = 输入
			operationalTapC() {
				if (this.bottomText == 'Infinity' || this.bottomText == 'NaN') {
					this.bottomText = '';
				}
				if (this.bottomText) {
					if (this.bottomText.endsWith('.')) {
						return;
					}
					if (this.bottomText.endsWith('-')) {
						return;
					}
					if (this.topText.endsWith('=')) {
						this.topText = this.bottomText;
						this.bottomText = '';
						return;
					}

					let tempA = this.topText + ' ' + this.bottomText;
					this.topText = this.topText + ' ' + this.bottomText + ' ' + '=';

					// 求值
					this.operationHandle(tempA);
					return;
				}
				if (this.topText) {
					let tempA = '';
					let lastT = this.topText.slice(-1);
					if (lastT == '+' || lastT == '-' || lastT == '÷' || lastT == '×' || lastT == '=') {
						tempA = this.topText.slice(0, -2);
					} else if (lastT == ' ') {
						tempA = this.topText.slice(0, -1);
						let t1 = tempA.slice(-1);
						let t2 = ['+', '-', '×', '÷'];
						if (t2.includes(t1)) {
							tempA = tempA.slice(0, -1);
						}
						this.topText = this.topText + ' ' + '=';
					} else {
						tempA = this.topText;
						this.topText = this.topText + ' ' + '=';
					}

					// 运算求值
					this.operationHandle(tempA);
				}
			},
			// 运算代理
			operationHandle(resStr) {
				let regA = /×/gi;
				let regB = /÷/gi;
				let expression = resStr.replace(regA, '*');
				expression = expression.replace(regB, '/');

				// #ifdef MP-WEIXIN
				// 小程序禁用 eval(),故自行计算结果
				// 将表达式转成数组
				let expressionList = expression.split(' ');
				// 自定义实现 * / 运算
				for (let i = 1; i < expressionList.length; i += 2) {
					let symbol = expressionList[i];
					let left = expressionList[i - 1];
					let right = expressionList[i + 1];
					if (symbol == '*') {
						expressionList[i - 1] = -1;
						expressionList[i] = -1;
						expressionList[i + 1] = left * right;
					}
					if (symbol == '/') {
						expressionList[i - 1] = -1;
						expressionList[i] = -1;
						expressionList[i + 1] = left / right;
					}
				}
				// 去除标空数据 -1
				expressionList = expressionList.filter(item => item != -1);

				// 自定义实现 + - 运算
				for (let i = 1; i < expressionList.length; i += 2) {
					let symbol = expressionList[i];
					let left = expressionList[i - 1];
					let right = expressionList[i + 1];
					if (symbol == '+') {
						expressionList[i - 1] = -1;
						expressionList[i] = -1;
						expressionList[i + 1] = left * 1 + right * 1;
					}
					if (symbol == '-') {
						expressionList[i - 1] = -1;
						expressionList[i] = -1;
						expressionList[i + 1] = left - right;
					}
				}
				expressionList = expressionList.filter(item => item != -1);
				expressionList = expressionList.filter(item => item);
				// 结果
				let res = expressionList[0];

				if (this.isFloat(res)) {
					res = parseFloat(res.toPrecision(12));
				}
				this.bottomText = res + '';
				return;
				// #endif

				// 结果数值 非小程序
				let resNum = eval(expression);
				if (this.isFloat(resNum)) {
					resNum = parseFloat(resNum.toPrecision(12));
					this.sum = resNum
				}
				this.sum = resNum
				this.bottomText = resNum + '';
			},
			// 判断是否浮点数
			isFloat(n) {
				return n != parseInt(n);
			}
		}
	}

</script>

<style>
	.calculator-view {

		height: 700rpx;
		display: flex;

		flex-direction: column;
		background-color: #ffffff;
	}

	.calculator-view-top {
		box-sizing: border-box;
		width: 540rpx;
		background-color: #ffffff;

		display: flex;
		flex-direction: column;
	}

	.calculator-view-top-a {
		font-size: 40rpx;
		min-height: 44rpx;
		color: #606060;
		text-align: right;
	}

	.calculator-view-top-b {
		margin-top: 20rpx;
		margin-left: 50rpx;
		width: 480rpx;
		min-height: 70rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.calculator-view-top-b1 {
		width: 480rpx;

		word-wrap: break-word;
		font-size: 56rpx;
		text-align: left;
		color: #606060;
	}

	.calculator-view-top-b2 {
		width: 75rpx;
		height: 60rpx;
	}

	.calculator-button {
		width: 760rpx;
		display: flex;
		flex-direction: row;
	}

	.calculator-button-left {
		width: 650rpx;
		height: 106rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.calculator-button-left-a {
		position: relative;
		width: 180rpx;
		height: 106rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
	}

	.calculator-button-left-aview {
		width: 180rpx;
		height: 106rpx;
		position: relative;
	}

	.calculator-button-left-a1 {
		font-size: 40rpx;
		color: #212121;
	}

	.calculator-button-left-a:active {
		opacity: 0.7;
	}

	.calculator-button-left-a2 {
		width: 180rpx;
		height: 106rpx;
		position: absolute;
		background-color: #000000;
	}

	.calculator-button-right {
		width: 220rpx;
		height: 424rpx;
		display: flex;
		flex-direction: column;
		background-color: #009688;
	}

	.calculator-button-right-a {
		width: 220rpx;
		height: 106rpx;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;
	}

	.calculator-button-right-a1 {
		font-size: 50rpx;
		color: #212121;
	}

	.calculator-button-right-a:active {
		opacity: 0.7;
	}

	.calculator-view-bottom {
		width: 630rpx;
		height: 70rpx;
		background-color: #ffffff;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.calculator-view-bottom-a {
		width: 160rpx;
		height: 70rpx;
		border-radius: 40rpx;
		margin-left: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;
	}

	.calculator-view-bottom-a:active {
		opacity: 0.7;
	}

	.calculator-view-bottom-a1 {
		font-size: 34rpx;
		font-weight: 500;
		color: #212121;
	}

</style>


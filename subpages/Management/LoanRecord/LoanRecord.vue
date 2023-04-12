<template>
	<view :class="$tm.vx.state().tmVuetify.black ? 'black bk' : ''">


		<tm-grouplist @change="test" title="贷款列表" title-theme="blue text">
			<tm-listitem v-for="(item, index) in loanList" group :title="item.loanName">
				<template v-slot:group>
					<view>
						<tm-input :required="true" title="贷款名称" v-model="loanDetail.loanName" placeholder="请输入贷款名称"
							align="left"></tm-input>
						<tm-input :required="true" title="贷款金额" v-model="loanDetail.loanSum" placeholder="请输入贷款金额"
							align="left"></tm-input>
						<tm-input :required="true" title="每月应还金额" v-model="loanDetail.monthlyPayment"
							placeholder="请输入每月应还金额" align="left"></tm-input>
						<tm-input :required="true" title="总还款时间" v-model="loanDetail.loanDuration"
							placeholder="请输入总还款时间" align="left"></tm-input>
						<tm-input :required="true" title="已还款时间" v-model="loanDetail.pastMonths" placeholder="请输入已还款时间"
							align="left"></tm-input>
						<tm-pickersDate @confirm="dateChange_start" :default-value="loanDetail.createdTime" end="2021-12-31">
							<view class="fulled">
								<tm-input :required="true" :disabled="true" title="开始时间"
									v-model="loanDetail.createdTime" right-icon="icon-angle-right"
									placeholder="请输入贷款开始时间" align="right"></tm-input>
							</view>
						</tm-pickersDate>
						<tm-pickersDate @confirm="dateChange_end" :default-value="loanDetail.loanDeadline" end="2021-12-31">
							<view class="fulled">
								<tm-input :required="true" :disabled="true" title="结束时间"
									v-model="loanDetail.loanDeadline" right-icon="icon-angle-right"
									placeholder="请输入贷款结束时间" align="right"></tm-input>
							</view>
						</tm-pickersDate>
						<tm-sheet v-for="(item,index) in loanDetailList" :key="index" :margin="[0, 0]" :shadow="0"
							color="blue text">
							<view>{{item}}</view>
						</tm-sheet>
						<tm-button @click=deleteLoan(item.loanId) theme="bg-gradient-red-accent">删除</tm-button>
						<tm-button @click=updateLoan theme="bg-gradient-red-accent">修改</tm-button>

					</view>
				</template>

			</tm-listitem>
		</tm-grouplist>
		<view class="ma-32 pa-24">
			<tm-button  @click=addLoan>动态添加列表组件的项目</tm-button>
		</view>
		<tm-poup v-model="show_addloan" :position="pos" :height="1000" >
			<view>
				<tm-input :required="true" title="贷款名称" v-model="loanDetail.loanName" placeholder="请输入贷款名称"
					align="left"></tm-input>
				<tm-input :required="true" title="贷款金额" v-model="loanDetail.loanSum" placeholder="请输入贷款金额"
					align="left"></tm-input>
				<tm-input :required="true" title="每月应还金额" v-model="loanDetail.monthlyPayment"
					placeholder="请输入每月应还金额" align="left"></tm-input>
				<tm-input :required="true" title="总还款时间" v-model="loanDetail.loanDuration"
					placeholder="请输入总还款时间" align="left"></tm-input>
				<tm-input :required="true" title="已还款时间" v-model="loanDetail.pastMonths" placeholder="请输入已还款时间"
					align="left"></tm-input>
				<tm-pickersDate @confirm="dateChange_start" :default-value="loanDetail.createdTime" end="2021-12-31">
					<view class="fulled">
						<tm-input :required="true" :disabled="true" title="开始时间"
							v-model="loanDetail.createdTime" right-icon="icon-angle-right"
							placeholder="请输入贷款开始时间" align="right"></tm-input>
					</view>
				</tm-pickersDate>
				<tm-pickersDate @confirm="dateChange_end" :default-value="loanDetail.loanDeadline" end="2021-12-31">
					<view class="fulled">
						<tm-input :required="true" :disabled="true" title="结束时间"
							v-model="loanDetail.loanDeadline" right-icon="icon-angle-right"
							placeholder="请输入贷款结束时间" align="right"></tm-input>
					</view>
				</tm-pickersDate>
				<tm-sheet v-for="(item,index) in loanDetailList" :key="index" :margin="[0, 0]" :shadow="0"
					color="blue text">
					<view>{{item}}</view>
				</tm-sheet>
				<tm-button @click=confirmAddLoan() theme="bg-gradient-red-accent">提交新增</tm-button>
				
			
			</view>
			
		</tm-poup>
		<view style="height: 100upx;"></view>
	</view>
</template>

<script>
	import tmPoup from '@/tm-vuetify/components/tm-poup/tm-poup.vue';
	import tmFullView from '@/tm-vuetify/components/tm-fullView/tm-fullView.vue';
	import tmMenubars from '@/tm-vuetify/components/tm-menubars/tm-menubars.vue';
	import tmSheet from '@/tm-vuetify/components/tm-sheet/tm-sheet.vue';
	import tmInput from '@/tm-vuetify/components/tm-input/tm-input.vue';
	import tmListitem from '@/tm-vuetify/components/tm-listitem/tm-listitem.vue';
	import tmGrouplist from '@/tm-vuetify/components/tm-grouplist/tm-grouplist.vue';
	import tmButton from '@/tm-vuetify/components/tm-button/tm-button.vue';
	import tmPickersDate from '@/tm-vuetify/components/tm-pickersDate/tm-pickersDate.vue';
	import Request from '@/utils/luch-request/index.js' // 下载的插件
	// import Request from 'luch-request' // 使用npm

	const http = new Request();
	export default {
		components: { tmPickersDate, tmFullView, tmMenubars, tmSheet, tmInput, tmListitem, tmGrouplist, tmButton,tmPoup },
		data() {
			return {
				show_addloan:false,
				indexlen: 0,
				loanList: [],
				loanDetail: {
					loanName: '',
					loanSum: 0,
					monthlyPayment: 0,
					loanDuration: 0,
					pastMonths: 0,
					createdTime: '',
					loanDeadline: '',
				},
				new_loanDetail: {
					loanName: '',
					loanSum: 0,
					monthlyPayment: 0,
					loanDuration: 0,
					pastMonths: 0,
					createdTime: '',
					loanDeadline: '',
				},
				loanDetailList: [],
			};


		},
		onLoad() {
			http.get('/youngster/getLoanRecordList', {}).then(res => {

				console.log(res)
				this.loanList = res.data.data

			}).catch(err => {

			})
		},
		methods: {
			dateChange_start(e){
				this.loanDetail.createdTime = e.year + '-' + e.month + '-' + e.day;
			},
			dateChange_end(e){
				this.loanDetail.loanDeadline = e.year + '-' + e.month + '-' + e.day;
			},
			confirmAddLoan(){
				http.post('/youngster/addLoanRecord', this.new_loanDetail, {}).then(res => {
					
				}).catch(err => {
					console.log(err)
				}),
				http.get('/youngster/getLoanRecordList', {}).then(res => {
				
					console.log(res)
					this.loanList = res.data.data
				
				}).catch(err => {
				
				}),
				this.show_addloan=false
			},
			addLoan(){
			this.show_addloan=true
			},
			updateLoan(){
				http.put('/youngster/updateLoanRecord', 
						this.loanDetail
					, {}).then(res => {
				
					}).catch(err => {
						console.log(err)
					})
			},
			deleteLoan(loanid) {
				console.log(loanid)
				http.put('/youngster/deleteLoanRecord', {
						"loanId": loanid,
					}, {}).then(res => {

					}).catch(err => {
						console.log(err)
					}),
					http.get('/youngster/getLoanRecordList', {}).then(res => {

						console.log(res)
						this.loanList = res.data.data

					}).catch(err => {

					})
			},
			test(e) {
				this.loanDetailList = []
				console.log(e);
				console.log(this.loanList[e].loanId)
				http.get('/youngster/getLoanDetail', {
					params: {
						loanId: this.loanList[e].loanId
					}
				}).then(res => {

					console.log(res)
					this.loanDetail = res.data.data

				}).catch(err => {

				})
			}
		}
	};

</script>

<style></style>


<template>
	<tm-full-view>
		<tm-card img="https://picsum.photos/300" :imgRound="24" :actionBorder="false" title="简单示例" content="内容"
			subTitle="2022-1-1 12:00:00" statusText="正常"></tm-card>
		<view style=" margin-left: 18px;margin-right: 18px;">
			<view >
				<u-swipe-action @click="ooo">
					<u-swipe-action-item  v-for="(item, index) in incomeList" :options="options5" @click="onClick($event,item.incomeId)"> 
						<view >
							<view style="height: 50px; margin-left: 5px;margin-top:3%;">
								<tm-icons :name="item.typeIcon"></tm-icons>
								<text style="font-size: 20px;">{{item.incomeName}}</text><br/>

								<text style="margin-right: 30% ;font-size: 12px;">{{item.date}}</text><br/>
								
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</view>
			
		<tm-poup v-model="show_poup" :position="pos" :height="300">
			<view>
					<tm-form @submit="submit" ref="formData" @request="success" method="post">
						<tm-input name="title" required title="修改收入名称" v-model="reqData.title"></tm-input>
						
						<tm-input name="price" required title="修改收入金额" input-type="digit" v-model="reqData.price"
							suffix="万"></tm-input>
						
						<tm-button navtie-type="form">提交数据</tm-button>
					</tm-form>
				</view>
		</tm-poup>
	</tm-full-view>

</template>

<script>
	import tmSheet from "@/tm-vuetify/components/tm-sheet/tm-sheet.vue"
	import tmCol from "@/tm-vuetify/components/tm-col/tm-col.vue"
	import tmRow from "@/tm-vuetify/components/tm-row/tm-row.vue"
	import tmIcons from '@/tm-vuetify/components/tm-icons/tm-icons'
	import markSlideList from '../../../components/mark-slide-list/mark-slide-list'
	import tmButton from '@/tm-vuetify/components/tm-button/tm-button';
	import tmForm from '@/tm-vuetify/components/tm-form/tm-form';
	import tmCard from '@/tm-vuetify/components/tm-card/tm-card';
	import tmPoup from '@/tm-vuetify/components/tm-poup/tm-poup';
	import tmMenubars from '@/tm-vuetify/components/tm-menubars/tm-menubars';
	import tmFullView from '@/tm-vuetify/components/tm-fullView/tm-fullView';
	import tmImages from '@/tm-vuetify/components/tm-images/tm-images';
	import fuiButton from '../../../components/firstui/fui-button/fui-button'
	import fuiSwipeAction from '../../../components/firstui/fui-swipe-action/fui-swipe-action'
	import fuiSwipeactionGroup from '../../../components/firstui/fui-swipeaction-group/fui-swipeaction-group'
	import fuiListCell from '../../../components/firstui/fui-list-cell/fui-list-cell'
	import fuiIcon from '../../../components/firstui/fui-icon/fui-icon'
	import Request from '@/utils/luch-request/index.js' // 下载的插件
	// import Request from 'luch-request' // 使用npm

	const http = new Request();
	export default {
		components: {
			fuiButton,
			fuiSwipeAction,
			fuiSwipeactionGroup,
			fuiListCell,
			fuiIcon,
			tmCard,
			tmMenubars,
			tmFullView,
			tmImages,
			tmPoup,
			tmForm,
			markSlideList,
			tmIcons,
		},
		data() {
			return {
				item_id:'',
				show_poup: false,
				pos: 'bottom',
				incomeList: [],
				show: true,
				reqData: {
					title: '',
					price: 0
				},

				buttons: [{
					text: '修改',
					background: '#465CFF'
				}, {
					text: '删除',
					background: '#FF2B2B'
				}],
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
			
				http.get('/youngster/getIncomeList', {}).then(res => {
					console.log(res)
					this.incomeList = res.data.data

				}).catch(err => {

				})
		},
		methods: {
			ooo(e) {
				console.log(e)
				console.log("0000")
				this.show_poup = true
			},
			
			onClick(e,t) {
				console.log(e)
				console.log(t)
				if (e.index === 1) {
					console.log('click')
					this.show_poup = true
					
					console.log('修改')
				} else {
					console.log('删除')
					http.put('/youngster/updateIncomeRecord', {
						"incomId":t,
						
					}, {}).then(res => {
						console.log(res)
						console.log("删除一条记录")
					}).catch(err => {
						console.log(err)
					})
				}


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


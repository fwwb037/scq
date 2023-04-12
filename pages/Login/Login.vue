
<template>
	<view class="content">
		<view class="head">
			<text>让消费与记账</text>
			<text>同时发生！</text>
		</view>
		<view class="form-box">
			<view class="row-input">
				<text class="tip">{{phone!=''?'Phone number':''}}</text>
				<view class="input-box">
					<input v-model="phone" maxlength="11" placeholder="Phone number" placeholder-class="placeholder" />
					<image mode="aspectFit" v-show="phone==''?false:true" @click="close" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-a1714171-183a-4753-b538-8fabcab0d8b6/d9bc0367-60be-4380-805b-4b9b64aa1b06.png">
					</image>
				</view>
			</view>
			<view class="row-input">
				<text class="tip">{{password!=''?'Password':''}}</text>
				<view class="input-box">
					<input v-model="password" maxlength="18" password placeholder="password"
						placeholder-class="placeholder" />
				</view>
			</view>
			<view class="login-btn" @click="Login">
				<tm-row style="width: 300rpx;">
					<tm-col :grid="5" justify="right"><text>登</text></tm-col>
					<tm-col :grid="2"></tm-col>
					<tm-col :grid="5" justify="left"><text>录</text></tm-col>
				</tm-row>
			</view>
			<view class="login-type">
				<tm-grid  @click-dot="iconClick"  @change="change" color="blue" :list="login_list" ></tm-grid>
			</view>
			
		</view>
		<view class="menu-link">还没账号?
			<text @click="signUp">注册</text><text @click="forget">忘记密码</text>
		</view>
	</view>
</template>

<script>
	import tmCol from "@/tm-vuetify/components/tm-col/tm-col.vue"
	import tmRow from "@/tm-vuetify/components/tm-row/tm-row.vue"
import tmFullView from "@/tm-vuetify/components/tm-fullView/tm-fullView.vue"
	import tmMenubars from "@/tm-vuetify/components/tm-menubars/tm-menubars.vue"
	import tmSheet from "@/tm-vuetify/components/tm-sheet/tm-sheet.vue"
	import tmGrid from "@/tm-vuetify/components/tm-grid/tm-grid.vue"
	import Request from '@/utils/luch-request/index.js' // 下载的插件
	// import Request from 'luch-request' // 使用npm
	
	const http = new Request();
	export default {
		components:{tmFullView,tmMenubars,tmSheet,tmGrid,tmCol ,tmRow},
		data() {
			return {
				
				
				phone: "",
				password: "",
				show:true,
				login_list:[
					{icon:'icon-mobile-alt',text:'手机验证码',color:'blue'},
					{icon:'icon-weixin',text:'微信',color:'green',fontColor:'green'},
					{icon:'icon-alipay',text:'支付宝',color:'blue'},
				],
				
			}
		},
		methods: {
			Login(){
				
				http.post('/common/loginByPassword', {
					"phoneNumber": this.phone,
					"password":this.password
				}, {}).then(res => {
					console.log(res)
					this.$store.dispatch('set_token',res.data.data)
					
				}).catch(err => {
					console.log(err)
				})
				
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			change(e){
				if(e.index===0){
					uni.navigateTo({
						url: '/pages/Login/LoginByCode'
					})
				}
				if(e.index===1){
					console.log('微信登录')
				}
				if(e.index===2){
					console.log('支付宝登录')
				}
				this.$tm.toast(`点击了：${e.index},数据为：${JSON.stringify(e.data)}`)
			},
			iconClick(e){
				console.log(5);
			},
			// 注册
			signUp() {
				uni.navigateTo({
					url: '/pages/Register/Register'
				})
			},

			// 忘记密码
			forget() {
				uni.navigateTo({
					url: '/pages/Forget/Forget'
				})
			},

			// 关闭
			close() {
				this.phone = ""
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 0 60rpx;

		.head {
			display: flex;
			justify-content: center;
			flex-direction: column;
			height: 50rpx;
			color: #555555;
			margin-top: 99rpx;
			text {
				margin-top: 5rpx;
				line-height: 60rpx;
				font-size: 60rpx;
				font-weight: bold;
			}
		}

		.form-box {
			padding-top: 100rpx;
			.row-input {
				display: flex;
				flex-direction: column;
				border-bottom: 1rpx solid #e2e3eb;
			}

			.tip {
				height: 40rpx;
				padding-top: 30rpx;
				font-size: 32rpx;
				color: #e2e3eb;
			}

			.input-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 600rpx;
				height: 100rpx;
				color: #8c8c8c;
				font-size: 40rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				.placeholder {
					color: #eaeaea;
					font-size: 35rpx;
				}
			}

			.login-btn {
				margin-top: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;
				color: #FFFFFF;
				border-radius: 50rpx;
				font-size: 35rpx;
				background: linear-gradient(to right, #009688, #26A69A);

			}
			.login-type {
				
				margin-top: 100rpx;
				margin-left: 18%;
				justify-content: center;
				align-items: center;
				align-content:center;
				height: 100rpx;
				
				
			}
		}

		.menu-link {
			position: fixed;
			width: 750rpx;
			left: 0;
			bottom: 50rpx;
			display: flex;
			justify-content: center;
			font-size: 26rpx;
			color: #8c8c8c;
			font-weight: bold;

			text {
				margin-left: 20rpx;
				color: #555555;
			}
		}
	}
</style>

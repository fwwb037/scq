<template>
	<view class="content">
		<view class="head">
			<text style="margin-top: 70rpx;">您好：{{$store.state.phoneNumber}}</text>
		</view>
		<view class="form-box">
			
			
			
				<view class="row-input">
					<text class="tip">{{personInfo.username!=''?'username':''}}</text>
					<view class="input-box">
						<input v-model="personInfo.username" maxlength="11" placeholder="用户名" placeholder-class="placeholder" />
					</view>
				</view>
				
				<view class="row-input">
					<text class="tip">{{personInfo.password!=''?'password':''}}</text>
					<view class="input-box">
						<input v-model="personInfo.password" maxlength="18" placeholder="密码" password
							placeholder-class="placeholder" />
					</view>
				</view>
				
				<view class="row-input">
					<text class="tip">{{personInfo.sex!=''?'sex':''}}</text>
					<view class="input-box">
						<input v-model="personInfo.sex" maxlength="11" placeholder="性别" placeholder-class="placeholder" />
					</view>
				</view>
				
				
				<view class="row-input">
					<text class="tip">{{personInfo.email!=''?'email':''}}</text>
					<view class="input-box">
						<input v-model="personInfo.email" maxlength="11" placeholder="邮箱" placeholder-class="placeholder" />
					</view>
				</view>
				<view class="row-input">
					<text class="tip">{{age!=''?'age':''}}</text>
					<view class="input-box">
						<input v-model="age" maxlength="11" placeholder="年龄" placeholder-class="placeholder" />
					</view>
				</view>
			
					
			
			
			<view class="login-btn" @click="RegisterDetail">
				Sing up
			</view>
		</view>
		<view class="menu-link">Have an account?<text @click="signIn">注册</text></view>
	</view>
</template>

<script>
	import tmFullView from "@/tm-vuetify/components/tm-fullView/tm-fullView.vue"
	import tmMenubars from "@/tm-vuetify/components/tm-menubars/tm-menubars.vue"
	import tmSheet from "@/tm-vuetify/components/tm-sheet/tm-sheet.vue"
	import tmButton from "@/tm-vuetify/components/tm-button/tm-button.vue"
	import tmGrouplist from "@/tm-vuetify/components/tm-grouplist/tm-grouplist.vue"
	import tmListitem from "@/tm-vuetify/components/tm-listitem/tm-listitem.vue"
	import tmGroupradio from "@/tm-vuetify/components/tm-groupradio/tm-groupradio.vue"
	import tmRadio from "@/tm-vuetify/components/tm-radio/tm-radio.vue"
	import Request from '@/utils/luch-request/index.js' // 下载的插件
	// import Request from 'luch-request' // 使用npm
	
	const http = new Request();
	export default {
		components:{tmFullView,tmMenubars,tmSheet,tmButton,tmGrouplist,tmListitem,tmGroupradio,tmRadio},
		data() {
			return {
				personInfo:{
				phone: "",
				code: "",
				username:"",
				password: "",
				sex:"",
				headImg:"myicon-haoyourenzheng",
				email:"",
				ageGroup:""
				},
				age:21,
				groupchecked: {
					c_1: false,
					c_2: false,
					c_3: false,
				}
			}
		},
		onLoad(){
			this.personInfo.phone=this.$store.state.phoneNumber
			this.personInfo.code=this.$store.state.code
		},
		watch:{
			age(n,o){
				if(n<=28){this.personInfo.ageGroup="青年"}
				if(n>28&&n<56){this.personInfo.ageGroup="中年"}
				if(n>=56){this.personInfo.ageGroup="老年"}
			}
		},
		methods: {
			pickAgeGroup(e){
				console.log(e)
				if(this.groupchecked.c_1===true)this.personInfo.ageGroup="青年"
				if(this.groupchecked.c_2===true)this.personInfo.ageGroup="中年"
				if(this.groupchecked.c_3===true)this.personInfo.ageGroup="老年"
				
			},
		
			RegisterDetail(){
				console.log(this.personInfo)
				http.post('/common/register', this.personInfo, {}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				}),
				uni.navigateTo({
					url: '/pages/Login/Login'
				})
			},
			// 登录
			signIn() {
				uni.navigateTo({
					url: '/pages/Login/Login'
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
			height: 250rpx;
			color: #555555;

			text {
				line-height: 60rpx;
				font-size: 40rpx;
				font-weight: bold;
			}
		}

		.form-box {
			padding-top: 10rpx;

			.row-input {
				display: flex;
				flex-direction: column;
				border-bottom: 1rpx solid #e2e3eb;
			}

			.row-input2 {
				width: 100%;
				display: flex;
				flex-direction: column;

				.input-box {
					width: 100%;

					input {
						width: 60%;
						padding: 28rpx 0rpx;
						border-bottom: 2rpx solid #e2e3eb;
					}

					.code {
						width: 40%;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 35rpx;
						height: 100rpx;
						border-radius: 50rpx;
						color: #FFFFFF;
						background: linear-gradient(to right, #5633e3, #6368ea);
						box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(98, 92, 236, 0.4);
					}
				}
			}

			.placeholder {
				color: #8c8c8c;
				font-size: 35rpx;
			}

			.tip {
				height: 40rpx;
				padding-top: 30rpx;
				font-size: 30rpx;
				color: #555555;
			}

			.input-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 600rpx;
				height: 60rpx;
				color: #8c8c8c;
				font-size: 40rpx;

				image {
					width: 40rpx;
					height: 40rpx;
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

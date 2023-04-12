<template>

	<tm-fullView>
		<tm-sheet style="flex: auto; height: 1130rpx;">

			<text style="font-size: 50rpx;font-weight: 600;">类别管理</text>
			<view style="margin-left: 30rpx; margin-right: 30rpx;margin-top: 50rpx;">
				<tm-dragGrid :disabled="disabledGrid" :list="typeList">
					<template v-slot:default="{item}">
						<view class="flex-center flex-col" style="width:70%">
							<tm-badges @click="delitem(item)" v-if="!disabledGrid" :offset="[0,-5]"
								icon="icon-times"></tm-badges>
							<tm-icons :size="45" :name="item.typeIcon"></tm-icons>
							<text class="text-size-s pt-10">{{item.typeName}}</text>
						</view>
					</template>
				</tm-dragGrid>
			</view>

			<view style=" position: absolute; bottom: 80rpx;margin-left: 10rpx;">

				<tm-button block @click="disabledGrid=!disabledGrid" width="600rpx">编辑类型</tm-button>


				<tm-button block @click="ooo" width="600rpx" style="margin-top: 10rpx;">添加类型</tm-button>



			</view>


		</tm-sheet>




		<tm-poup v-model="show_poup" :position="pos" :height="1000">
			<tm-sheet>

				<tm-input title="类别名称" v-model="typeName"></tm-input>
				<text style="margin-top:30rpx ;margin-left: 30rpx;font-size: 14px;">类别图标</text>

				<tm-dragGrid :disabled="disabledGrid" :list="new_typeList" style="margin-top: 50rpx;"
					:item-height="150">
					<template v-slot:default="{item}">
						<view class="flex-center flex-col" style="width:70% margin-top:50rpx">
							<tm-badges v-if="item.pick" :offset="[0,-5]" icon="icon-plus"></tm-badges>
							<tm-icons :name="item.typeIcon" :size="65" @click="pickType(item)"></tm-icons>
						</view>
					</template>
				</tm-dragGrid>

				<tm-button @click="addtype">提交数据</tm-button>

			</tm-sheet>

		</tm-poup>
	</tm-fullView>
</template>

<script>
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
		},
		data() {
			return {
				show_poup: false,
				pos: 'bottom',

				typeName: '',
				typeIcon: '',

				show_1: false,


				disabledGrid: true,
				typeList: [],
				new_typeList: [
					{ typeIcon: 'icon-douyin', pick: false },
					{ typeIcon: "icon-transanction", ick: false },
					{ typeIcon: "icon-phone-fill", pick: false },
					{ typeIcon: "icon-print", pick: false },
					{ typeIcon: "icon-gem", pick: false },
					{ typeIcon: "icon-gift", pick: false },
				],
			};
		},
		onLoad() {

			http.get('/youngster/getTypeList', {}).then(res => {
				console.log(res)
				this.typeList = res.data.data

			}).catch(err => {

			})
		},
		methods: {
			addtype() {
				console.log(this.typeName)
				console.log(this.typeIcon)
				http.post('/youngster/addConsumeType', {
					"typeName": this.typeName,
					"typeIcon": this.typeIcon
				}, {}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			ooo(e) {
				console.log(e)
				console.log("0000")
				this.show_poup = true
				console.log(this.show_poup)
			},
			add() {
				this.show_poup = true
			},
			delitem(item) {
				console.log(item.typeId)
				http.put('/youngster/deleteConsumeType', {
					"typeId": item.typeId,
				}, {}).then(res => {

				}).catch(err => {
					console.log(err)
				})
				http.get('/youngster/getTypeList', {}).then(res => {
					console.log(res)
					this.typeList = res.data.data

				}).catch(err => {

				})
			},


			//当前使用自动验证提交数据到服务器时，提交后，会触发此request事件，下面 的e是服务器返回的数据。
			success(e) {
				//提交成功 。
				uni.$tm.toast(e.msg)
			},
			pickType(item) {
				console.log(item.pick)
				item.pick = !item.pick
				var picknum = 0
				for (var i = 0; i < this.new_typeList.length; i++) {
					if (this.new_typeList[i].pick === true) {
						picknum = picknum + 1
					}
				}
				if (picknum > 1) {
					for (var i = 0; i < this.new_typeList.length; i++) {
						if (this.new_typeList[i].pick === true && this.new_typeList[i].typeIcon !== item.typeIcon) {
							this.new_typeList[i].pick = false
						}
					}
				}




				for (var i = 0; i < this.new_typeList.length; i++) {

					if (this.new_typeList[i].pick === true) {
						this.typeIcon = this.new_typeList[i].typeIcon
					}

				}
				console.log(this.typeIcon)
				this.submitType = this.typeIcon
			},
		},
	};

</script>


<style lang="scss">

</style>


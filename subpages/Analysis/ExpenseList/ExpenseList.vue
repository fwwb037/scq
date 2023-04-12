<template>
	<tm-fullView :class="[$tm.vx.state().tmVuetify.color]">
		
		
		<template v-slot:default="{info}">
			<view class="grey text " :class="[$tm.vx.state().tmVuetify.color]" :style="{minHeight:info.height+'px'}">
				<view style="z-index: 30;">
					<tm-dropDownMenu :unColor="!$tm.vx.state().tmVuetify.black?'black':'whtie'" @confirm="confirm"
						:list="list2"></tm-dropDownMenu>
				</view>
				<view style="width: 100rpx;"></view>
				<view>
					<tm-grouplist ref="listitem" title="账单列表" :title-theme="[$tm.vx.state().tmVuetify.color]"
						:shadow="6" :round="10" :padding="[42, 42]" style="margin-top: 0.5rem">
						<tm-listitem group v-for="(item, index) in indexlen" :key="index" :title="item.outcomeName"
							:label="item.type" :value="item.outcome ">
							<!-- <text>{{item.outcomeName}}</text> -->
							<template v-slot:group>
								<tm-sheet :margin="[0, 0]" :shadow="0" :class="[$tm.vx.state().tmVuetify.color]">
									<view>{{item.outcomeName}}</view>
								</tm-sheet>
							</template>
						</tm-listitem>
					</tm-grouplist>
				</view>


			</view>
		</template>
		<tm-bottomnavigation :icon-color="[$tm.vx.state().tmVuetify.color]" :list="list_1"></tm-bottomnavigation>
	</tm-fullView>

</template>

<script>
	import tmPickersDate from '@/tm-vuetify/components/tm-pickersDate/tm-pickersDate.vue';
	import tmDropDownMenu from "@/tm-vuetify/components/tm-dropDownMenu/tm-dropDownMenu.vue"
	import tmFullView from "@/tm-vuetify/components/tm-fullView/tm-fullView.vue"
	import tmMenubars from "@/tm-vuetify/components/tm-menubars/tm-menubars.vue"
	import tmSheet from "@/tm-vuetify/components/tm-sheet/tm-sheet.vue"
	import tmGrid from "@/tm-vuetify/components/tm-grid/tm-grid.vue"
	import Request from '@/utils/luch-request/index.js' // 下载的插件

	// import Request from 'luch-request' // 使用npm

	const http = new Request();
	export default {
		components: { tmFullView, tmMenubars, tmSheet, tmGrid, tmDropDownMenu,tmPickersDate },
		data() {
			return {
				list_1: [{
						iconSize: 46,
						icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/elf-freebie-icon.png',
						value: '添加',
						path: '/pages/youngster/Add/Add'
					},
					{
						iconSize: 46,
						icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/house-snowglobe-freebie-icon.png',
						value: '分析',
						path: '/pages/youngster/Analysis/Analysis'
					},
					{
						iconSize: 46,
						icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/gift-freebie-icon.png',
						value: '标题'
					},
					{
						iconSize: 46,
						icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/christmas-tree-freebie-icon.png',
						value: '管理',
						path: '/pages/youngster/Manage/Manage'
					},
					{
						iconSize: 46,
						icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/tree-freebie-icon.png',
						value: '我',
						path: '/pages/youngster/Me/Me'
					}
				],
				show: false,
				indexlen: [],
				themecolor: this.$tm.vx.state().tmVuetify.color,

				selected: ['1-2', '1-4', '2-4'],
				list2: [{
						title: '排序',
						children: [{
								title: "默认排序",
								model: "checkbox",
								name: "desc",
								children: [{
										title: "时间正序",
										id: '1-1'
									},
									{
										title: "时间倒叙",
										id: '1-2'
									},
									{
										title: "金额正序",
										id: '1-3'
									},
									{
										title: "金额倒叙",
										id: '1-4'
									}
								]
							},
							
						]
					}, {
						title: '类别',
						children: [{
							title: "选择类别",
							name: "priceDesc",
							model: "checkbox",
							children: [{
									title: "1",
									id: '3-1'
								},
								{
									title: "2",
									id: '3-2'
								},
								{
									title: "3",
									id: '3-3'
								}
							]
						}]
					},
					{
						title: '金额',
						children: [{
								title: '明确金额',
								model: "input",
								name: "baner",
								type: "number",
								value: ""
							},
							{
								title: '金额区间',
								name: "customPrice",
								model: "slider",
								suffix: '元',
								max: 1000,
								value: 0
							},
							{
								title: "区间排序",
								model: "checkbox",
								name: "banerDesc",
								children: [{
										title: "金额排序",
										id: '4-1'
									},
									{
										title: "时间排序",
										id: '4-2'
									},
									{
										title: "频次排序",
										id: '4-3'
									}
								]
							}
						]
					}
				],
				

			}
		},
		onLoad() {
			console.log('11111')
			http.get('/youngster/getRecentOutcomes', {}).then(res => {
				console.log(res)
				this.indexlen = res.data.data.bills


			}).catch(err => {

			})
		},

		methods: {

			confirm(e){
				console.log('您选中了的数据为：',e);
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
			}
		}
	}

</script>

<style>

</style>


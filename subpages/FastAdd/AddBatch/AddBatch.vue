<template>
	<view>
		<tm-sheet style="height: 250rpx;"  @click="addbyimg">
			<tm-row style="margin-top:65rpx">
				<tm-col :grid="12">
					<tm-icons name="icon-picture" size="80" color="black"></tm-icons><br/>

				</tm-col>
			</tm-row>
			<tm-row style="margin-top:15rpx">
				<tm-col :grid="12">
					
					<text style="margin-top:20rpx">批量上传照片</text>
				</tm-col>
			</tm-row>
			
		</tm-sheet>
		<tm-sheet style="height: 250rpx;"  @click="addbyfile">
			<tm-row style="margin-top:65rpx">
				<tm-col :grid="12">
					<tm-icons name="icon-folder-plus" size="80" color="black"></tm-icons><br/>

				</tm-col>
			</tm-row>
			<tm-row style="margin-top:15rpx">
				<tm-col :grid="12">
					
					<text style="margin-top:20rpx">账单文件导入</text>
				</tm-col>
			</tm-row>
			
		</tm-sheet>
		
	</view>
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
				
			}
		},
		methods: {
			addbyimg(){
				uni.navigateTo({
					url: '/subpages/FastAdd/AddByImage/AddByImage'
				})
			},
			addbyfile(){
				uni.navigateTo({
					url: '/subpages/FastAdd/AddByFile/AddByFile'
				})
			},
		}
	}
</script>

<style>

</style>

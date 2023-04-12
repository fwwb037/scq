<template>
	<tm-fullView>
		<tm-menubars title="基础容器" color="bg-gradient-primary-lighten" :showback="true"></tm-menubars>
		<tm-sheet color="blue text" :shadow="24">
			
			<view class="text-size-s text-weight-b mb-24" style="font-size: 40rpx;" @click="gotoFamily">
				家庭
			</view>
			
		</tm-sheet>
	
		<tm-sheet :black="false" color="bg-gradient-orange-accent">
			<view class="text-size-s text-weight-b mb-24" style="font-size: 40rpx;" @click="gotoFriend"> 
				好友
			</view>
		</tm-sheet>
		
	</tm-fullView>

</template>

<script>
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
		},
		data() {
			return {
				
			}
		},
		methods: {
			gotoFamily(){
				uni.navigateTo({
					url: '/subpages/Family/FamilyIndex/FamilyIndex'
				})
			},
			gotoFriend(){
				uni.navigateTo({
					url: '/subpages/Friend/FriendIndex/FriendIndex'
				})
			}
		}
	}
</script>

<style>

</style>

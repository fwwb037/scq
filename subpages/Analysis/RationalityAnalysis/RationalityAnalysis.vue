<template>
	<tm-fullView >
		
			<view class="text-size-s text-weight-b mb-24">合理性分析</view>
		
			<tm-bottomnavigation :icon-color="[$tm.vx.state().tmVuetify.color]" :list="list_1"></tm-bottomnavigation>

		
		
	</tm-fullView>

</template>

<script>
	import tmFullView from "@/tm-vuetify/components/tm-fullView/tm-fullView.vue"
	import tmMenubars from "@/tm-vuetify/components/tm-menubars/tm-menubars.vue"
	import tmSheet from "@/tm-vuetify/components/tm-sheet/tm-sheet.vue"
	import tmGrid from "@/tm-vuetify/components/tm-grid/tm-grid.vue"
	export default {
		components:{tmFullView,tmMenubars,tmSheet,tmGrid},
		data() {
			return {
				list_1: [
					{ iconSize: 46, icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/elf-freebie-icon.png',
						value: '添加', path: '/pages/youngster/Add/Add' },
					{ iconSize: 46,
						icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/house-snowglobe-freebie-icon.png',
						value: '分析', path: '/pages/youngster/Analysis/Analysis' },
					{ iconSize: 46,
						icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/gift-freebie-icon.png',
						value: '标题' },
					{ iconSize: 46,
						icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/christmas-tree-freebie-icon.png',
						value: '管理', path: '/pages/youngster/Manage/Manage' },
					{ iconSize: 46,
						icon: 'https://cdn.roundicons.com/wp-content/uploads/2016/12/tree-freebie-icon.png',
						value: '我', path: '/pages/youngster/Me/Me' }
				],
				show:false,
				
			}
		},
		methods: {
			
			
			openurl(e){
				let t = this;
				console.log(e);
				console.log(e.data.url)
				uni.navigateTo({
					url:e.data.url,
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

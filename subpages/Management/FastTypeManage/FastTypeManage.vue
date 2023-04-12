<template>
	<tm-full-view>
		<tm-sheet>
			<text>自定义智能分类</text>
		</tm-sheet>
		<tm-sheet>
			<tm-switchList v-for="(item,index) in fastType" :key="index"
			color="white"
			:icon="item.typeIcon" :title="item.detailName" 
			:label="item.typeName" :actions="item_2"></tm-switchList>
		</tm-sheet>
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
				fastType:[
					{detailName:"麦当劳",typeName:"餐饮支出",typeIcon:"myicon-fukuan"},
					{detailName:"网易云音乐自动续费",typeName:"社会娱乐支出",typeIcon:"myicon-fukuan"}
				],
				list_2
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>

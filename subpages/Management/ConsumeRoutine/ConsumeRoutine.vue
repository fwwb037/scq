<template>

	<tm-fullView>

		<tm-sheet class="shadow-24 ma-32 round-4 overflow "
			:class="$tm.vx.state().tmVuetify.black ? 'grey-darken-5' : 'white'" style="height: 1150rpx;">
			
			<view class="text-size-s text-weight-b ma-32">我的固定消费路线</view>
			<view style="margin-left: 30rpx;margin-right: 30rpx;">
				<tm-dragGrid :disabled="disabledGrid" :list="my_routine_list" :width=570 :col="5">
				<template v-slot:default="{item}">
					<view class="flex-center flex-col" >
						<tm-badges @click="del_my_routine(item)" v-if="!disabledGrid" :offset="[0,-5]"
							icon="icon-times"></tm-badges>
						<tm-icons :size="50" :name="item.routineIcon" @click="ConsumeRoutineDetail(item)"></tm-icons>
						<text style="font-size: 15rpx;">{{item.routineName}}</text>
					</view>
				</template>
			</tm-dragGrid>
			</view>
			
			<view class="pa-32" style="position: absolute;bottom: 60rpx;width: 560rpx;">
				<tm-button th block @click="disabledGrid=!disabledGrid">编辑路线</tm-button>
				<tm-button th block @click="addConsumeRoutine" style="margin-top: 20rpx;">添加路线</tm-button>
			</view>
		</tm-sheet>




		<tm-poup v-model="show_myConsume_detail" :position="pos" :height="1000">
			<tm-sheet style="height: 700rpx;">
				<view>
					
					<tm-dragList @change="my_consumelist_change" :list="my_routine_detail_list_show"></tm-dragList>
				</view>
				
			</tm-sheet>
			<view style="position: absolute;bottom: 60rpx;width:600rpx;">
				<tm-button block @click="add_consumelist_node" style="margin-left:100rpx" width="560">添加消费节点</tm-button>
				<tm-button block @click="confirm_add_my_consumelist" style="margin-left:100rpx;margin-top: 20rpx;" width="560">提交修改</tm-button>
				
			</view>
		</tm-poup>
		
		
		<tm-poup v-model="show_add_routine" :position="pos" :height="1100">
			<view>
				
					<tm-sheet style="margin-top: 30rpx;">
						<tm-input name="routineName"  title="名称" v-model="new_routine_list.routineName"></tm-input>
							<text style="font-size: 28rpx; margin-top: 30rpx;margin-left: 30rpx;">图标</text>
							<tm-dragGrid :disabled="disabledGrid" :list="iconList"	style="margin-top: 30rpx;" >
							<template v-slot:default="{item}">
								<view class="flex-center flex-col">
									<tm-icons :size="45" :name="item.typeIcon" @click="pickRoutineType(item)"></tm-icons>
									<text class="text-size-s pt-10">{{item.typeName}}</text>
								</view>
							</template>
						</tm-dragGrid>
					</tm-sheet>
					
					<tm-sheet>
						
						
							<tm-row>
								<tm-col :grid="12">
									<tm-button  @click="add_consumelist_node_new" style="width: 300rpx;height: 30rpx;">添加消费节点</tm-button>
								</tm-col>
							</tm-row>
					
							<tm-row style="margin-top: 70rpx;">
								<tm-col :grid="12">
									<tm-dragList @change="my_consumelist_change" :list="new_routine_detail_list_show"></tm-dragList>
								</tm-col>
							</tm-row>
						
					</tm-sheet>
					<view class="pa-32" style="position: absolute;bottom: 60rpx;width: 560rpx;">
						<tm-button style="margin-left: 70rpx;"  @click="confirm_add_new_consumelist" block width="540">提交数据</tm-button>
					</view>
					
					
				
			</view>
		
		</tm-poup>
		
		
		<tm-poup v-model="show_add_node" :position="pos" :height="800">
			
				
					<tm-input name="routineDetailName" required title="消费名称" v-model="nodeData.routineDetailName"></tm-input>
					<view style="margin-left: 50rpx;margin-right: 50rpx;">
						<tm-dragGrid :disabled="disabledGrid" :list="typeList">
							<template v-slot:default="{item}">
								<view class="flex-center flex-col" style="width:70%">
									<tm-icons :size="45" :name="item.typeIcon" @click="pickNodeType(item)"></tm-icons>
									<text class="text-size-s pt-10">{{item.typeName}}</text>
								</view>
							</template>
						</tm-dragGrid>
					</view>
						
					
						
					<tm-input name="routineDetailCost" required title="消费金额" v-model="nodeData.routineDetailCost"></tm-input>
					<tm-row style="position: absolute;bottom:0">
						<tm-col :grid="12">
							<tm-button @click="addConsumeNode">提交数据</tm-button>
						</tm-col>
					</tm-row>
					
			
			
		
		</tm-poup>
		
		
		<tm-poup v-model="show_add_node_new" :position="pos" :height="800">
			
				
					<tm-input name="routineDetailName" required title="消费名称" v-model="nodeData.routineDetailName"></tm-input>
					<tm-sheet>
						<tm-dragGrid :disabled="disabledGrid" :list="typeList">
							<template v-slot:default="{item}">
								<view class="flex-center flex-col" style="width:70%">
									<tm-icons :size="45" :name="item.typeIcon" @click="pickNodeType(item)"></tm-icons>
									<text class="text-size-s pt-10">{{item.typeName}}</text>
								</view>
							</template>
						</tm-dragGrid>
					
					</tm-sheet>
						
					<tm-input name="routineDetailCost" required title="消费金额" v-model="nodeData.routineDetailCost"></tm-input>
					
					<tm-row >
						<tm-col :grid="12">
							<tm-button @click="addConsumeNode_new">提交数据</tm-button>
						</tm-col>
					</tm-row>
				
			
		
		</tm-poup>
		
		
<!-- 		<tm-poup v-model="show_add_node" :position="pos" :height="1000">
			<tm-sheet>
				<view>
					<tm-sheet>{{routine_list}}</tm-sheet>
					<tm-dragList @change="listChange" :list="routine_list"></tm-dragList>
				</view>
				<view class="ma-32">
					<tm-button block @click="addConsumeDetail">添加数据</tm-button>
				</view>
			</tm-sheet>
		
		</tm-poup> -->
		
		
		
		
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
				iconList:[
					{typeIcon:"myicon-fukuan",typeName:"myicon-fukuan"},
				
					
				],
				
				my_routine_list: [],
				my_routine_detail_list: [],
				my_routine_detail_list_show:[],
				new_routine_detail_list: [],
				new_routine_detail_list_show:[],
					
				show_add_routine:false,
				show_add_node: false,
				show_add_node_new:false,
				show_myConsume_detail: false,
			
				nodeData: {
					routineDetailTypeIcon:'',
					routineDetailName: '',
					routineDetailTypeId: 0,
					routineDetailCost: 0,
				},


				routine_list: {
					routineId:0,
					routineName:'',
					routineItem:[]
				},
				
				new_routine_list:{
					routineName:"",
					routineIcon:'',
					routineItem:[]
				},

				


				
				consumeDetail: {
					routineDetailName: '',
					routineDetailTypeId: 0,
					routineDetailCost: 0,
				},
				show_poup: false,
				show_detail: false,
				pos: 'bottom',
				reqData: {
					typeName: '',
					typeIcon: ''
				},
				show_1: false,
				crDetail: [],

				routine_list_show: [],

				list: [],
				f_list: [],
				disabledGrid: true,
				typeList: [],

			};
		},
		onLoad() {
			
			http.get('/youngster/getConsumeRoutineList', {header:{token:this.$store.state.token}}).then(res => {
				console.log("getConsumeRoutineList")
				console.log(res)
				this.my_routine_list = res.data.data

			}).catch(err => {

			}),
			
			http.get('/youngster/getTypeList', {header:{token:this.$store.state.token}}).then(res => {
				console.log("getTypeList")
				console.log(res)
				this.typeList = res.data.data
			
			}).catch(err => {
			
			})
		},
		methods: {
			ConsumeRoutineDetail(e) {
				console.log(e)
				this.routine_list.routineId=e.routineId
				this.routine_list.routineName=e.routineName
				this.show_myConsume_detail = true
				http.get('/youngster/getConsumeRoutineDetail', {
					params: {
						routineId: e.routineId,
					},
					header:{token:this.$store.state.token}
				}).then(res => {
					console.log(res)
					this.my_routine_detail_list=res.data.data.routineDetail
					
					const c = this.my_routine_detail_list;
					const cl = c.length
					this.my_routine_detail_list_show=[]
					for (var i = 0; i < cl; i++) {
						console.log(i)
						this.my_routine_detail_list_show.push({
							icon: c[i].routineDetailTypeIcon,
							text: c[i].routineDetailName,
							cost: c[i].routineDetailCost,
						})
					}
				}).catch(err => {
				})
			},
			
			
			add_consumelist_node() {
				this.show_add_node=true
			},
			
			add_consumelist_node_new(){
				this.show_add_node_new=true
			},
			pickNodeType(t) {
				this.nodeData.routineDetailTypeId=t.typeId
				this.nodeData.routineDetailTypeIcon=t.typeIcon
			},
			
			addConsumeNode(){
				console.log(this.nodeData)
				this.my_routine_detail_list.push(this.nodeData)
				this.my_routine_detail_list_show.push({
					icon: this.nodeData.routineDetailTypeIcon,
					text: this.nodeData.routineDetailName,
					cost: this.nodeData.routineDetailCost,
				})
				this.show_add_node=false
				const c = this.my_routine_detail_list_show;
				const cl = c.length
				for (var i = 0; i < cl; i++) {
					console.log(i)
					this.routine_list.routineItem.push({
						routineDetailTypeIcon: c[i].icon,
						routineDetailName: c[i].text,
						routineDetailCost: c[i].cost,
					})
				}
			},
			
			addConsumeNode_new(){
				console.log(this.nodeData)
				this.new_routine_detail_list.push(this.nodeData)
				this.new_routine_detail_list_show.push({
					icon: this.nodeData.routineDetailTypeIcon,
					text: this.nodeData.routineDetailName,
					cost: this.nodeData.routineDetailCost,
				})
				this.show_add_node_new=false
				const c = this.new_routine_detail_list_show;
				const cl = c.length
				for (var i = 0; i < cl; i++) {
					console.log(i)
					this.new_routine_list.routineItem.push({
						routineDetailTypeIcon: c[i].icon,
						routineDetailName: c[i].text,
						routineDetailCost: c[i].cost,
					})
				}
			},
			
			confirm_add_my_consumelist(){
				console.log(this.routine_list)
				http.put('/youngster/updateConsumeRoutine', this.routine_list, {header:{token:this.$store.state.token}}).then(res => {
				
				}).catch(err => {
					console.log(err)
				}), 
				http.get('/youngster/getConsumeRoutineList', {header:{token:this.$store.state.token}}).then(res => {
					console.log("getConsumeRoutineList")
					console.log(res)
					this.my_routine_list = res.data.data
				
				}).catch(err => {
				
				}),
				this.show_myConsume_detail=false
				
			},
			confirm_add_new_consumelist(){
				console.log(this.new_routine_list)
				http.post('/youngster/addConsumeRoutine', this.new_routine_list, {header:{token:this.$store.state.token}}).then(res => {
				
				}).catch(err => {
					console.log(err)
				}),
				http.get('/youngster/getConsumeRoutineList', {header:{token:this.$store.state.token}}).then(res => {
					console.log("getConsumeRoutineList")
					console.log(res)
					this.my_routine_list = res.data.data
				
				}).catch(err => {
				
				}),
				this.show_add_routine=false
			},
			
			addConsumeRoutine() {
				this.show_add_routine = true
			},
			
			pickRoutineType(t) {
				this.new_routine_list.routineIcon=t.typeIcon
			},
			
			
			
			
			
			
			
			
			
			
			my_consumelist_change(list) {

				// this.list = [...list];
			},
			
			
			del_my_routine(item) {
				console.log(item.routineId)
				http.put('/youngster/deleteConsumeRoutine', {
					"routineId": item.routineId,
				}, {header:{token:this.$store.state.token}}).then(res => {

				}).catch(err => {
					console.log(err)
				})
				http.get('/youngster/getConsumeRoutineList', {header:{token:this.$store.state.token}}).then(res => {
					console.log(res)
					this.my_routine_list = res.data.data

				}).catch(err => {

				})
			},


			

		},
	};

</script>


<style lang="scss">

</style>


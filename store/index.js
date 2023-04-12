import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	// 属性值
	state: {
		qny_token:"NW8p33-Rgps_UEY9A_XXcfOmx4AYYYPbpTd-jGWD:mwSEItsh_xJLhpDN7NpQbsvdRxo=:eyJzY29wZSI6ImZ3d2IwMzciLCJkZWFkbGluZSI6MTY4MTIzMDkxMH0=",
		username:'xiaosun',
		token:'fake_token',
		phoneNumber:'fake_phoneNumber',
		code:'fake_code',
		nowTime:"2023-04-08",
		beforeThreeMon:"fake_beforeThreeMon",
		lastMon_begin:"2023-03-01",
		lastMon_end:"2023-03-31",
		lastWeek:"2023-04-02",
		thisMonth_begin:"2023-04-01",
		thisMonth_end:"2023-04-31",
		photoName:"",
	},
	// 对外方问state属性内容
	getters: {
	
	},
	// Mutation 必须是同步函数
	// 更改state属性内容
	// 使用：this.$store.commit("setUserInfo",{  });
	mutations: {
		SET_PhotoName(state,value){
			state.photoName=value
		},
		SET_TOKEN(state,value){
			state.token=value
		},
		SET_PHONENUMBER(state,value){
			state.phoneNumber=value
		},
		SET_CODE(state,value){
			state.code=value
		},
		SET_thisMonth_begin(state,value){
			state.thisMonth_begin=value
		},
		SET_thisMonth_end(state,value){
			state.thisMonth_end=value
		},
		SET_nowTime(state,value){
			state.nowTime=value
		},
		SET_beforeThreeMon(state,value){
			state.beforeThreeMon=value
		},
		SET_lastMon_begin(state,value){
			state.lastMon_begin=value
		},
		SET_lastMon_end(state,value){
			state.lastMon_end=value
		},
		SET_lastWeek(state,value){
			state.lastWeek=value
		},
		
	},
	// Action 可以包含任意异步操作
	// 通过 context.commit 可以方问mutations方法
	// 也可以获得getters内容
	// 通过 this.$store.dispatch("getUser") 来取得内容
	actions: {
		set_photoName(context,value){
			console.log(context,value)
			context.commit("SET_PhotoName",value)
		},
		set_thisMonth_end(context,value){
			console.log(context,value)
			context.commit("SET_thisMonth_end",value)
		},
		set_thisMonth_begin(context,value){
			console.log(context,value)
			context.commit("SET_thisMonth_begin",value)
		},
		set_nowTime(context,value){
			console.log(context,value)
			context.commit("SET_nowTime",value)
		},
		set_beforeThreeMon(context,value){
			console.log(context,value)
			context.commit("SET_beforeThreeMon",value)
		},
		set_lastMon_begin(context,value){
			console.log(context,value)
			context.commit("SET_lastMon_begin",value)
		},
		set_lastMon_end(context,value){
			console.log(context,value)
			context.commit("SET_lastMon_end",value)
		},
		set_lastWeek(context,value){
			console.log(context,value)
			console.log("SET_lastWeek",value)
			context.commit("SET_lastWeek",value)
		},
		
		set_token(context,value){
			console.log(context,value)
			context.commit('SET_TOKEN',value)
		},
		set_phoneNumber(context,value){
			console.log(context,value)
			context.commit('SET_PHONENUMBER',value)
		},
		set_code(context,value){
			console.log(context,value)
			context.commit('SET_CODE',value)
		}
	}
})

export default store


<script>
	
	/*每个页面公共css */
	import 'common/fui-app.css';
	import 'components/firstui/fui-theme/fui-theme.css';

	export default {
		
		onLaunch: function() {
			uni.hideTabBar()
			console.log('App Launch')
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onPageNotFound() {
			uni.navigateTo({
				url:'pages/404/404'
			})
		}
	}
</script>

<style lang='scss'>
	
	@font-face {
	    font-family: my-font;
	    src: url('~@/static/lst.ttf');
	}
	
	@import "@/uni_modules/uview-ui/index.scss";
	
	/*每个页面公共css */
	@import "./tm-vuetify/mian.min.css";
	@import "./tm-vuetify/scss/theme.css";
	@import "./static/iconfont.css"
</style>

import request from "./request.js";
// 全局配置的请求域名
let baseUrl = "http://sunshine.createnetwork.cn/api/";
//可以new多个request来支持多个域名请求
let $http = new request({
	//接口请求地址
	baseUrl: baseUrl,
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	header: {
		'content-type': 'application/json;charset=UTF-8'
	},
	//以下是默认值可不写
	//是否提示--默认提示
	isPrompt: true,
	//  1 请求是否带token 默认带token
	needToken: true,
	//是否显示请求动画
	load: true,
	//是否使用处理数据模板
	isFactory: true
});



//当前接口请求数
let requestNum = 0;
//请求开始拦截器
$http.requestStart = function(options) {
	if (options.load) {
		if (requestNum <= 0) {
			//打开加载动画
			uni.showLoading({
				title: '加载中',   
				mask: true
			});
		}
		requestNum += 1;
	}
	

	if (options.needToken){
		//请求前加入token
			if(options.needToken){
				
			}
			//  这个是异步获取token 应该是同步获取
			// let token =""
			// uni.getStorage({
			//     key: 'Authorization',
			//     success: function (res) {
			//         console.log(res.data,6);
			// 		token = res.data
			//     }
			// });
			 const token = uni.getStorageSync('Authorization');

			if (!token) {
				console.log(token,6);
						if (options.needToken) {
							// uni.reLaunch({	
							// 	//  如果没有token就转跳到登入页面
							// 	url: '../pages/login/logi'
							// });
							// return false;
							uni.showModal({
								title: '温馨提示',
								content: '此时此刻需要您登录喔~',
								confirmText: "去登录",
								cancelText: "再逛会",
								success: res2 => {
									loginPopupNum--;
									if (res2.confirm) {
										uni.navigateTo({
											url: "../../pages/login/login"
										});
									}
								}
							});
						}
					}
				// 请求头中配置token	
			options.header['Authorization'] = 'Bearer ' + token 
			
		}
		return options;
	}
	
//请求结束   响应拦截
$http.requestEnd = function(options, resolve) {
	//判断当前接口是否需要加载动画  
	if (options.load) {
		requestNum = requestNum - 1;
		if (requestNum <= 0) {
			uni.hideLoading();
		}
	}
	if (resolve.errMsg && resolve.statusCode && resolve.statusCode > 300) {
		setTimeout(() => {
			uni.showToast({
				title: "网络错误，请检查一下网络",
				icon: "none"
			});
		}, 500);
	}
	// if()
}
//登录弹窗次数
let loginPopupNum = 0;
//所有接口数据处理（可在接口里设置不调用此方法）
//此方法需要开发者根据各自的接口返回类型修改，以下只是模板
$http.dataFactory = function(res) {
	console.log("接口请求数据", {
		httpUrl: res.url,
		resolve: res.response,
		header: res.header,
		data: res.data,
		method: res.method,
	});
	// 判断接口请求是否成功
	console.log(res.response.statusCode,10);
	if (res.response.statusCode || res.response.statusCode == 200) {
		
		let httpData = res.response.data;
		
		
		console.log(httpData.success);
		//判断数据是否请求成功
		if (res.response.statusCode == 200 || res.response.statusCode == 201) {
			// 返回正确的结果(then接受数据)
			res.resolve(httpData);
			console.log(res.response.statusCode,res.resolve(httpData.data));
			
		} else if (res.response.statusCode == 401  || res.response.statusCode == 403) { 
			// 对401 403的处理
			// 刷新token
			$http.put('authorizations/current').
			then(function (response) {
				//这里只会在接口是成功状态返回
				// 返回成功再次存储 token数据
					 uni.setStorageSync('Authorization', response);
					
					
			}).catch(function (error) {	
				//这里只会在接口是失败状态返回，不需要去处理错误提示
				console.log(error);
			});
			// 返回错误的结果(catch接受数据)
			res.reject(res.response);
		} else { //其他错误提示
			if (res.isPrompt) { //设置可以提示的时候
				setTimeout(function() {
					uni.showToast({
						// title: httpData.info, //提示后台接口抛出的错误信息
						title: httpData.info,
						icon: "none",
						duration: 3000
					});
				}, 500);
			}
			// 返回错误的结果(catch接受数据)
			res.reject(res.response);
		}

		

	} else {
		// 返回错误的结果(catch接受数据)
		res.reject(res.response);
	}
};
export default $http;


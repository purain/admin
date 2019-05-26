class MUtil{
	request(param){
		return new Promise((resolve,reject) => {
			$.ajax({
				type 		: param.type 		|| 'get',
				url 		: param.url 		|| '',
				dataType 	: param.dataType 	|| 'json',
				data 		: param.data 		|| null,
				success 	: res => {
					// 请求成功
					if(0 === res.status){
						typeof resolve === 'function' && resolve(res.data, res.msg);
					}
					// 没有登录状态，强制登录
					else if(10 === res.status){
						this.doLogin();
					}
					else{
						typeof reject === 'function' && reject(res.msg || res.data);
					}
				},
				error 		: err => {
					typeof reject === 'function' && reject(err.statusText);
				}
			});
		});
	}
	// 跳转登录
	doLogin(){
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
	}
	// 获取URL参数
	getUrlParam(name){
		// param1=123&param2=456
		let reg 		= new RegExp("(?:^|&)"+name+"=([^&]*)(?:$|&)"),
		    queryString = window.location.search.split('?')[1] || '',
		    result 		= reg.exec(queryString);
		return result ? decodeURIComponent(result[1]) : null;
	}
	// 错误提示
	errorTips(errMsg){
		alert(errMsg || '好像哪里不对了~')
	}
	// 本地存储
	setLocalStorage(name, data){
		let dataType = typeof data;
		// json对象
		if(dataType === 'object'){
			window.localStorage.setItem(name, JSON.stringify(data));
		}
		// 基本类型
		else if(['number', 'string', 'boolean'].indexOf(dataType)){
			window.localStorage.setItem(name, data);
		}
		// 其他不支持的类型
		else{
			alert('该类型不能用于本地存储');
		}
	}
	// 获得本地存储
	getLocalStorage(name){
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}
		else{
			return '';
		}
	}
	// 删除本地存储
	removeLocalStorage(name){
		window.localStorage.removeItem(name);
	}
}

export default MUtil;
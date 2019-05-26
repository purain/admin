import React from 'react';
import MUtil from 'util/mm.jsx';
import User  from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

import './index.scss';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			redirect: _mm.getUrlParam('redirect') || '/'
		}
	}
	// 改变标题
	componentWillMount(){
		document.title = '登录 — MMall ADMIN'
	}
	// 输入发生改变
	onInputChange(e){
		let inputName = e.target.name,
		    inputValue = e.target.value;
		this.setState({
			[inputName]: inputValue
		})
	}
	// 键盘回车
	onInputKeyUp(e){
		if(e.keyCode === 13){
			this.onSubmit();
		}
	}
	// 提交表单
	onSubmit(){
		let loginInfo = {
				username: this.state.username,
				password: this.state.password
			},
			checkResult = _user.checkLoginInfo(loginInfo);
		// 验证通过
		if(checkResult.status){
			_user.login(loginInfo).then((res) => {
				_mm.setLocalStorage('userInfo', res);
				this.props.history.push(this.state.redirect);
			}, (errMsg) => {
				_mm.errorTips(errMsg);
			});
		}
		// 验证不通过
		else{
			_mm.errorTips(checkResult.msg);
		}
	}
	render(){
		return (
			<div className="col-md-4 col-md-offset-4">
				<div className="panel panel-default login-panel">
				  <div className="panel-heading">欢迎登录 - MMall管理系统</div>
				  <div className="panel-body">
				    <div>
					  <div className="form-group">
					    <input type="text" 
					    	name="username" 
					    	onChange={e=>{this.onInputChange(e)}} 
					    	onKeyUp={e => {this.onInputKeyUp(e)}} 
					    	className="form-control" 
					    	placeholder="请输入用户名" />
					  </div>
					  <div className="form-group">
					    <input type="password" 
					    	name="password" 
					    	onChange={e=>{this.onInputChange(e)}} 
					    	onKeyUp={e => {this.onInputKeyUp(e)}} 
					    	className="form-control" 
					    	placeholder="请输入密码" />
					  </div>
					  <button className="btn btn-primary btn-block"
					  	onClick={e=>{this.onSubmit(e)}}>
					  	登录
					  </button>
					</div>
				  </div>
				</div>
			</div>
		);
	}
}

export default Login;
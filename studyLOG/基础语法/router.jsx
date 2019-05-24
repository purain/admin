// 页面路由
window.location.href = 'http://www.baidu.com';
history.back();
history.go(count);

// hash路由
window.location.href - '#hash';
// hash事件
window.onhashchange = function(){
	console.log('current hash:', window.location.hash)
}

// h5路由
// 推进一个状态
history.pushState('test', 'Title', '#test');
history.pushState('test', 'Title', '/path');
// 替换一个状态
history.replaceState('test', 'Title', '/path');
// h5事件
// 仅退栈时触发
window.onpopstate = function(e){
	console.log(window.location.href);
	console.log(window.location.pathname);
	console.log(window.location.hash);
	console.log(window.location.search);
	console.log('h5 router change:', e.state);
}



// React router
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

class A extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				Component A
				<Switch>
					<Route exact path={`${this.props.match.path}`} render={(route)=>{
						return <div>当前组件是不带参数的A</div>
					}}/>
					<Route path={`${this.props.match.path}/sub`} render={(route)=>{
						return <div>当前组件是sub</div>
					}}/>
					<Route path={`${this.props.match.path}/:id`} render={(route)=>{
						return <div>当前组件是带参数的A，参数是：{route.match.params.id}</div>
					}}/>
				</Switch>
			</div>
		);
	}
}

class B extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>Component B</div>
		);
	}
}

class Wrapper extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<Link to='/a'>组件A</Link>
				<br/>
				<Link to='/a/123'>带参数的组件A</Link>
				<br/>
				<Link to='/b'>组件B</Link>
				<br/>
				<Link to='/a/sub'>/a/sub</Link>
				<br/>
				{this.props.children}
			</div>
		);
	}
}

ReactDOM.render(
	<Router>
		<Wrapper>
			<Route path='/a' component={A}/>
			<Route path='/b' component={B}/>
		</Wrapper>
	</Router>,
	document.getElementById('app')
)
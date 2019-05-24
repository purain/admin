class Component extends React.Component{
	// 初始化数据
	constructor(props){
		super(props);
		this.state = {
			data: 'Old State'
		}
		console.log('constructor')
	}
	// 组件将要加载
	componentWillMount(){
		console.log('componentWillMount')
	}
	// 组件加载完成
	componentDidMount(){
		console.log('componentDidMount')
	}
	// 将要接受父组件的 props
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps')
	}
	// 判断子组件是否要更新
	shouldComponentUpdate(){
		console.log('shouldComponentUpdate')
		return true
	}
	// 组件将要更新
	componentWillUpdate(){
		console.log('componentWillUpdate')
	}
	// 组件更新完成
	componentDidUpdate(){
		console.log('componentDidUpdate')
	}
	// 组件将要销毁
	componentWillUnmount(){
		console.log('componentWillUnmount')
	}
	handleClick(){
		console.log('点击按钮')
		this.setState({
			data: 'New State'
		})
	}
	render(){
		console.log('render')
		return (
			<div>
				<div>Props: {this.props.data}</div>
				<button onClick={()=>{this.handleClick()}}>更新组件</button>
			</div>
		);
	}
}

class App extends React.Component{
	// 初始化数据Props
	constructor(props){
		super(props);
		this.state = {
			data: 'Old Props',
			hasChild: true
		}
		console.log('props constructor');
	}
	onPropsChange(){
		console.log('父组件 Props 更新')
		this.setState({
			data: 'new Props'
		})
	}
	onDestoryChild(){
		console.log('点击干掉子组件按钮')
		this.setState({
			hasChild: false
		})
	}
	render(){
		return (
			<div>
				{
					this.state.hasChild ? <Component data={this.state.data}/> : null
				}
				<button onClick={()=>{this.onPropsChange()}}>改变Props</button>
				<button onClick={()=>{this.onDestoryChild()}}>干掉子组件</button>
			</div>
		)
	}
}
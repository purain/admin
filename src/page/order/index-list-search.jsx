import React from 'react';

class ListSearch extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			orderNumber : ''
		}
	}
	// 数据变化
	onValueChange(e){
		let name = e.target.name,
			value = e.target.value.trim();
		this.setState({
			[name] : value
		});
	}
	// 搜索
	onSearch(){
		this.props.onSearch(this.state.orderNumber);
	}
	// 输入关键词后回车
	onSearchKeyUp(e){
		if(e.keyCode === 13){
			this.onSearch();
		}
	}
	render(){
		return (
			<div className="row search-wrap">
				<div className="col-md-12">
					<div className="form-inline">
					  <div className="form-group">
						<select className="form-control">
						  <option value="">按订单号查询</option>
						</select>
					  </div>
					  <div className="form-group">
					    <input type="text" 
					    	className="form-control" 
					    	placeholder="订单号"
					    	name="orderNumber"
					    	onKeyUp={(e) => this.onSearchKeyUp(e)}
					    	onChange={(e) => this.onValueChange(e)} />
					  </div>
					  <button type="submit" 
					  		onClick={() => {this.onSearch()}}
					  		className="btn btn-default">搜索</button>
					</div>
				</div>
			</div>
		);
	}
}
export default ListSearch;
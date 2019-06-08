import React 		from 'react';
import { Link } 	from 'react-router-dom';

import PageTitle 	from 'component/page-title/index.jsx';
import Pagination 	from 'util/pagination/index.jsx';
import MUtil 		from 'util/mm.jsx';
import TableList 	from 'util/table-list/index.jsx';
import Order 		from 'service/order-service.jsx';
import ListSearch   from './index-list-search.jsx';

const _mm 	 = new MUtil();
const _order = new Order();

class OrderList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list 			: [],
			pageNum 		: 1,
			orderNumber 	: '',
			listType 		: 'list'  // list / search
		}
	}
	componentDidMount(){
		this.loadOrderList();
	}
	// 读取订单列表
	loadOrderList(){
		let listParam = {};
		listParam.listType = this.state.listType;
		listParam.pageNum  = this.state.pageNum;
		// 如果是搜索
		if(this.state.listType === 'search'){
			listParam.orderNo = this.state.orderNumber;
		}
		_order.getOrderList(listParam).then(res => {
			this.setState(res);
		}, errMsg => {
			this.setState({
				list : []
			})
			_mm.errorTips(errMsg);
		});
	}
	// 搜索
	onSearch(orderNumber){
		let listType = orderNumber === '' ? 'list' : 'search';
		this.setState({
			listType 		: listType,
			pageNum 		: 1,
			orderNumber 	: orderNumber
		}, () => {
			this.loadOrderList();
		})
	}
	// 页数改变
	onPageNumChange(pageNum){
		this.setState({
			pageNum : pageNum
		}, () => {
			this.loadOrderList();
		})
	}
	render(){
		let tableHeads = [
			{ name : '订单号', 	width : '20%'},
			{ name : '收货人',	width : '20%'},
			{ name : '状态', 	width : '10%'},
			{ name : '订单总价', width : '10%'},
			{ name : '创建时间', width : '30%'},
			{ name : '操作', 	width : '10%'}
		];
		return (
			<div id="page-wrapper">
				<PageTitle title="订单列表"/>
				<ListSearch onSearch={(orderNumber) => {this.onSearch(orderNumber)}} />
				<div className="row">
					<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((order, index) => {
						return (
							<tr key={index}>
								<td>
									<Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
								</td>
								<td>{order.receiverName}</td>
								<td>{order.statusDesc}</td>
								<td>￥{order.payment}</td>
								<td>{order.createTime}</td>
								<td>
									<Link to={`/order/detail/${order.orderNo}`}>详情</Link>
								</td>
							</tr>
						)})
					}
					</TableList>
				</div>
				<Pagination current={this.state.pageNum} 
							total={this.state.total} 
							onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
				
			</div>
		);
	}
}

export default OrderList;
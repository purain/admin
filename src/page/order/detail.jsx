import React 			from 'react';
import PageTitle 		from 'component/page-title/index.jsx';
import MUtil 			from 'util/mm.jsx';
import Order 			from 'service/order-service.jsx';
import TableList 		from 'util/table-list/index.jsx';

import './detail.scss';

const _mm 		= new MUtil();
const _order 	= new Order();

class OrderDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			orderNumber 	: this.props.match.params.orderNumber,
			orderInfo 		: {}
		}
	}
	componentDidMount(){
		this.loadOrderDetail();
	}
	// 加载订单详情
	loadOrderDetail(){
		_order.getOrderDetail(this.state.orderNumber).then((res) => {
			this.setState({
				orderInfo : res
			});
		}, (errMsg) => {
			_mm.errorTips(errMsg);
		})
	}
	// 订单发货
	onSendGoods(){
		if(window.confirm('确定该订单已发货？')){
			_order.sendGoods(this.state.orderNumber).then(res => {
				_mm.successTips(res);
			}, errMsg => {
				_mm.errorTips(errMsg);
			})
		}
	}
	render(){
		let receiverInfo = this.state.orderInfo.shippingVo 		|| {},
			productInfo  = this.state.orderInfo.orderItemVoList || [];
		let tableHeads   = [
			{ name: '商品图片', width: '10%'},
			{ name: '商品信息', width: '45%'},
			{ name: '单价', width: '15%'},
			{ name: '数量', width: '15%'},
			{ name: '合计', width: '15%'}
		]
		return (
			<div id="page-wrapper">
				<PageTitle title="订单详情" />
				<div className="form-horizontal">
				  <div className="form-group">
				    <label className="col-md-2 control-label">订单号</label>
				    <div className="col-md-5">
				      <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">创建时间</label>
				    <div className="col-md-5">
				      <p className="form-control-static">{this.state.orderInfo.createTime}</p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">收件人</label>
				    <div className="col-md-5">
				      <p className="form-control-static">
						{receiverInfo.receiverName}，
						{receiverInfo.receiverCity}
						{receiverInfo.receiverAddress}
						{receiverInfo.Mobile || receiverInfo.Phone}
				      </p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">状态</label>
				    <div className="col-md-5">
				      <p className="form-control-static">
				      	{this.state.orderInfo.statusDesc}
				      {
						this.state.orderInfo.status === 20
						? <button className="btn btn-default btn-xs btn-send-goods"
							onClick={e => {this.onSendGoods(e)}}>立即发货</button>
						: null
				      }
				      </p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">支付方式</label>
				    <div className="col-md-5">
				      <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
				    </div>
				  </div>
				  <div className="form-group">
				    <label className="col-md-2 control-label">订单总价</label>
				    <div className="col-md-5">
				      <p className="form-control-static">￥{this.state.orderInfo.payment}</p>
				    </div>
				  </div>
				  <div className="form-group">
				  	<label className="col-md-2 control-label">商品列表</label>
				  	<div className="col-md-10">
					  <TableList tableHeads={tableHeads}>
					  {
					  	productInfo.map((product, index) => {
					  		return (
						  		<tr key={index}>
						  			<td>
						  				<img className="p-img"
							  			 	src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt={product.productImage}/>
						  			</td>
							  		<td>{product.productName}</td>
							  		<td>￥{product.currentUnitPrice}</td>
							  		<td>{product.quantity}</td>
							  		<td>￥{product.totalPrice}</td>
							  	</tr>
					  		)
						  })
					  }
				  	  </TableList>
				  	</div>
				  </div>
				</div>
			</div>
		);
	}
}
export default OrderDetail;
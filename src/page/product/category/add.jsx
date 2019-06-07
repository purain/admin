import React 		from 'react';
import { Link } 	from 'react-router-dom';
import PageTitle 	from 'component/page-title/index.jsx';
import MUtil 		from 'util/mm.jsx';
import TableList 	from 'util/table-list/index.jsx';
import Product 		from 'service/product-service.jsx';

import './index.scss';

const _mm 	= new MUtil();
const _product = new Product();

class CategoryAdd extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list 			: [],
			parentId 		: 0,
			categoryName 	: ''
		}
	}
	componentDidMount(){
		this.loadCategoryList();
	}
	// 加载品类名称，显示父品类名称
	loadCategoryList(){
		_product.getCategoryList(this.state.parentId).then(res => {
			this.setState({
				list: res
			});
		}, errMsg => {
			_mm.errorTips(errMsg);
		});
	}
	// 输入数据
	onValueChange(e){
		let name = e.target.name,
			value = e.target.value;
		this.setState({
			[name] : value
		})
	}
	// 提交
	onSubmit(){
		let categoryName = this.state.categoryName.trim();
		if(categoryName){
			_product.saveCategory({
				parentId : this.state.parentId,
				categoryName : categoryName
			}).then(res => {
				_mm.successTips(res);
				this.props.history.push('/product-category/index');
			}, errMsg => {
				_mm.errorTips(errMsg);
			})
		}
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="添加品类"/>
				<div className="form-horizontal">
					<div className="form-group">
					    <label className="col-md-2 control-label">父品类名称</label>
					    <div className="col-md-5">
					    	<select className="form-control"
					    		name="parentId"
					    		onChange={(e) => {this.onValueChange(e)}}>
								<option value="0">根品类/</option>
							{
								this.state.list.map((category, index) => 
									<option value={category.id} key={index}>根品类/{category.name}</option>
								)
							}
					    	</select>
					    </div>
					</div>
					<div className="form-group">
					    <label className="col-md-2 control-label">品类名称</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control"
					      		placeholder="请输入品类名称"
					      		name="categoryName"
					      		value={this.state.categoryName}
					      		onChange={(e) => {this.onValueChange(e)}} />
					    </div>
					</div>
					<div className="form-group">
					    <div className="col-md-offset-2 col-md-10">
					      <button className="btn btn-primary" onClick={()=>{this.onSubmit()}}>提交</button>
					    </div>
					</div>
				</div>
			</div>
		);
	}
}

export default CategoryAdd;
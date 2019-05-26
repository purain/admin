import React 		from 'react';
import { Link } 	from 'react-router-dom';
import RcPagination from 'rc-pagination';

import 'rc-pagination/dist/rc-pagination.min.css';

class Pagination extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="row">
				<div className="col-md-12">
					<RcPagination {...this.props} 
						hideOnsinglePage
						showQuickJumper />
				</div>
			</div>
		);
	}
}

export default Pagination;
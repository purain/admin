import React 		from 'react';
import MUtil 		from 'util/mm.jsx';

const _mm 			= new MUtil();

class Statistic extends React.Component{
	// 首页数据统计
	getHomeCount(){
		return _mm.request({
			url: '/manage/statistic/base_count.do'
		})
	}
}

export default Statistic;
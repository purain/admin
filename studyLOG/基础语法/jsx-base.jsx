import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

let name = 'purain';
let names = ['purain', 'inevitable', 'iron man']
let flag = false;
let jsx = (
	<div>
		{/* 变量使用 */}
		<p>I am {name}</p>
		{/* 条件判断 */}
		{
			flag ? <p>I am {name}</p> : <p>I am not {name}</p>
		}
		{/* 数组使用 */}
		{
			names.map((name, index)=><p key={index}>I am {name}</p>)
		}
	</div>
);
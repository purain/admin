import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';

class App extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<Router>
					<Layout>
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route path="/product" component={Home}/>
							<Route path="/product-category" component={Home}/>
						</Switch>
					</Layout>
				</Router>
			</div>
		);
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('app')
);
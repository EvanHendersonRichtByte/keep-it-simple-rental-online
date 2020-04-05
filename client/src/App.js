import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './client/Index';
import Login from './client/Login';
import Register from './client/Register';
import Profile from './client/Profile';
function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Index} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/profile' component={Profile} />
			</Switch>
		</Router>
	);
}

export default App;

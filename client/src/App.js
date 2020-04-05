import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './client/Index';
import Login from './client/Login';
import Register from './client/Register';
import Profile from './client/Profile';
import BookedLot from './client/BookedLot';
// ────────────────────────────────────────────────────────────────────────────────
import Navbar from './components/Navbar'
// ────────────────────────────────────────────────────────────────────────────────
import Dashboard from './delta/Dashboard'
function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Index} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/profile' component={Profile} />
				<Route path='/booked-lot' component={BookedLot} />

				<Route path='/dashboard' component={Dashboard} />
			</Switch>
		</Router>
	);
}

export default App;

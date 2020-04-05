import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Logo from '../res/faze clan.png';
import BackgroundImage from '../res/Witching.jpg';
import { Link } from 'react-router-dom';
export default class Login extends Component {
	constructor() {
		super();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state = {
			username: '',
			password: ''
		};
	}

	handleInputChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		console.log(this.state);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		axios
			.post('/login', {
				username: this.state.username,
				password: this.state.password
			})
			.then((res) => {
				console.log(res.data);
				if (res.data) {
					localStorage.setItem('_id', JSON.stringify(res.data._id));
					localStorage.setItem('Role', JSON.stringify(res.data.role));
					if (res.data.role === "User") {
						window.location.assign('/')
					} else if (res.data.role === "Admin") {
						window.location.assign('/dashboard')
					}
				} else {
					alert('Invalid username or password');
				}
			})
			.catch((err) => console.log(err));
	}
	render() {
		const background = {
			backgroundImage: `url(${BackgroundImage})`,
			width: '100%',
			height: '695px',
			backgroundSize: 'cover'
		};
		return (
			<Fragment>
				<div style={background}>
					<div className='my-auto col col-md-12 d-flex justify-content-center text-light'>
						<div style={{ marginTop: '150px' }} className='col col-md-4 border rounded border-light'>
							<center>
								<img className='img' src={Logo} alt='logo' style={{ height: '60px' }} />
							</center>
							<form onSubmit={this.handleFormSubmit}>
								<div className='form-group'>
									<label htmlFor='username'>Username</label>
									<input
										value={this.state.username}
										onChange={this.handleInputChange}
										type='text'
										name='username'
										id='username'
										className='form-control'
										aria-describedby='helpId'
										required
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='password'>Password</label>
									<input
										value={this.state.password}
										onChange={this.handleInputChange}
										type='password'
										name='password'
										id='password'
										className='form-control'
										aria-describedby='helpId'
										required
									/>
								</div>
								<div className='form-group'>
									<button type='submit' className='btn btn-outline-light btn-block'>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className='text-center'>
						<Link className='text-light' to='/register'>
							Don't have an account?
						</Link>
					</div>
				</div>
			</Fragment>
		);
	}
}

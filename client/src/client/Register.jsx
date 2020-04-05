import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Logo from '../res/cloud 9.png';
import BackgroundImage from '../res/Raspberry.jpg';
import { Link } from 'react-router-dom';
export default class Login extends Component {
	constructor() {
		super();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state = {
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	handleInputChange(e) {
		console.log(this.state);
		this.setState({ [e.target.name]: e.target.value });
	}

	handleFormSubmit(e) {
		e.preventDefault();
		if (this.state.password === this.state.confirmPassword) {
			axios
				.post('http://localhost:2020/register', {
					username: this.state.username,
					email: this.state.email,
					password: this.state.password,
					role: 'User'
				})
				.then(window.location.assign('/login'))
				.catch((err) => console.log(err));
		} else {
			alert('Password must be same!');
		}
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
						<div style={{ marginTop: '100px' }} className='col col-md-4 border rounded border-light'>
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
									<label htmlFor='email'>Email</label>
									<input
										value={this.state.email}
										onChange={this.handleInputChange}
										type='text'
										name='email'
										id='email'
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
									<label htmlFor='confirmPassword'>Confirm Password</label>
									<input
										value={this.state.confirmPassword}
										onChange={this.handleInputChange}
										type='password'
										name='confirmPassword'
										id='confirmPassword'
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
						<Link className='text-light' to='/login'>
							Already have an account?
						</Link>
					</div>
				</div>
			</Fragment>
		);
	}
}

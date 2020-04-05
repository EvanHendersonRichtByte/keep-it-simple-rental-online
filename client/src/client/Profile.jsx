import React, { Component, Fragment } from 'react';
import axios from 'axios';
export default class Profile extends Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.state = {
			_id: '',
			username: '',
			firstName: '',
			lastName: '',
			description: '',
			email: '',
			age: '',
			address: '',
			country: '',
			phoneNumber: '',
			zip: '',
			image: null,
			usernameValidation: '',
			password: '',
			confirmPassword: ''
		};
	}

	componentDidMount() {
		this.handleUserProfile();
	}

	componentDidUpdate() {
		localStorage.setItem('Image', JSON.stringify(this.state.image))
	}

	handleUserProfile() {
		let _id = localStorage.getItem('_id');
		if (_id) {
			_id = JSON.parse(_id);
			axios.get('/user/' + _id).then((res) => {
				this.setState({
					_id: res.data._id,
					username: res.data.username,
					firstName: res.data.firstName,
					lastName: res.data.lastName,
					description: res.data.description,
					email: res.data.email,
					age: res.data.age,
					address: res.data.address,
					country: res.data.country,
					phoneNumber: res.data.phoneNumber,
					zip: res.data.zip,
					image: res.data.image
				});
			});
		} else {
			alert('Please login first!');
			window.location.assign('/login');
		}
	}

	handlePasswordChange(e) {
		e.preventDefault();
		if (this.state.usernameValidation === this.state.username && this.state.password === this.state.confirmPassword) {
			axios.put('/user/password/' + this.state._id, {
				password: this.state.password
			}).then(alert('your password is updated!'), window.location.assign('/profile')).catch(err => console.log(err))
		}
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleFileChange(e) {
		this.setState({ image: e.target.files[0] });
	}

	handleDeleteAccount(e) {
		e.preventDefault();
		axios.delete('admin/user/' + this.state._id).then(window.location.assign('/login'));
		alert('Your account has been successfully deleted');
		window.location.assign('/login');
	}

	handleFormSubmit(e) {
		e.preventDefault();
		let formData = new FormData();
		formData.append('firstName', this.state.firstName);
		formData.append('lastName', this.state.lastName);
		formData.append('description', this.state.description);
		formData.append('email', this.state.email);
		formData.append('age', this.state.age);
		formData.append('address', this.state.address);
		formData.append('country', this.state.country);
		formData.append('phoneNumber', this.state.phoneNumber);
		formData.append('zip', this.state.zip);
		formData.append('image', this.state.image);
		const config = { headers: { 'content-type': 'multipart/form-data' } };
		axios
			.put('/user/' + JSON.parse(localStorage.getItem('_id')), formData, config)
			.then((res) => {
				alert('Your profile has been updated!');
				window.location.assign('/');
			})
			.catch((err) => console.log(err));
	}
	render() {
		return (
			<Fragment>
				<div className='container'>
					<div className='row'>
						<div className='col-md-4 text-center'>
							<img
								style={{ width: '200px', height: '200px' }}
								src={`${process.env.PUBLIC_URL}/uploads/users/${this.state.image}`}
								className='border border-danger img-fluid rounded-circle'
								alt='slc'
							/>
						</div>
						<div className='col-md-8'>
							<div className='row'>
								<div className='col-md-6'>
									<h6>Name</h6>
								</div>
								{!this.state.firstName ? (
									<div className='col-md-6'>
										<h6>{this.state.username}</h6>
									</div>
								) : (
										<div className='col-md-6'>
											<h6>{`${this.state.firstName} ${this.state.lastName}`}</h6>
										</div>
									)}
							</div>
							<div className='row'>
								<div className='col-md-6'>
									<h6>Email</h6>
								</div>
								<div className='col-md-6'>
									<h6>{this.state.email}</h6>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-6'>
									<h6>Age</h6>
								</div>
								{this.state.age ? (
									<div className='col-md-6'>
										<h6>{this.state.age}</h6>
									</div>
								) : (
										<div className='col-md-6'>
											<h6>Hasn't setup</h6>
										</div>
									)}
							</div>
							<div className='row'>
								<div className='col-md-6'>
									<h6>Address</h6>
								</div>
								{this.state.address ? (
									<div className='col-md-6'>
										<h6>{this.state.address}</h6>
									</div>
								) : (
										<div className='col-md-6'>
											<h6>Hasn't setup</h6>
										</div>
									)}
							</div>
							<div className='row'>
								<div className='col-md-6'>
									<h6>Country</h6>
								</div>
								{this.state.country ? (
									<div className='col-md-6'>
										<h6>{this.state.country}</h6>
									</div>
								) : (
										<div className='col-md-6'>
											<h6>Hasn't setup</h6>
										</div>
									)}
							</div>
							<div className='row'>
								<div className='col-md-6'>
									<h6>Phone Number</h6>
								</div>
								{this.state.phoneNumber ? (
									<div className='col-md-6'>
										<h6>{this.state.phoneNumber}</h6>
									</div>
								) : (
										<div className='col-md-6'>
											<h6>Hasn't setup</h6>
										</div>
									)}
							</div>
							<div className='row'>
								<div className='col-md-6'>
									<h6>Zip</h6>
								</div>
								{this.state.zip ? (
									<div className='col-md-6'>
										<h6>{this.state.zip}</h6>
									</div>
								) : (
										<div className='col-md-6'>
											<h6>Hasn't setup</h6>
										</div>
									)}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-12'>
								<h6>Description</h6>
							</div>
							{this.state.description ? (
								<div className='col-md-12'>
									<h6>{this.state.description}</h6>
								</div>
							) : (
									<div className='col-md-12'>
										<h6>
											Nobis voluptate cumque enim. Occaecati pariatur nisi accusamus consequatur enim odio aspernatur officia. In et
											voluptas corrupti qui nihil reprehenderit aliquam corporis temporibus. Excepturi ea deleniti qui qui veritatis
											mollitia. Illo non sit sed est aspernatur quis doloremque. Facilis eos aut fuga possimus et fuga dolor est.
											Eaque ipsa placeat neque molestiae. Maxime itaque impedit laboriosam laudantium maxime quidem est. Commodi
											sapiente et debitis eos perferendis excepturi. Quasi cum aut veniam. Porro non nemo. Repudiandae assumenda ut.
											Magnam nihil illo totam odio nemo beatae inventore perspiciatis magni. Repellendus ea eum voluptas quos
											numquam vitae. Dolores unde consequatur nihil quas nihil ratione.
									</h6>
									</div>
								)}
						</div>
					</div>
					<hr className='bg-primary' />
					<form onSubmit={this.handleFormSubmit}>
						<div className='row'>
							<div className='col-md-6 d-block'>
								<label htmlFor='firstName'>First Name</label>
								<input
									onChange={this.handleChange}
									value={this.state.firstName}
									type='text'
									name='firstName'
									id='firstName'
									className='form-control d-block'
								/>
							</div>
							<div className='col-md-6 d-block'>
								<label htmlFor='lastName'>Last Name</label>
								<input
									onChange={this.handleChange}
									value={this.state.lastName}
									type='text'
									name='lastName'
									id='lastName'
									className='form-control d-block'
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-12 d-block'>
								<label htmlFor='description'>Desciption</label>
								<textarea
									onChange={this.handleChange}
									value={this.state.description}
									type='text'
									name='description'
									id='description'
									className='form-control d-block'
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 d-block'>
								<label htmlFor='email'>Email</label>
								<input
									onChange={this.handleChange}
									value={this.state.email}
									type='email'
									name='email'
									id='email'
									className='form-control d-block'
								/>
							</div>
							<div className='col-md-6 d-block'>
								<label htmlFor='age'>Age</label>
								<input
									onChange={this.handleChange}
									value={this.state.age}
									type='number'
									name='age'
									id='age'
									className='form-control d-block'
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-4 d-block'>
								<label htmlFor='address'>Address</label>
								<input
									onChange={this.handleChange}
									value={this.state.address}
									type='text'
									name='address'
									id='address'
									className='form-control d-block'
								/>
							</div>
							<div className='col-md-4 d-block'>
								<label htmlFor='country'>Country</label>
								<input
									onChange={this.handleChange}
									value={this.state.country}
									type='text'
									name='country'
									id='country'
									className='form-control d-block'
								/>
							</div>
							<div className='col-md-4 d-block'>
								<label htmlFor='phoneNumber'>Phone Number</label>
								<input
									onChange={this.handleChange}
									value={this.state.phoneNumber}
									type='text'
									name='phoneNumber'
									id='phoneNumber'
									className='form-control d-block'
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 d-block'>
								<label htmlFor='zip'>Zip Code</label>
								<input
									onChange={this.handleChange}
									value={this.state.zip}
									type='number'
									name='zip'
									id='zip'
									className='form-control d-block'
								/>
							</div>
							<div className='col-md-6 d-block'>
								<label htmlFor='image'>Image</label>
								<input
									onChange={this.handleFileChange}
									type='file'
									className='border rounded form-control-file'
									name='image'
									id='image'
								/>
							</div>
						</div>
						<br />
						<button type='submit' className='btn btn-outline-primary btn-block'>
							Submit
						</button>
					</form>
					<hr className='bg-warning' />
					<form onSubmit={this.handlePasswordChange} className='form-inline'>
						<div className='col-md-12'>
							<div className='row'>
								<div className='col-md-4'>
									<div className='form-group'>
										<label htmlFor='usernameValidation'>Enter Username</label>
										<input value={this.state.usernameValidation} onChange={this.handleChange} type='text' name='usernameValidation' id='usernameValidation' className='form-control' aria-describedby='helpId' />
									</div>
								</div>
								<div className='col-md-4'>
									<div className='form-group'>
										<label htmlFor='password'>Password</label>
										<input value={this.state.password} onChange={this.handleChange} type='text' name='password' id='password' className='form-control' aria-describedby='helpId' />
									</div>
								</div>
								<div className='col-md-4'>
									<div className='form-group'>
										<label htmlFor='confirmPassword'>Confirm Password</label>
										<input
											value={this.state.confirmPassword}
											onChange={this.handleChange}
											type='text'
											name='confirmPassword'
											id='confirmPassword'
											className='form-control'
											aria-describedby='helpId'
										/>
									</div>
								</div>
							</div>
						</div>
						<button className='btn btn-outline-warning btn-block'>Change Password</button>
					</form>
					<hr className='bg-danger' />
					<form onSubmit={this.handleDeleteAccount} className='form-inline'>
						<button type='submit' className='btn btn-outline-danger btn-block'>
							Delete Account
						</button>
					</form>
				</div>
			</Fragment>
		);
	}
}

import React, { Fragment } from 'react';
import Logo from '../res/bgst.jpg';
import { Link } from 'react-router-dom';
const Navbar = () => {
	const handleLogout = () => {
		localStorage.clear();
	};

	const isAdded = () => {
		let image = localStorage.getItem('Image')
		if (image) {
			image = JSON.parse(image)
			return (
				<li className='nav-item'>
					<img
						className='border rounded-circle border-danger'
						style={{ width: '40px', height: '40px' }}
						src={`${process.env.PUBLIC_URL}/uploads/users/${image}`}
						alt='okok'
					/>
				</li>
			)
		} else {
			return (
				<li className='nav-item'>
					<img
						className='border rounded-circle border-danger'
						style={{ width: '40px', height: '40px' }}
						src={Logo}
						alt='okok'
					/>
				</li>
			)
		}
	}

	const isLogged = () => {
		let role = localStorage.getItem('Role');
		let _id = localStorage.getItem('_id');
		if (role && _id) {
			if (JSON.parse(role) === "User") {
				return (
					<Fragment>
						<li className='nav-item'>
							<Link className='nav-link' to='/profile'>
								My profile
							</Link>
						</li>
						<li className='nav-item'>
							<Link onClick={handleLogout} className='nav-link' to='/login'>
								Logout
							</Link>
						</li>
					</Fragment>
				);
			} else {
				return (
					<Fragment>
						<li className='nav-item'>
							<Link className='nav-link text-danger' to='/dashboard'>
								Dashboard
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/profile'>
								My profile
							</Link>
						</li>
						<li className='nav-item'>
							<Link onClick={handleLogout} className='nav-link' to='/login'>
								Logout
							</Link>
						</li>
					</Fragment>
				)
			}
		} else {
			return (
				<li className='nav-item'>
					<Link className='nav-link' to='/login'>
						Login
					</Link>
				</li>
			);
		}
	};

	return (
		<nav className='navbar navbar-expand-sm navbar-light bg-light'>
			<a className='navbar-brand' href='/'>
				Keep It Simple
			</a>
			<button
				className='navbar-toggler d-lg-none'
				type='button'
				data-toggle='collapse'
				data-target='#collapsibleNavId'
				aria-controls='collapsibleNavId'
				aria-expanded='false'
				aria-label='Toggle navigation'
			/>
			<div className='collapse navbar-collapse' id='collapsibleNavId'>
				<ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
					<li className='nav-item active'>
						<a className='nav-link' href='/'>
							Home <span className='sr-only'>(current)</span>
						</a>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/booked-lot'>
							Booked Lot
						</Link>
					</li>
					<li className='nav-item'>
						<form className='form-inline'>
							<input className='form-control mr-sm-2' type='text' placeholder='Search' />
							<button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
								Search
							</button>
						</form>
					</li>
				</ul>

				<ul className='navbar-nav'>
					{isLogged()}
					{isAdded()}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;

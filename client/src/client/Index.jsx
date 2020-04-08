import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import Picture1 from '../res/Moonlit.jpg';
import Picture2 from '../res/Raspberry.jpg';
import Picture3 from '../res/Witching.jpg';
export default class Index extends Component {
	constructor() {
		super();
		this.state = {
			lots: [],
			userId: ''
		};
	}
	componentDidMount() {
		this.handleLotData();
		console.log(this.state)
	}
	handleLotData() {
		axios
			.get('/lot')
			.then((lot) => {
				this.setState({ lots: lot.data });
			})
			.catch((err) => console.log(err));
	}
	handleRentClick(data) {
		window.location.assign('/selected-lot')
		if (localStorage.getItem('Selected Lot')) {
			alert('You only have one selected lot!')
		} else {
			localStorage.setItem('Selected Lot', JSON.stringify(data))
		}
	}
	render() {
		return (
			<Fragment>
				<nav style={{ height: "100px" }} className="navbar navbar-expand-md navbar-dark bg-dark">
					<a className="navbar-brand" href="/">
						Keep it Simple
  					</a>
					<div className="collapse navbar-collapse" id="collapsibleNavId">
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item">
								<form className="form-inline my-2 my-lg-0">
									<input
										style={{ width: "900px" }}
										type="text"
										className="form-control border-right-0"
										placeholder="Search.."
										aria-label="Search.."
										aria-describedby="basic-addon2"
									/>
									<div className="input-group-append">
										<button className="btn btn-outline-light border-left-0" type="button">
											Search
    									</button>
									</div>
								</form>
							</li>
						</ul>
					</div>
				</nav>

				<Carousel>
					<Carousel.Item>
						<img style={{ height: '400px' }} className='d-block w-100' src={Picture1} alt='First slide' />
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img style={{ height: '400px' }} className='d-block w-100' src={Picture2} alt='Third slide' />

						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img style={{ height: '400px' }} className='d-block w-100' src={Picture3} alt='Third slide' />

						<Carousel.Caption>
							<h3>Third slide label</h3>
							<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<div className='container' style={{ marginTop: "100px", marginBottom: "100px" }}>
					<div className='row'>
						<div className='col text-center'>
							<h4>Made by Bootstrap</h4>
							<p>Using open source library</p>
						</div>
						<div className='col text-center'>
							<h4>Vision and Mission</h4>
							<p>Non nihil maxime voluptate ut nesciunt id.</p>
						</div>
						<div className='col text-center'>
							<h4>Our Office</h4>
							<p>Located on Area 51</p>
						</div>
					</div>
				</div>
				<div className='row'>
					{this.state.lots.map(lot => {
						return (
							<div className='col-md-3'>
								<div className='card text-left'>
									<img className='card-img-top' src={`${process.env.PUBLIC_URL}/uploads/lots/${lot.image}`} alt='kwkwkw' />
									<div className='card-body'>
										<h4 className='card-title'>{lot.title}</h4>
										<p className='card-text'>Location: {lot.location}</p>
										<p className='card-text'>Contact: {lot.contact}</p>
										<p className='card-text'>Status: {lot.status === "Available" ? <span className="text-success" >{lot.status}</span> : <span className="text-danger" >{lot.status}</span>} </p>
										<button onClick={() => this.handleRentClick(lot)} className='btn btn-outline-primary btn-block' disabled={lot.status === "Unavailable"} >
											Rent
										</button>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</Fragment>
		);
	}
}

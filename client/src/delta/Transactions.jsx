import React, { Component, Fragment } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import axios from 'axios';
import UpdateTransactionForm from '../components/UpdateTransactionForm';
export default class Transactions extends Component {
	constructor() {
		super();
		this.handleUpdateModalStatus = this.handleUpdateModalStatus.bind(this);
		this.handleDeleteTransactions = this.handleDeleteTransactions.bind(this);
		this.state = {
			transactions: [],
			sendedData: [],
			updateModalStatus: false
		};
	}

	componentDidMount() {
		this.handleTransactionData();
	}

	handleUpdateModalStatus(data) {
		this.setState({ sendedData: data, updateModalStatus: !this.state.updateModalStatus });
	}

	handleDeleteTransactions(_id) {
		axios
			.delete('/rent/' + _id)
			.then((res) => {
				alert('Data has been successfully deleted!');
				window.location.assign('/transactions');
			})
			.catch((err) => console.log(err));
	}

	handleTransactionData() {
		axios
			.get('/rent')
			.then((res) => {
				this.setState({ transactions: res.data });
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<Fragment>
				<table className='table table-striped table-inverse'>
					<thead className='thead-inverse'>
						<tr>
							<th>User ID</th>
							<th>Rented Lot</th>
							<th>Contact Provider</th>
							<th>Total</th>
							<th>Status</th>
							<th>Payment</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{this.state.transactions.map((data1) => {
							return (
								<tr key={data1._id}>
									<td>{data1.userId.substring(0, 7)}</td>
									<td>
										{data1.rentedLot.map((data) => {
											return <span key={data._id}>{data.title}</span>;
										})}
									</td>
									<td>
										{data1.rentedLot.map((data) => {
											return <span key={data._id}>{data.contact}</span>;
										})}
									</td>
									<td>{data1.total}</td>
									<td>
										{data1.status === 'Used' ? (
											<span className='text-danger'>{data1.status}</span>
										) : (
											<span className='text-success'>{data1.status}</span>
										)}
									</td>
									<td>
										{data1.image ? (
											<img
												alt={data1._id}
												src={`${process.env.PUBLIC_URL}/uploads/proofOfPayments/${data1.image}`}
												style={{ height: '100px' }}
											/>
										) : (
											<span>Haven't Paid</span>
										)}
									</td>
									<td className='d-flex justify-content-around'>
										<button className='btn btn-outline-primary' onClick={() => this.handleUpdateModalStatus(data1)}>
											<FiEdit />
										</button>
										<button className='btn btn-outline-danger' onClick={() => this.handleDeleteTransactions(data1._id)}>
											<FiTrash2 />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<UpdateTransactionForm
					sendedData={this.state.sendedData}
					updateModalStatus={this.state.updateModalStatus}
					handleUpdateModalStatus={this.handleUpdateModalStatus}
				/>
			</Fragment>
		);
	}
}

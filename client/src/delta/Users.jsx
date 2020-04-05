import React, { Component, Fragment } from 'react';
import AddUserForm from '../components/AddUserForm'
import UpdateUserForm from '../components/UpdateUserForm'
import axios from 'axios'
export default class Lot extends Component {
    constructor() {
        super()
        this.handleModalStatus = this.handleModalStatus.bind(this)
        this.handleUpdateModalStatus = this.handleUpdateModalStatus.bind(this)
        this.state = {
            users: [],
            modalStatus: false,
            updateModalStatus: false,
            updateDataId: ''
        }
    }

    componentDidMount() {
        this.handleLotData()
    }

    handleLotData() {
        axios.get('/admin/user').then(res => this.setState({ users: res.data })).catch(err => console.log(err))
    }

    handleModalStatus() {
        this.setState({ modalStatus: !this.state.modalStatus });
    }

    handleUpdateModalStatus(_id) {
        this.setState({ updateDataId: _id, updateModalStatus: !this.state.updateModalStatus })
        console.log(this.state)
    }

    handleDeleteLot(_id) {
        axios.delete('/admin/user/' + _id).then(window.location.assign('/users')).catch(err => console.log(err))
    }

    render() {
        return (
            <Fragment>
                <table className="table table-bordered table-inverse">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            <th>Zip</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.firstName && item.lastName ? <span>{item.firstName + " " + item.lastName}</span> : <span>{item.username}</span>}</td>
                                    <td>{item.description ? <span>{item.description}</span> : <span>Haven't setup</span>}</td>
                                    <td>{item.email}</td>
                                    <td>{item.age ? <span>{item.age}</span> : <span>Haven't setup</span>}</td>
                                    <td>{item.address ? <span>{item.address}</span> : <span>Haven't setup</span>}</td>
                                    <td>{item.country ? <span>{item.country}</span> : <span>Haven't setup</span>}</td>
                                    <td>{item.phoneNumber ? <span>{item.phoneNumber}</span> : <span>Haven't setup</span>}</td>
                                    <td>{item.role}</td>
                                    <td>{item.zip ? <span>{item.zip}</span> : <span>Haven't setup</span>}</td>
                                    <td className="text-center"><img style={{ height: "120px" }} alt={item._id + "Preview"} src={`${process.env.PUBLIC_URL}/uploads/users/${item.image}`} /></td>
                                    <td><button className="btn btn-outline-primary" onClick={() => this.handleUpdateModalStatus(item._id)}>Edit Data</button>
                                        <button className="btn btn-outline-danger" onClick={() => this.handleDeleteLot(item._id)}>Delete Data</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="btn btn-outline-primary btn-block" onClick={this.handleModalStatus}>Add Data</button>
                <AddUserForm modalStatus={this.state.modalStatus} handleModalStatus={this.handleModalStatus} />
                <UpdateUserForm
                    _id={this.state.updateDataId}
                    updateModalStatus={this.state.updateModalStatus}
                    handleUpdateModalStatus={this.handleUpdateModalStatus}
                />
            </Fragment>
        )
    }
}
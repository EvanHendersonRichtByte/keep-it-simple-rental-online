import React, { Component, Fragment } from 'react';
import AddUserForm from '../components/AddUserForm'
import UpdateUserForm from '../components/UpdateUserForm'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import axios from 'axios'
export default class Users extends Component {
    constructor() {
        super()
        this.handleModalStatus = this.handleModalStatus.bind(this)
        this.handleUpdateModalStatus = this.handleUpdateModalStatus.bind(this)
        this.state = {
            users: [],
            modalStatus: false,
            updateModalStatus: false,
            sendedData: []
        }
    }

    componentDidMount() {
        this.handleUserData()
    }

    handleUserData() {
        axios.get('/admin/user').then(res => this.setState({ users: res.data })).catch(err => console.log(err))
    }

    handleModalStatus() {
        this.setState({ modalStatus: !this.state.modalStatus });
    }

    handleUpdateModalStatus(data) {
        this.setState({ sendedData: data, updateModalStatus: !this.state.updateModalStatus })
        console.log(this.state)
    }

    handleDeleteUser(_id) {
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
                                    <td className="text-center"><img style={{ height: "90px" }} alt={item._id + "Preview"} src={`${process.env.PUBLIC_URL}/uploads/users/${item.image}`} /></td>
                                    <td><button className="btn btn text-primary" onClick={() => this.handleUpdateModalStatus(item)}><FiEdit /></button>
                                        <button className="btn btn text-danger" onClick={() => this.handleDeleteUser(item._id)}><FiTrash2 /></button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="btn btn-outline-primary btn-block" onClick={this.handleModalStatus}>Add Data</button>
                <AddUserForm modalStatus={this.state.modalStatus} handleModalStatus={this.handleModalStatus} />
                <UpdateUserForm
                    sendedData={this.state.sendedData}
                    updateModalStatus={this.state.updateModalStatus}
                    handleUpdateModalStatus={this.handleUpdateModalStatus}
                />
            </Fragment>
        )
    }
}
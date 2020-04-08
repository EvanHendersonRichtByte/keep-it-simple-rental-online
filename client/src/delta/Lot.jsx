import React, { Component, Fragment } from 'react';
import AddLotForm from '../components/AddLotForm'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import UpdateLotForm from '../components/UpdateLotForm'
import axios from 'axios'
export default class Lot extends Component {
    constructor() {
        super()
        this.handleModalStatus = this.handleModalStatus.bind(this)
        this.handleUpdateModalStatus = this.handleUpdateModalStatus.bind(this)
        this.state = {
            lots: [],
            modalStatus: false,
            updateModalStatus: false,
            sendedData: []
        }
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    componentDidMount() {
        this.handleLotData()
    }

    handleLotData() {
        axios.get('/lot').then(res => this.setState({ lots: res.data })).catch(err => console.log(err))
    }

    handleModalStatus() {
        this.setState({ modalStatus: !this.state.modalStatus });
    }

    handleUpdateModalStatus(item) {
        this.setState({ sendedData: item, updateModalStatus: !this.state.updateModalStatus })
    }

    handleDeleteLot(_id) {
        axios.delete('/lot/' + _id).then(window.location.assign('/lot')).catch(err => console.log(err))
    }

    render() {
        return (
            <Fragment>
                <table className="table table-bordered table-inverse">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Contact</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Duration</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lots.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>{item.location}</td>
                                    <td>{item.description}</td>
                                    <td>{item.contact}</td>
                                    <td>{item.price}</td>
                                    <td>{item.status}</td>
                                    <td>{item.duration}</td>
                                    <td className="text-center"><img style={{ height: "120px" }} alt={item._id + "Preview"} src={`${process.env.PUBLIC_URL}/uploads/lots/${item.image}`} /></td>
                                    <td><button className="btn btn text-primary" style={{ marginRight: "5px" }} onClick={() => this.handleUpdateModalStatus(item)}><FiEdit /></button>
                                        <button className="tn btn text-danger" onClick={() => this.handleDeleteLot(item._id)}><FiTrash2 /></button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="btn btn-outline-primary btn-block" onClick={this.handleModalStatus}>Add Data</button>
                <AddLotForm modalStatus={this.state.modalStatus} handleModalStatus={this.handleModalStatus} />
                <UpdateLotForm
                    sendedData={this.state.sendedData}
                    updateModalStatus={this.state.updateModalStatus}
                    handleUpdateModalStatus={this.handleUpdateModalStatus}
                />
            </Fragment>
        )
    }
}
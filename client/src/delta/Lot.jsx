import React, { Component, Fragment } from 'react';
import AddLotForm from '../components/AddLotForm'
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
            updateDataId: ''
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

    handleUpdateModalStatus(_id) {
        this.setState({ updateDataId: _id, updateModalStatus: !this.state.updateModalStatus })
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
                                    <td className="text-center"><img style={{ height: "120px" }} alt={item._id + "Preview"} src={`${process.env.PUBLIC_URL}/uploads/lots/${item.image}`} /></td>
                                    <td><button className="btn btn-outline-primary" onClick={() => this.handleUpdateModalStatus(item._id)}>Edit Data</button>
                                        <button className="btn btn-outline-danger" onClick={() => this.handleDeleteLot(item._id)}>Delete Data</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button className="btn btn-outline-primary btn-block" onClick={this.handleModalStatus}>Add Data</button>
                <AddLotForm modalStatus={this.state.modalStatus} handleModalStatus={this.handleModalStatus} />
                <UpdateLotForm
                    _id={this.state.updateDataId}
                    updateModalStatus={this.state.updateModalStatus}
                    handleUpdateModalStatus={this.handleUpdateModalStatus}
                />
            </Fragment>
        )
    }
}
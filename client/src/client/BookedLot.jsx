import React, { Component, Fragment } from 'react';
import PayModal from '../components/PayModal'
import axios from 'axios'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
export default class BookedLot extends Component {
    constructor() {
        super()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleModalStatus = this.handleModalStatus.bind(this)
        this.handleTotalState = this.handleTotalState.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.state = {
            userId: '',
            selectedLot: [],
            total: 0,
            status: '',
            bookedDate: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDay()}`,
            startedTime: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDay()}`,
            endedTime: '',
            modalStatus: false,
        }
    }


    componentDidMount() {
        this.handleSelectedLot()
    }

    handleModalStatus() {
        this.setState({ modalStatus: !this.state.modalStatus })
    }

    handleChangeSelectedLot() {
        localStorage.removeItem('Selected Lot')
        alert('Please choose carefully')
        window.location.assign('/')
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSelectedLot() {
        let selected = localStorage.getItem('Selected Lot')
        let _id = localStorage.getItem('_id')
        if (selected) {
            this.setState({ selectedLot: JSON.parse(selected), userId: JSON.parse(_id), status: "Used" })
        } else {
            alert('Please select a lot before continuing')
            window.location.assign('/')
        }
    }

    handleTotalState() {
        let endedTime = this.state.endedTime
        let startedTime = this.state.startedTime
        let totalTime = (endedTime.split("-")[2]) - startedTime.split("-")[2]
        if (totalTime <= 0) {
            alert('Please select appropriate date')
            window.location.assign('/booked-lot')
        } else {
            this.setState({ total: totalTime * this.state.selectedLot.price })
            console.log(this.state.total)
        }

    }

    handleFormSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('userId', this.state.userId)
        formData.append('rentedLot', this.state.selectedLot)
        formData.append('total', this.state.total)
        formData.append('status', this.state.status)
        formData.append('bookedDate', this.state.bookedDate)
        formData.append('startedTime', this.state.startedTime)
        formData.append('endedTime', this.state.endedTime)
        axios.post('/rent', {
            userId: this.state.userId,
            rentedLot: this.state.selectedLot,
            total: this.state.total,
            status: this.state.status,
            bookedDate: this.state.bookedDate,
            startedTime: this.state.startedTime,
            endedTime: this.state.endedTime
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
        axios.put('/rent/lot-status/' + this.state.selectedLot._id, {
            status: "Not Available"
        }).then(res => console.log(res)).catch(err => console.log(err))
        alert('Please contact to ' + this.state.selectedLot.contact + ' to discuss about renting this lot')
        window.location.assign('/booked-lot')
    }

    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4">
                        <img src={`${process.env.PUBLIC_URL}/uploads/lots/${this.state.selectedLot.image}`} alt="logo" style={{ height: "220px" }} />
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12 text-center">{this.state.selectedLot.title}</div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-4">Location:</div>
                            <div className="col-md-4">{this.state.selectedLot.location}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Contact:</div>
                            <div className="col-md-4">{this.state.selectedLot.contact}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Price:</div>
                            <div className="col-md-4">{this.state.selectedLot.price}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Status:</div>
                            <div className="col-md-4">{this.state.selectedLot.status === "Available" ? <span className="text-success">{this.state.selectedLot.status}</span> : <span className="text-danger">{this.state.selectedLot.status}</span>}</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={this.handleFormSubmit} className="form-block">
                                    <label htmlFor="endedTime">Until when you rent this lot?</label>
                                    <input onClick={this.handleTotalState} value={this.state.endedTime} onChange={this.handleInputChange} type="date" className="form-control col-md-8" name="endedTime" id="endedTime" />
                                    <button className="border-top-0 btn btn-outline-primary btn-block col-md-8" disabled={this.state.selectedLot.status === "Not Available" || isNaN(this.state.total)} >Book now</button>
                                </form>
                            </div>
                            <div className="col-md-8 text-center">
                                <br />
                                <div className="row">
                                    <div className="col-md-6">
                                        Total:
                                    </div>
                                    <div className="col-md-6">
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">If Total is NaN please click the date again until it show up</Tooltip>}>
                                            <span className="d-inline-block border rounded border-info">
                                                {this.state.total === isNaN() ? <span>Please Select Appropriate Date</span> : <span>$ <span className="text-info">|</span> {this.state.total}</span>}
                                            </span>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.selectedLot.description}
                    </div>
                </div>
                <div className="row" style={{ marginTop: "250px" }}>
                    <div className="col-md-12" >
                        <button onClick={this.handleTotalState} className="btn btn-outline-primary btn-block">
                            Change Selected Lot
                        </button>
                    </div>
                </div>
                <PayModal _id={this.state.selectedLot._id} modalStatus={this.state.modalStatus} handleModalStatus={this.handleModalStatus} />
            </Fragment>
        )
    }
}
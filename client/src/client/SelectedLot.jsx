import React, { Component, Fragment } from 'react';
import PayModal from '../components/PayModal'
import axios from 'axios'
import { MdModeEdit } from 'react-icons/md'
export default class SelectedLot extends Component {
    constructor() {
        super()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleModalStatus = this.handleModalStatus.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleDateRented = this.handleDateRented.bind(this)
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
        setInterval((this.handleDateRented), 1000)
    }

    handleDateRented() {
        let day = new Date().getDay()
        let month = new Date().getMonth()
        let year = new Date().getFullYear()

        let duration = this.state.selectedLot.duration.split(" ")[0]
        this.setState({
            endedTime: `${day + duration}-${month}-${year}`
        })
    }

    handleModalStatus() {
        this.setState({ modalStatus: !this.state.modalStatus })
    }
    // ────────────────────────────────────────────────────────────────────────────────

    handleChangeSelectedLot() {
        localStorage.removeItem('Selected Lot')
        alert('Please choose carefully')
        window.location.assign('/')
    }

    // ────────────────────────────────────────────────────────────────────────────────

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

    handleFormSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('userId', this.state.userId)
        formData.append('rentedLot', this.state.selectedLot)
        formData.append('total', this.state.selectedLot.price)
        formData.append('status', this.state.status)
        formData.append('bookedDate', this.state.bookedDate)
        formData.append('startedTime', this.state.startedTime)
        formData.append('endedTime', this.state.endedTime)
        axios.post('/rent', {
            userId: this.state.userId,
            rentedLot: this.state.selectedLot,
            total: this.state.selectedLot.price,
            status: this.state.status,
            bookedDate: this.state.bookedDate,
            startedTime: this.state.startedTime,
            endedTime: this.state.endedTime
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
        axios.put('/rent/lot-status/' + this.state.selectedLot._id, {
            status: "Unavailable"
        }).then(res => console.log(res)).catch(err => console.log(err))
        alert('Please contact to ' + this.state.selectedLot.contact + ' to discuss about renting this lot')
        window.location.assign('/')
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
                        <div className="row">
                            <div className="col-md-4">Duration:</div>
                            <div className="col-md-4">{this.state.selectedLot.duration}</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                This lot can be rented until
                            </div>
                            <div className="col-md-12">
                                {this.state.endedTime}
                                <form onSubmit={this.handleFormSubmit} className="form-block">
                                    <button className=" btn btn-sm btn-outline-primary btn-block col-md-8" disabled={this.state.selectedLot.status === "Not Available"} >Book now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.selectedLot.description}
                    </div>
                </div>
                <div className="row d-flex justify-content-center" style={{ marginTop: "250px" }}>
                    <div className="col-md-2" >
                        <button onClick={this.handleChangeSelectedLot} className="btn btn-outline-primary btn-block">
                            <MdModeEdit /> Change Selected Lot
                        </button>
                    </div>
                </div>
                <PayModal _id={this.state.selectedLot._id} modalStatus={this.state.modalStatus} handleModalStatus={this.handleModalStatus} />
            </Fragment>
        )
    }
}
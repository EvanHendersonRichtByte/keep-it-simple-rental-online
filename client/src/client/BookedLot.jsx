import React, { Component, Fragment } from 'react';
export default class BookedLot extends Component {
    constructor() {
        super()
        this.handleInputChange = this.handleInputChange.bind(this)
        this.state = {
            userId: '',
            selectedLot: [],
            total: 0,
            status: '',
            startedTime: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDay()}`,
            endedTime: ''
        }
    }

    componentDidMount() {
        this.handleSelectedLot()
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
        if (selected) {
            this.setState({ selectedLot: JSON.parse(selected) })
        } else {
            alert('Please select a lot before continuing')
            window.location.assign('/')
        }
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
                                <form className="form-block">
                                    <label htmlFor="endedTime">Until when you rent this lot?</label>
                                    <input value={this.state.endedTime} onChange={this.handleInputChange} type="date" className="form-control col-md-8" name="endedTime" id="endedTime" />
                                    <button className="border-primary border-top-0 btn btn-block col-md-8" disabled={this.state.selectedLot.status === "Not Available"} >Book now</button>
                                </form>
                            </div>
                            <div className="col-md-8 text-center">
                                <br />
                                <div class="row">
                                    <div className="col-md-6">
                                        <button className="btn btn-outline-success">
                                            Pay now
                                </button>

                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-outline-danger">
                                            Pay later
                                </button>

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
                        <button onClick={this.handleChangeSelectedLot} className="btn btn-outline-primary btn-block">
                            Change Selected Lot
                        </button>
                    </div>

                </div>

            </Fragment>
        )
    }
}
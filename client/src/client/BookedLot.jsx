import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class BookedLot extends Component {
    constructor() {
        super();
        this.handleBookedLot = this.handleBookedLot.bind(this);
        this.state = {
            _id: '',
            userId: '',
            activeLot: [],
            total: 0,
            status: '',
            startedTime: '',
            endedTime: ''
        };
    }

    componentDidMount() {
        this.handleBookedLot();
    }

    handleBookedLot() {
        let _id = localStorage.getItem('_id');
        if (_id) {
            _id = JSON.parse(_id);
            axios
                .get('/rent/user/' + _id)
                .then((res) => {
                    let response = res.data
                    this.setState({
                        _id: response._id,
                        userId: response.userId,
                        activeLot: response.rentedLot,
                        total: response.total,
                        status: response.status,
                        startedTime: response.startedTime,
                        endedTime: response.endedTime
                    });
                    console.log(response)
                })
                .catch((err) => console.log(err));
        } else {
            alert('Please book a new lot');
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.activeLot.map((data) => {
                    return (
                        <div key={data._id} className='container-fluid' style={{ marginTop: "15px" }}>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className="row">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/uploads/lots/${data.image}`}
                                            alt={this.state.userId}
                                            style={{ height: "200px" }}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='row'>
                                                <div className='col-md-6'>Title</div>
                                                <div className='col-md-6'>{data.title}</div>
                                                <div className='col-md-6'>Location</div>
                                                <div className='col-md-6'>{data.location}</div>
                                                <div className='col-md-6'>Price</div>
                                                <div className='col-md-6'>{data.price}</div>
                                                <div className='col-md-6'>Duration</div>
                                                <div className='col-md-6'>{data.duration}</div>
                                                <div className='col-md-6'>Status</div>
                                                <div className='col-md-6'>{this.state.status}</div>
                                                <div className='col-md-6'>Started at</div>
                                                <div className='col-md-6'>{this.state.startedTime}</div>
                                                <div className='col-md-6'>Ended Time</div>
                                                <div className='col-md-6'>{this.state.endedTime}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 text-center">
                                    <div className="row">
                                        <div className="col-md-6">
                                            Total
                                        </div>
                                        <div className="col-md-6">
                                            {this.state.total}
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-outline-success btn-block" disabled={this.state.image} >Pay Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {this.state.activeLot.map(hehe => {
                                        return (
                                            <span>{hehe.description}</span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Fragment>
        );
    }
}

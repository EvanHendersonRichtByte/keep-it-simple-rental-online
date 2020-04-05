import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Logo from '../res/faze clan.png'
export default class BookedLot extends Component {
    constructor() {
        super()
        this.state = {
            userId: '',
            rentedLot: [],
            total: 0,
            status: ''
        }
    }
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-4">
                        <img src={Logo} alt="logo" style={{ height: "120px" }} />
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            based on data
                    </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
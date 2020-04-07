import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal'
export default class PayModal extends Component {
    constructor(props) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.state = {
            image: null
        }
    }

    handleFileChange(e) {
        this.setState({ image: e.target.files[0] })
    }

    handleFormSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        let formData = new FormData()
        formData.append('image', this.state.image)
        const config = { headers: { 'content-type': 'multipart/form-data' } }
        axios.put('/rent/' + this.props._id, formData, config).then(res => {
            alert('Your proof has successfully sended')
            window.location.assign('/')
        }).catch((err) => console.log(err));
    }

    render() {
        return (
            <Modal ariaHideApp={false} isOpen={this.props.modalStatus} onRequestClose={this.props.handleModalStatus}>
                <div className="col text-center">
                    <h4>Please Transfer To The Account Below!</h4>
                    <p>4111 1111 1111 1111</p>
                </div>
                <div className="col">
                    <form onSubmit={this.handleFormSubmit} className="form-block">
                        <div className="form-group">
                            <label htmlFor="image" />
                            <input
                                onChange={this.handleFileChange}
                                type="file"
                                className="form-control-file"
                                name="image"
                                id="image"
                                placeholder="choose file"
                                aria-describedby="fileHelpId"
                            />
                            <button className=" btn btn-outline-primary btn-block">
                                Submit
                       </button>
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
}
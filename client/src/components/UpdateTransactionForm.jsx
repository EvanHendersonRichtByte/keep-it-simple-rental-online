import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
export default class UpdateLotForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            status: 'Used',
            image: null,
        };
    }

    componentDidMount() {
        console.log(this.props)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleFileChange(e) {
        this.setState({ image: e.target.files[0] });
    }

    handleFormSubmit(e) {
        console.log(this.state)
        e.preventDefault();
        let formData = new FormData();
        formData.append('status', this.state.status);
        formData.append('image', this.state.image);
        const config = { headers: { 'content-type': 'multipart/form-data' } };

        axios
            .put('/rent/status/' + this.props.sendedData._id, formData, config)
            .then((res) => {
                console.log(res)
                window.location.assign('/transactions')
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <Fragment>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.props.updateModalStatus}
                    onRequestClose={this.props.handleUpdateModalStatus}
                >
                    <div className='container-fluid'>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='status'>Status</label>
                                    <select onChange={this.handleChange} name="status" className="form-control" value={this.state.status}>
                                        <option value="Used">Used</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='image'>Image</label>
                                    <input onChange={this.handleFileChange} type='file' className='form-control-file' name='image' id='image' />
                                </div>
                            </div>
                            <button type='submit' className='btn btn-success btn-block' required>
                                Submit
							</button>
                        </form>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

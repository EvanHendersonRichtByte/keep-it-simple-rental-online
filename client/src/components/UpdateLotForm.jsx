import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
export default class UpdateLotForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handlePreviousData = this.handlePreviousData.bind(this);
        this.state = {
            _id: props.sendedData._id,
            title: props.sendedData.title,
            location: '',
            description: '',
            contact: '',
            price: '',
            status: '',
            duration: 'Available',
            image: null,
        };
    }

    componentDidMount() {
        console.log(this.props)
        this.handlePreviousData();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleFileChange(e) {
        this.setState({ image: e.target.files[0] });
    }

    handlePreviousData() {
        this.props.sendedData.forEach(data => {
            this.setState({
                title: data.title
            })
        })
    }

    handleFormSubmit(e) {
        console.log(this.state)
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('location', this.state.location);
        formData.append('description', this.state.description);
        formData.append('contact', this.state.contact);
        formData.append('price', this.state.price);
        formData.append('status', this.state.status);
        formData.append('duration', this.state.duration);
        formData.append('image', this.state.image);
        const config = { headers: { 'content-type': 'multipart/form-data' } };

        axios
            .put('/lot/' + this.props.sendedData._id, formData, config)
            .then((res) => {
                console.log(res)
                window.location.assign('/lot')
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
                    <button className="btn btn-outline-primary" onClick={() => console.log(this.state)} >Get</button>
                    <div className='container-fluid'>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='title'>Title</label>
                                    <input
                                        value={this.props.title}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='title'
                                        id='title'
                                        placeholder={this.props.sendedData.title}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='location'>Location</label>
                                    <input
                                        value={this.state.location}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='location'
                                        id='location'
                                        placeholder={this.props.sendedData.location}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='description'
                                        id='description'
                                        placeholder={this.props.sendedData.description}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='contact'>Contact</label>
                                    <input
                                        value={this.state.contact}
                                        onChange={this.handleChange}
                                        type='number'
                                        className='form-control'
                                        name='contact'
                                        id='contact'
                                        placeholder={this.props.sendedData.contact}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='price'>Price</label>
                                    <input
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                        type='number'
                                        className='form-control'
                                        name='price'
                                        id='price'
                                        placeholder={this.props.sendedData.price}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='status'>Status</label>
                                    <select onChange={this.handleChange} name="status" className="form-control" value={this.state.status}>
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='duration'>Duration</label>
                                    <input
                                        value={this.state.duration}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='duration'
                                        id='duration'
                                        placeholder={this.props.sendedData.duration}
                                        required
                                    />
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

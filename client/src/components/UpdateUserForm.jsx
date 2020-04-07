import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
export default class UpdateUserForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            _id: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            description: '',
            email: '',
            age: '',
            address: '',
            country: '',
            phoneNumber: '',
            role: 'User',
            status: 'Active',
            image: null
        };
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
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('description', this.state.description);
        formData.append('email', this.state.email);
        formData.append('age', this.state.age);
        formData.append('address', this.state.address);
        formData.append('country', this.state.country);
        formData.append('phoneNumber', this.state.phoneNumber);
        formData.append('role', this.state.role);
        formData.append('status', this.state.status);
        formData.append('image', this.state.image);
        const config = { headers: { 'content-type': 'multipart/form-data' } };
        axios.put('/admin/user/' + this.props.sendedData._id, formData, config).then(res => {
            window.location.assign('/users')
        }).catch((err) => console.log(err));
    }

    render() {
        return (
            <Fragment>
                <Modal ariaHideApp={false} isOpen={this.props.updateModalStatus} onRequestClose={this.props.handleUpdateModalStatus}>
                    <button onClick={() => console.log(this.state)}>get</button>
                    <div className='container-fluid'>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='username'>Username</label>
                                    <input
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='username'
                                        id='username'
                                        placeholder={this.props.sendedData.username}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='password'
                                        id='password'
                                        placeholder={this.props.sendedData.password}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='firstName'>firstName</label>
                                    <input
                                        value={this.state.firstName}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='firstName'
                                        id='firstName'
                                        placeholder={this.props.sendedData.firstName}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='lastName'>lastName</label>
                                    <input
                                        value={this.state.lastName}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='lastName'
                                        id='lastName'
                                        placeholder={this.props.sendedData.lastName}
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
                                    <label htmlFor='email'>email</label>
                                    <input
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='email'
                                        id='email'
                                        placeholder={this.props.sendedData.email}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='age'>age</label>
                                    <input
                                        value={this.state.age}
                                        onChange={this.handleChange}
                                        type='number'
                                        className='form-control'
                                        name='age'
                                        id='age'
                                        placeholder={this.props.sendedData.age}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='address'>address</label>
                                    <input
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='address'
                                        id='address'
                                        placeholder={this.props.sendedData.address}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='country'>country</label>
                                    <input
                                        value={this.state.country}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='country'
                                        id='country'
                                        placeholder={this.props.sendedData.country}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='phoneNumber'>Phone Number</label>
                                    <input
                                        value={this.state.phoneNumber}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        name='phoneNumber'
                                        id='phoneNumber'
                                        placeholder={this.props.sendedData.phoneNumber}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='role'>Role</label>
                                    <select onChange={this.handleChange} name="role" className="form-control" value={this.state.role}>
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row d-block'>
                                <div className='form-group'>
                                    <label htmlFor='status'>Status</label>
                                    <select onChange={this.handleChange} name="status" className="form-control" value={this.state.status}>
                                        <option value="Active">Active</option>
                                        <option value="Passive">Passive</option>
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

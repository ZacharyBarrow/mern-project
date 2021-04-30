import React, { Component } from 'react';
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password:'',
        }
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            createdDate: new Date()
        }

        console.log(user);
        axios.post('http://localhost:3650/users/add', user)
            .then(res => console.log(res.data));
        window.location='/u/'+ this.state.username;
    }
    render() {
        return(
            <div>
                <h3>Sign Up</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                            required
                            className="form-control"
                            autoComplete={false}
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Sign Up" className="btn btn-primary" onClick={this.onSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}
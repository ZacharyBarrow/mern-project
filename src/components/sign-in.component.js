import React, { Component } from 'react';
import axios from 'axios';

export default class SignIn extends Component {
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
            password: this.state.password
        }

        axios.get('http://localhost:3650/users/signin/', user)
            .then(response => {
                console.log(response.data)
                this.setState( { username : response.data.username })
            })
            .catch(error => {
                console.log(error);
            });
        console.log(user);
        // axios.get('http://localhost:3650/users/add', user)
        //     .then(res => console.log(res.data));
        // this.setState({username:'', password:''});
        //window.location='/';
    }
    render() {
        return(
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Sign In" className="btn btn-primary" onClick={this.onSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}
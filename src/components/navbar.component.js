import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.onChangeSearchUser = this.onChangeSearchUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            sessionUser:'',
            searchUser: '',
        }
    }
    onChangeSearchUser(e) {
        this.setState({
            searchUser: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.searchUser,
        }
        if(this.state.searchUser){
            window.location= '/u/'+ this.state.searchUser;
        }
        
    }

    render() {
        return(
            <nav className="navbar narvbar-light bg-light navbar-expand-sm">
                <Link to="/" className="navbar-brand">Unlisted</Link>
                <form class="form-inline" action="/action_page.php">
                    <div class="input-group">
                    <div class="input-group-prepend">
                        <span className="input-group-text" onClick={this.onSubmit}>@</span>
                    </div>
                    <input type="text" class="form-control" placeholder="Username" value={this.state.searchUser} onChange={this.onChangeSearchUser}/>
                    </div>
                </form>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item-active">
                            <Link to="/" className="nav-link">Posts</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Post</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="navbar-item" hidden={true}>
                            <Link to="/signin" className="nav-link">Sign In</Link>
                        </li>
                        <li className="navbar-item">
                            {this.state.sessionUser}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
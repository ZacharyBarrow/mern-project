import React, { Component } from 'react';
import axios from 'axios';

const Post = props => (
    <tr>
        <td>{props.post.description}</td>
        <td>{props.post.date.substring(0,10)}</td>
    </tr>
)

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            hashedPassword:'',
            createdDate: Date(),
            id:'',
            posts:[]
        }
        this.listPosts = this.listPosts.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    listPosts() {
        return this.state.posts.map(currentPost => {
            if(currentPost.username === this.props.match.params.username)
                return <Post post={currentPost} key={currentPost.username}/>;
        });
    }

    onDelete(e) {
        e.preventDefault();
        axios.delete('http://localhost:3650/users/'+this.state.id)
            .then(res => console.log(res.data));
        this.state.posts.map(post => {
            if(post.username === this.props.match.params.username)
                axios.delete('http://localhost:3650/posts/'+post._id)
                    .then(res => console.log(res.data));
        })
        window.location="/"
    }

    componentDidMount() {
        axios.get('http://localhost:3650/users/' + this.props.match.params.username)
            .then(response => {
                console.log(response.data)
                this.setState( 
                { 
                    username : response.data.username,
                    hashedPassword:response.data.password,
                    createdDate: response.data.createdDate,
                    id:response.data._id
                })
            })
            .catch(error => {
                console.log(error);
            });
        axios.get('http://localhost:3650/posts/'+ this.state.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    posts:response.data
                })
            })
    }

    render() {
        return(
            <div>
                <h3>{this.state.username}</h3>
                <form onSubmit={this.onDelete}>
                    <div className="form-group">
                        <label>User ID: {this.state.id}</label>
                    </div>
                    <div className="form-group">
                        <label>Hashed Password: {this.state.hashedPassword}</label>
                    </div>
                    <div className="form-group">
                        <label>Date Joined: {this.state.createdDate.substring(0,10)}</label>
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Delete User" className="btn btn-primary" onClick={this.onDelete}/>
                    </div>
                </form>
            { (this.state.posts.length > 0) ? 
                <div>
            <h3>Posts</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.listPosts()}
                </tbody>
             </table>
             </div>
             : <div></div>
        }
        </div>
        )
    }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Post = props => (
    <tr>
        <td>{props.post.username}</td>
        <td>{props.post.description}</td>
        <td>{props.post.date.substring(0,10)}</td>
        <td class="container-fluid justify-content-start">
            <form>
                <Link class="btn btn-outline-success" to={"/edit/"+props.post._id}>Edit</Link>
                <button class="btn btn-outline-secondary" type="submit" onClick={() => {props.deletePost(props.post._id)}}>Delete</button>
            </form>
        </td>
    </tr>
)

export default class ListPosts extends Component {
    constructor(props){
        super(props);
        this.state = { posts: [] };

        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3650/posts/')
            .then(response => {
                this.setState( { posts : response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    listPosts() {
        return this.state.posts.map(currentPost => {
            return <Post post={currentPost} deletePost = {this.deletePost} key={currentPost._id}/>;
        })
    }

    deletePost(id) {
        axios.delete('http://localhost:3650/posts/'+id)
            .then(res => console.log(res.data));
        this.setState({
            posts: this.state.posts.filter(postId =>  postId._id !== id)
        });
    }
    render() {
        return(
            <div>
                <h3>Posts</h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Username</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.listPosts()}
                    </tbody>
                 </table>
            </div>
        );
    }
}
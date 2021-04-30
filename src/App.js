import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ListPosts from "./components/list-posts.component";
import EditPost from "./components/edit-post.component";
import CreatePost from "./components/create-post.component";
import SignUp from "./components/sign-up.component";
import SignIn from "./components/sign-in.component";
import User from "./components/user.component";


function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar/>
        <br/>
        <Route path="/" exact component={ListPosts}/>
        <Route path="/edit/:id" exact component={EditPost}/>
        <Route path="/create" exact component={CreatePost}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/signin" exact component={SignIn}/>
        <Route path="/u/:username" exact component={User}/>
      </div>
    </Router>
  );
}

export default App;

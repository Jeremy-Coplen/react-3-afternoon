import React, { Component } from 'react';
import axios from "axios"
import Post from "./Post/Post"

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.SearchPost = this.SearchPost.bind(this)
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts")
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  updatePost(id, post) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text: post})
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  createPost(text) {
    axios.post("https://practiceapi.devmountain.com/api/posts", {text})
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  SearchPost(text) {
    const arr = this.state.posts.filter((item) => item.text.includes(text))

    if(text === "") {
      console.log(arr)
      axios.get("https://practiceapi.devmountain.com/api/posts")
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    }

    else{
      this.setState({
        posts: arr
      })
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header 
        searchPostFn={this.SearchPost}/>

        <section className="App__content">

          <Compose 
          createPostFn={this.createPost}/>
          {posts.map(item => {
            return (
              <Post key={item.id}
              text={item.text}
              date={item.date}
              updatePostFn={this.updatePost}
              id={item.id}
              deletePostFn={this.deletePost}/>
            )
          })}
        </section>
      </div>
    );
  }
}

export default App;

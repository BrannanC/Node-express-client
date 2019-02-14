import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    posts: [],
    newPost: {
      title: "",
      contents: ""
    }
  }

  componentDidMount(){
    axios
      .get('http://localhost:4000/api/posts')
      .then(res => {
        this.setState({
          posts: res.data.posts
        })
      })
      .catch(err => console.log(err))
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      newPost: {...prevState.newPost,
        [name]: value
      }
    }))
  }

  addPost = (e, post) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/posts', post)
      .then(res => {
        this.setState(prevState => ({
          posts: [...prevState.posts, res.data.post[0]],
          newPost: {
            title: "",
            contents: ""
          }
        }))
      })
      .catch(err => console.log(err))
  }

  delPost = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/api/posts/${id}`)
      .then(res => {
        this.setState(prevState => ({
          posts: prevState.posts.filter(post => post.id !== id)
        }))
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Posts</h1>
          <form onSubmit={e => this.addPost(e, this.state.newPost)}>
            <input type="text" 
                  name="title" 
                  placeholder="Title..." 
                  value={this.state.newPost.title} 
                  onChange={this.changeHandler}
                  />
            <textarea 
                  name="contents" 
                  placeholder="Contents..." 
                  value={this.state.newPost.contents} 
                  onChange={this.changeHandler}
                  />
            <button type="submit">Add post</button>
          </form>

          <div className="posts-list">
            {this.state.posts.length > 0 && this.state.posts.map(post => {
              return (
                <div className="post" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.contents}</p>
                <button onClick={e => this.delPost(e, post.id)}>Delete Post</button>
              </div>
              );

            })}
          </div>
        </header>
      </div>
    );
  }
}

export default App;

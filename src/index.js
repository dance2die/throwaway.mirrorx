import React, { Component } from "react";
import styled from "styled-components";
import mirror, { actions, connect, render } from "mirrorx";

import "./styles.css";

const Post = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dotted #ccc;
  padding: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #c0ff33;
  }
`;

mirror.model({
  name: "app",
  initialState: {
    posts: []
  },
  reducers: {
    addPosts: (state, posts) => ({ ...state, posts })
  },
  effects: {
    async getAllPosts() {
      const posts = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"
      ).then(response => response.json());
      actions.app.addPosts(posts);
    }
  }
});

class App extends Component {
  componentDidMount = async () => {
    await actions.app.getAllPosts();
  };

  render() {
    console.log(this.props);
    return (
      // <div>{this.props.posts.map(post => <Post key={post} post={post} />)}</div>
      <div>
        <h1>post IDs!</h1>
        {this.props.posts.map(post => (
          <Post key={post.id}>
            <h3>{post.title}</h3>
            <div>{post.body}</div>
          </Post>
        ))}
      </div>
    );
  }
}

const AppWrapper = connect(state => {
  return { posts: state.app.posts };
})(App);

render(<AppWrapper />, document.getElementById("root"));

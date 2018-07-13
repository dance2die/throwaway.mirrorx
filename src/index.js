import React, { Component } from "react";
import styled from "styled-components";
import mirror, { actions, connect, render } from "mirrorx";

import "./styles.css";

const Post = styled.div`
  display: flex;
  flex-direction: column;
`;

mirror.model({
  name: "app",
  initialState: {
    posts: []
  },
  reducers: {
    addPost: (state, post) => {
      console.log(`addPost state=${state.posts}, post=${post}`);
      return { ...state.posts, post };
    }
  },
  effects: {
    async addPosts() {
      actions.app.addPost(1);
      actions.app.addPost(2);
      actions.app.addPost(3);
    }
  }
});

class App extends Component {
  componentDidMount = async () => {
    await actions.app.addPosts();
  };

  render() {
    console.log(this.props);
    return (
      // <div>{this.props.posts.map(post => <Post key={post} post={post} />)}</div>
      <div>Hi!</div>
    );
  }
}

const AppWrapper = connect(state => {
  return { posts: state.app };
})(App);

render(<AppWrapper />, document.getElementById("root"));

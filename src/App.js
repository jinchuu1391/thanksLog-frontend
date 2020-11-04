import React from "react";
import { Route } from "react-router-dom";
import Login from "./pages/Login";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";
import SignUp from "./pages/SignUp";
import Write from "./pages/Write";

function App() {
  return (
    <div>
      <Route component={PostList} path="/" exact></Route>
      <Route component={Login} path="/login"></Route>
      <Route component={PostView} path="/post/:postId"></Route>
      <Route component={SignUp} path="/signup"></Route>
      <Route component={Write} path="/write"></Route>
    </div>
  );
}

export default App;

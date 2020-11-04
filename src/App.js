import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import PostViewPage from "./pages/PostViewPage";
import SignUpPage from "./pages/SignUpPage";
import WritePage from "./pages/WritePage";

function App() {
  return (
    <div>
      <Route component={PostListPage} path="/" exact></Route>
      <Route component={LoginPage} path="/login"></Route>
      <Route component={PostViewPage} path="/post/:postId"></Route>
      <Route component={SignUpPage} path="/signup"></Route>
      <Route component={WritePage} path="/write"></Route>
    </div>
  );
}

export default App;

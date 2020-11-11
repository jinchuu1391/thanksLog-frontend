import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import PostViewPage from "./pages/PostViewPage";
import SignUpPage from "./pages/SignUpPage";
import WritePage from "./pages/WritePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div>
      <Switch>
        <Route component={PostListPage} path="/" exact></Route>
        <Route component={LoginPage} path="/login"></Route>
        <Route component={WritePage} path="/write"></Route>
        <Route component={ProfilePage} path="/@:email"></Route>
        <Route component={PostViewPage} path="/:postId" exact></Route>
        <Route component={SignUpPage} path="/signup"></Route>
      </Switch>
    </div>
  );
}

export default App;

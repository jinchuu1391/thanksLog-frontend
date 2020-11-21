const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState = {
  isLoggedIn: false,
  user: "",
};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        isLoggedIn: true,
        user: action.user,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
        user: "",
      };
    default:
      return state;
  }
}

export default auth;

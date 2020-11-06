const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState = {
  isLoggedIn: false,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

export default auth;

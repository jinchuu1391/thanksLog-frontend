const CHANGE_TITLE = "CHANGE_TITLE";
const CHANGE_BODY = "CHANGE_BODY";

const initialState = {
  title: "",
  body: "",
};

function post(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case CHANGE_BODY:
      return {
        ...state,
        body: action.body,
      };
    default:
      return state;
  }
}

export default post;

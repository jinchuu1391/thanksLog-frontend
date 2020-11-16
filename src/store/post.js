const CHANGE_TITLE = "CHANGE_TITLE";
const CHANGE_BODY = "CHANGE_BODY";
const INITIALIZE = "INITIALIZE";
const EDIT_MODE = "EDIT_MODE";

const initialState = {
  id: "",
  title: "",
  body: "",
  editMode: false,
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
    case INITIALIZE:
      return {
        title: "",
        body: "",
        id: "",
        editMode: false,
      };
    case EDIT_MODE:
      return {
        ...state,
        id: action.id,
        editMode: true,
      };
    default:
      return state;
  }
}

export default post;

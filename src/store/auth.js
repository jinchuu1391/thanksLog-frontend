const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const PROFILE_LOADED = "PROFILE_LOADED";
const PROFILE_INITIALIZE = "PROFILE_INITIALIZE";
const PROFILE_EDIT_MODE_CHANGE = "PROFILE_EDIT_MODE_CHANGE";
const NAME_CHANGE = "NAME_CHANGE";
const INTRODUCE_CHANGE = "INTRODUCE_CHANGE";

const initialState = {
  isLoggedIn: false,
  user: "",
  editMode: false,
  nameToEdit: "",
  introduceToEdit: "",
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
        editMode: false,
        nameToEdit: "",
        introduceToEdit: "",
      };
    case PROFILE_LOADED:
      return {
        ...state,
        nameToEdit: action.name,
        introduceToEdit: action.introduce,
      };
    case PROFILE_INITIALIZE:
      return {
        ...state,
        nameToEdit: "",
        introduceToEdit: "",
      };
    case NAME_CHANGE:
      return {
        ...state,
        nameToEdit: action.name,
      };
    case INTRODUCE_CHANGE:
      return {
        ...state,
        introduceToEdit: action.introduce,
      };
    case PROFILE_EDIT_MODE_CHANGE:
      return {
        ...state,
        editMode: action.mode,
      };
    default:
      return state;
  }
}

export default auth;

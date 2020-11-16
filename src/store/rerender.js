const RERENDER = "RERENDER";

const initialState = {
  rerender: false,
};

function rerender(state = initialState, action) {
  switch (action.type) {
    case RERENDER:
      return {
        rerender: !state.rerender,
      };
    default:
      return state;
  }
}

export default rerender;

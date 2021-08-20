const SET_FAILREASON = "SET_FAILREASON";

const initialState = {
  failReason:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAILREASON:
      return applySetFailReason(state, action);
    default:
      return state;
  }
};

const setFailReason = (failReason) => {
  return {
    type: SET_FAILREASON,
    failReason
  };
};

const applySetFailReason = (state, action) => {
  const { failReason } = action;
  return {
    ...state,
    failReason,
  };
};

export default reducer;
export const actionCreators = {
    setFailReason
};

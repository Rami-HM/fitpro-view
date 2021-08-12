const SET_MEMBER = "SET_MEMBER";

const initialState = {
  SET_MEMBER: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER:
      return applySetMember(state, action);
    default:
      return state;
  }
};

const setMember = (member) => {
  return {
    type: SET_MEMBER,
    member
  };
};

const applySetMember = (state, action) => {
  const { member } = state;

  return {
    ...state,
    member,
  };
};

export default reducer;
export const actionCreators = {
  setMember,
};

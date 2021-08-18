const SET_MEMBER = "SET_MEMBER";
const SET_TOT_MEMBER = 'SET_TOT_MEMBER'

const initialState = {
  member: {},
  totMemberList:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER:
      return applySetMember(state, action);
    case SET_TOT_MEMBER:
      return applySetTotMember(state, action);
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
  const { member } = action;
  return {
    ...state,
    member,
  };
};
const setTotMember = (totMemberList) => {
  return {
    type: SET_TOT_MEMBER,
    totMemberList
  };
};

const applySetTotMember = (state, action) => {
  const { totMemberList } = action;

  return {
    ...state,
    totMemberList,
  };
};

export default reducer;
export const actionCreators = {
  setMember,
  setTotMember,
};

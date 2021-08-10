const SET_USERS = "SET_USERS";

const SET_USER = "SET_USER";

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return applySetUsers(state, action);

    case SET_USER:
      return applySetUser(state, action);

    default:
      return state;
  }
};

const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

const applySetUsers = (state, action) => {
  const { users } = action;

  return {
    ...state,
    users,
  };
};

const setUser = (id, user) => {
  return {
    type: SET_USER,
    id,
    user,
  };
};

const applySetUser = (state, action) => {
  const { id, user } = action;
  const { users } = state;

  const nextUsers = users.map((prevUser) =>
    prevUser.id === id ? user : prevUser
  );

  return {
    ...state,
    users: nextUsers,
  };
};

export default reducer;
export const actionCreators = {
  setUsers,
  setUser,
};

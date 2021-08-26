const SHOW_TOAST = "SHOW_TOAST";
const CLOSE_TOAST = "CLOSE_TOAST";

const initialState = {
  msg: "",
  isShow: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return applyShowToast(state, action);

    case CLOSE_TOAST:
      return applyCloseToast(state, action);

    default:
      return state;
  }
};

const showToast = (msg) => {
  return {
    type: SHOW_TOAST,
    isShow: true,
    msg,
  };
};

const closeToast = () => {
  return {
    type: CLOSE_TOAST,
    isShow: false,
  };
};

const applyShowToast = (state, action) => {
  const { isShow,msg } = action;

  return {
    ...state,
    isShow,
    msg
  };
};

const applyCloseToast = (state, action) => {
  const { isShow } = action;

  return {
    ...state,
    isShow,
    msg : ''
  };
};

export default reducer;
export const actionCreators = {
  showToast,
  closeToast,
};

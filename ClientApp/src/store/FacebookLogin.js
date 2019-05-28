const receiveLoginFB = 'RECEIVE_LOGIN_FB';
const logoutFB = 'LOGOUT_FB';
const initialState = {
  fbContent: null
};

export const actionCreators = {
  logout: () => ({ type: logoutFB }),
  login: (response) => async (dispatch) => {
      if(!response.userID) return;
      
      var fbContent = {
        userID: response.userID,
        name: response.name,
        first_name: response.first_name,
        email: response.email,
        picture: response.picture.data.url
      };

    dispatch({ type: receiveLoginFB, fbContent });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === receiveLoginFB) {
    return { ...state, fbContent: action.fbContent};
  }

  if (action.type === logoutFB) {
    return { ...state, ...initialState };
  }

  return state;
};

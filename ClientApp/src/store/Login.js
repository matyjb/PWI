const setLogin = 'SET_LOGIN';
const logout = 'LOGOUT';
const initialState = {
  login:{
    token: "",
    tokenExpirationTime: 0,
    id: "",
  }
};

export const actionCreators = {
  logout: () => ({ type: logout }),
  setLogin: (stuff) => ({type: setLogin, stuff})
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === setLogin) {
    return { ...state, login: action.stuff};
  }

  if (action.type === logout) {
    return { ...state, ...initialState };
  }

  return state;
};

export const AuthReducer = (
  state = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading:true,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_REGISTER_FAILURE":
    case "AUTH_LOGIN_FAILURE":
    case "AUTH_LOGOUT_FAILURE":
      return {
        ...state,
        user: null,
        accessToken: null,
        error: action.payload,
        loading:true,
        isAuthenticated: false,
      };
    case "AUTH_LOGOUT_SUCCESS":
      return {
        ...state,
        user: null,
        accessToken: null,
        isAuthenticated: true,
        loading:true,
        user: null, 
      };
    case "HYDRATE_USER":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
        loading:false,
        user: action.payload.userData,
        error: null,
      };
    default:
      return state;
  }
};

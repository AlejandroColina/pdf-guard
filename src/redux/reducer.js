const initialState = {
  auth: false,
  authStorage: false,
  checkEmail: undefined,
  lossPassword: null,
  files: [],
  faculties: [],
  currentUser: {},
  newFile: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "AUTH":
      return {
        ...state,
        auth: payload,
      };
    case "CHECK_EMAIL":
      return {
        ...state,
        checkEmail: payload,
      };
    case "CLOSE_AUTH":
      return {
        ...state,
        auth: payload,
      };
    case "LOSS_PASSWORD":
      return {
        ...state,
        lossPassword: payload,
      };
    case "SET_AUTH_TRUE":
      return {
        ...state,
        authStorage: payload,
      };
    case "SET_AUTH_FALSE":
      return {
        ...state,
        authStorage: payload,
      };
    case "GET_FILES":
      return {
        ...state,
        files: payload,
      };
    case "GET_FACULTIES":
      return {
        ...state,
        faculties: payload,
      };
    case "GET_USER":
      return {
        ...state,
        currentUser: payload,
      };
    case "NEW_FILE":
      return {
        ...state,
        newFile: payload,
      };
    case "DELETE_FILE":
      return {
        ...state,
      };

    default:
      return state;
  }
};

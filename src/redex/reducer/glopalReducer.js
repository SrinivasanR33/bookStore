const initialState = {
  getBooklist: [],
  mainOption: 0,
  loginState: false,
  loginToken: null,
  getuserList: [],
  imageUrl:'',
  bookSearch:[]
};

const glopalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return {
        ...state,
        getBooklist: action.payload,
      };
    case "GET_BOOK_SEARCH":
      return {
        ...state,
        bookSearch: action.payload,
      };
    case "USER_LIST":
      return {
        ...state,
        getuserList: action.payload,
      };
    case "IMAGE_URL":
      return {
        ...state,
        imageUrl: action.payload,
      };
    case "LOGINSTATE":
      return {
        ...state,
        loginState: action.payload,
      };
    case "LOGINS_TOKEN":
      return {
        ...state,
        loginToken: action.payload,
      };
    case "MAIN_SCREEN_OPTION":
      return {
        ...state,
        mainOption: action.payload,
      };

    default:
      return state;
  }
};

export default glopalReducer;

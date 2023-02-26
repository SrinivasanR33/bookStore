const initialState = {
  getuserList: [],
  
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LIST":
      return {
        ...state,
        getuserList: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;

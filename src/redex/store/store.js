/* eslint-disable import/no-anonymous-default-export */
import glopalReducer from "../reducer/glopalReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  compose,
} from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { encryptTransform } from 'redux-persist-transform-encrypt';
import thunk from "redux-thunk";
import userReducer from "../reducer/userReducer";

let middleware = [];
middleware = [...middleware, thunk];

const persistConfig = {
  key: "book=store",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "diahome-secret-key",
      onError: function(error) {
        // Handle the error.
        console.log(error);
      },
    }),
  ],
};
const reducer = combineReducers({
  global: glopalReducer,
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer)
// export const store = createStore(
//   reducer,
//   compose(composeWithDevTools(applyMiddleware(...middleware)))
// );
export const store = createStore(
  persistedReducer,
  compose(composeWithDevTools(applyMiddleware(...middleware)))
);

// export default store;
export const persistor = persistStore(store);

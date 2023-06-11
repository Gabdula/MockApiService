import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserReducer";
import ModalInfoReducer from "./ModalInfoReducer";

const rootReducer = combineReducers({
  userStore: userReducer,
  modalInfo: ModalInfoReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
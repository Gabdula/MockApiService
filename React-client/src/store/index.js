import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/UserReducer";
import ModalInfoReducer from "./Reducers/ModalInfoReducer";
import ProjectReducer from "./Reducers/ProjectReducer";
import ModelReducer from "./Reducers/ModelReducer";

const rootReducer = combineReducers({
  userStore: userReducer,
  modalInfo: ModalInfoReducer,
  projectStore: ProjectReducer,
  modelStore:  ModelReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
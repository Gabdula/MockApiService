import { createSlice } from "@reduxjs/toolkit";

const modalInfoSlice = createSlice({
  name: "modalInfo",
  initialState: {
    modal: {
      modalActive: false,
      imgInfo: '',
      title: '',
      text: '',
    }
  },
  reducers: {
    setModalInfo(state, action){
      state.modal.modalActive = action.payload?.modalActive;
      state.modal.imgInfo = action.payload?.imgInfo;
      state.modal.title = action.payload?.title;
      state.modal.text = action.payload?.text;
    }
  }
})

export default modalInfoSlice.reducer
export const { setModalInfo } = modalInfoSlice.actions
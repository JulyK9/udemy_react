import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer, // reducer는 uiSlice에 의해 만들어짐, selector로 store에서 값에 접근할 때 속성값
  },
});

export default store;

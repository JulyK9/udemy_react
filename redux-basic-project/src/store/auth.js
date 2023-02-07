import { createSlice } from "@reduxjs/toolkit";

// 다른 slice를 생성
const initialAuthState = {
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

// 컴포넌트에서 사용할 액션 추가
export const authActions = authSlice.actions;

export default authSlice.reducer; // 코드 분할시 export와 import 방법에 유의

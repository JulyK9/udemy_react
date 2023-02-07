// import { createStore } from "redux";
// import { createSlice, configureStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; // 코드 분할시 export와 import 방법에 유의
import counterReducer from "./counter"; // 코드 분할시 export와 import 방법에 유의

// 리덕스의 createStore 메서드로 저장소(store)를 생성
// 저장소의 매개변수에 리듀서 함수를 구독
// const store = createStore(counterReducer);

// toolkit용 configureStore로 store를 만들고 slice 에서 설정한 리듀서에 접근할 수 있도록 연결
// const store = configureStore(counterSlice.reducer);
const store = configureStore({
  // reducer: counterSlice.reducer,
  reducer: {
    // counter: counterSlice.reducer, // 사용 컴포넌트에서 식별자를 통해 접근해줘야 함을 유의
    counter: counterReducer, // 코드 분할시 export와 import 방법에 유의
    // auth: authSlice.reducer,
    auth: authReducer, // 코드 분할시 export와 import 방법에 유의
  },

  // 상태 slice가 여러개인 큰 규모 앱 같은 경우 아래와 같이 객체를 설정해서
  // 객체 안에 원하는 속성 이름을 정하고 키값을 설정하고 리듀서 맵을 생성해서 사용할 수 있음
  // configureStore가 여러 리듀서를 하나의 큰 리듀서로 병합함
  // reducer: { counter: counterSlice.reducer },
});

// 리액트에서는 외부 컴포넌트에서 사용할 수 있도록 export
export default store;

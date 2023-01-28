// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

// 상태 객체는 하나로 다뤄져야 하므로 type에 따라 로직을 반영해서 리턴할 때 각 상태에 대한 로직을 모두 반영해줘야 함상태
const initialState = { counter: 0, showCounter: true };

// toolkit용 slice 생성
const counterSlice = createSlice({
  name: "counter", // 상태 식별자
  // initialState: initialState, // 초기 상태 설정
  initialState, // 초기 상태 설정
  reducers: {
    increment(state) {
      state.counter++; // toolkit은 immer 라는 내장 패키지를 사용해서 원본 상태를 변경되지 않게 해줘서 이렇게 사용 가능
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // action에 붙는 데이터가 필요하다면 action을 매개변수로 받아서 사용
      state.counter = state.counter + action.value;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const INCREMENT = "increment";

// // store에 상태와 액션을 정의하고 실행하는 리듀서 함수 설정
// const counterReducer = (state = initialState, action) => {
//   if (action.type === INCREMENT) {
//     // state.counter++
//     // return state;
//     // return {
//     // counter: state.counter,
//     // showCounter: state.showCounter
//     // }
//     // 작동된다하더라도 절대 이런 방식으로 기존 원본 state를 직접 변형(mutate)해서는 안됨!!

//     // 항상 새로운 state 객체를 반환하며 거기서 재정의해줘야 함
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "increase") {
//     return {
//       counter: state.counter + action.value, // action 객체의 속성으로 설정된 키값을 불러오는 것 => action의 payload 추출
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "decrement") {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "toggle") {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter,
//     };
//   }

//   return state;
// };

// 리덕스의 createStore 메서드로 저장소(store)를 생성
// 저장소의 매개변수에 리듀서 함수를 구독
// const store = createStore(counterReducer);

// toolkit용 configureStore로 store를 만들고 slice 에서 설정한 리듀서에 접근할 수 있도록 연결
// const store = configureStore(counterSlice.reducer);
const store = configureStore({
  reducer: counterSlice.reducer,

  // 상태 slice가 여러개인 큰 규모 앱 같은 경우 아래와 같이 객체를 설정해서
  // 객체 안에 원하는 속성 이름을 정하고 키값을 설정하고 리듀서 맵을 생성해서 사용할 수 있음
  // configureStore가 여러 리듀서를 하나의 큰 리듀서로 병합함
  // reducer: { counter: counterSlice.reducer },
});

// 리액트에서는 외부 컴포넌트에서 사용할 수 있도록 export
export default store;

import { createSlice } from "@reduxjs/toolkit";

// 상태 객체는 하나로 다뤄져야 하므로 type에 따라 로직을 반영해서 리턴할 때 각 상태에 대한 로직을 모두 반영해줘야 함상태
// const initialState = { counter: 0, showCounter: true };
const initialCounterState = { counter: 0, showCounter: true }; // for 상태 관심사 분리

// toolkit용 slice 생성
const counterSlice = createSlice({
  name: "counter", // 상태 식별자
  // initialState: initialState, // 초기 상태 설정
  // initialState, // 초기 상태 설정
  initialState: initialCounterState, // 초기 상태 설정
  reducers: {
    increment(state) {
      state.counter++; // toolkit은 immer 라는 내장 패키지를 사용해서 원본 상태를 변경되지 않게 해줘서 이렇게 사용 가능
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // action에 붙는 데이터가 필요하다면 action을 매개변수로 받아서 사용
      // state.counter = state.counter + action.value;
      // toolkit 에서는 payload 라는 정해진 필드명을 사용함 유의
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// counterSlice.actions // 액션 식별자에 접근하기 위한 값
// counterSlice.actions.toggleCounter // 접근하여 해당 메서드를 호출하면 액션 객체가 생성됨

// export const INCREMENT = "increment";

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

// 컴포넌트에서 사용할 액션 추가
// 리듀서 메서드 이름을 key로 가진 객체를 counterActions 라는 변수로 정하고 export 해서 컴포넌트에서 가져다 사용
export const counterActions = counterSlice.actions;

// export default counterSlice;
export default counterSlice.reducer; // 코드 분할시 export와 import 방법에 유의

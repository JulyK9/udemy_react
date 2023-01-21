import { createStore } from "redux";

// 상태와 액션을 정의하고 실행하는 리듀서 함수 설정
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.value, // action 객체의 속성으로 설정된 키값을 불러오는 것 => action의 payload 추출
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

// 리덕스의 createStore 메서드로 저장소(store)를 생성
// 저장소의 매개변수에 리듀서 함수를 구독
const store = createStore(counterReducer);

// 리액트에서는 외부 컴포넌트에서 사용할 수 있도록 export
export default store;

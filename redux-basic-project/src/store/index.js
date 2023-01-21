import { createStore } from "redux";

// 상태 객체는 하나로 다뤄져야 하므로 type에 따라 로직을 반영해서 리턴할 때 각 상태에 대한 로직을 모두 반영해줘야 함상태
const initialState = { counter: 0, showCounter: true };

// 상태와 액션을 정의하고 실행하는 리듀서 함수 설정
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.value, // action 객체의 속성으로 설정된 키값을 불러오는 것 => action의 payload 추출
      showCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }

  return state;
};

// 리덕스의 createStore 메서드로 저장소(store)를 생성
// 저장소의 매개변수에 리듀서 함수를 구독
const store = createStore(counterReducer);

// 리액트에서는 외부 컴포넌트에서 사용할 수 있도록 export
export default store;

import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux"; // 리덕스 저장소의 데이터에 접근하기 위한 useSelector
import { counterActions } from "../store";
// import { Component } from "react"; // for 클래스 기반 컴포넌트 사용
// import { connect } from "react-redux"; // 클래스 기반 컴포넌트에서도 리덕스를 연결해주는 방법

const Counter = () => {
  const dispatch = useDispatch(); // 저장소(store)에 action을 보내는 함수

  // 저장소에서 다루는 값에 접근하려면 useSelector로 각각 접근해줘야 함
  // const counter = useSelector((state) => state.counter);
  const counter = useSelector((state) => state.counter.counter);
  // const toggleShow = useSelector((state) => state.showCounter);
  const toggleShow = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    // dispatch({ type: INCREMENT }); // dispatch 함수에 인자로 전달하는 객체는 type 속성을 명시해서 어떤 action 인지 알 수 있게
    dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    // dispatch({ type: "increase", value: 5 });
    dispatch(counterActions.increase(5));
  };

  const decrementHandler = () => {
    // dispatch({ type: "decrement" });
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    // dispatch({ type: "toggle" });
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {toggleShow && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment(); // mapDispatchToProps를 통해 increment 라는 함수를 맵핑해놨기때문
//   }

//   decrementHandler() {
//     this.props.decrement();
//   }

//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         {/* mapStateToProps를 통해 props로 맵핑해놨으므로 쓸수 있는 것 */}
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// // 리덕스의 상태를 prop으로 매핑함 => 리덕스의 상태를 받아 객체를 리턴함
// const mapStateToProps = (state) => {
//   return {
//     counter: state.counter, // useSelector 훅으로 해준 과정과 유사
//   };
// };

// // dispatch 함수를 리덕스에 저장하는 것(useDispatch 훅의 역할)
// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: "increment" }), // 리턴 객체의 키카 prop의 이름
//     decrement: () => dispatch({ type: "decrement" }), // prop이 함수를 저장하고 컴포넌트 내부에서 함수를 실행함
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// connect 함수를 실행해서 나온 리턴 함수를 Counter 컴포넌트를 인자로 실행
// connect 함수를 통해서 mapStateTOProps, mapDispatchToProps를 포인터로만 넣어주면 리액트리덕스가 실행하고 구독해서 관리까지 해주는것

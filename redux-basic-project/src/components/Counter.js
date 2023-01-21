import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux"; // 리덕스 저장소의 데이터에 접근하기 위한 useSelector

const Counter = () => {
  const dispatch = useDispatch(); // 저장소(store)에 action을 보내는 함수
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: "increment" }); // dispatch 함수에 인자로 전달하는 객체는 type 속성을 명시해서 어떤 action 인지 알 수 있게
  };

  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

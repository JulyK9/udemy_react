import classes from "./Counter.module.css";
import { useSelector } from "react-redux"; // 리덕스 저장소의 데이터에 접근하기 위한 메서드 소환

const Counter = () => {
  const counter = useSelector((state) => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

import { useState } from 'react';
import style from './Counter.module.css';

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((count) => count + 1);
  return (
    <div className={style.container}>
      <div>Count: {count}</div>
      <button autoFocus onClick={increment}>
        Increment
      </button>
    </div>
  );
};

export default Counter;

import { useDispatch, useSelector } from "react-redux";
import { increment,decrement } from "./counterSlice";


function CounterFeature() {
    const dispatch = useDispatch();
    const count = useSelector(state => state.count);//count trong store.js

    const handleIncreaseClick = () => {
        const action =increment();
        dispatch(action);
    }
    const handleDecreaseClick = () => {
        const action =decrement();
        dispatch(action);
    }
    
    return (
        <div>
            Counter {count.value}
            <div>
                <button onClick={handleIncreaseClick}>Increase</button>
                <button onClick={handleDecreaseClick}>Decrease</button>
            </div>
        </div>
    );
}

export default CounterFeature;
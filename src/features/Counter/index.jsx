import { useDispatch, useSelector } from "react-redux";
import { increment,decrement } from "./counterSlice";
import styles from "./styles.module.css"; 
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Màu nền gradient
    border: 0, // Không có viền
    borderRadius: 3, // Bo tròn góc
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', // Đổ bóng
    color: 'white', // Màu chữ
    height: 32, // Chiều cao
    padding: '0 30px', // Khoảng đệm (padding)
  },
});

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
    
    //css
    const classes = useStyles();
    return (
        <div className={styles.count}>
            Counter {count.value}
            <div>
                <button className={classes.root} onClick={handleIncreaseClick}>Increase</button>
                <button className={classes.root} onClick={handleDecreaseClick}>Decrease</button>
            </div>
        </div>
    );
}

export default CounterFeature;
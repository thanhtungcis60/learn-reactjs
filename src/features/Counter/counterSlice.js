import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value++;
        },
        decrement: (state) => {
            state.value --;
        }
    },
});

const { actions, reducer } = counterSlice;
export const { increment, decrement } = actions;
export default reducer;
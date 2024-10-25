import {createSlice} from "@reduxjs/toolkit";
import {DEFAULT_ALERT} from "@/constants/user";
import {log} from "util";

export const ManagerAlertSlice = createSlice({
    name:'ManagerAlertSlice',
    initialState: DEFAULT_ALERT,
    reducers:{
        setManagerAlert(state,action){
            /**
             * state 是 Redux 中的一个表示当前状态的对象。每当你的应用触发某个 action 时，Redux 会调用相应的 reducer，并将当前的 state 传递给它。
             *
             *    •	类型: state 的类型取决于你在 reducer 中定义的初始状态。它可以是一个对象、数组、字符串、数字等，或者更复杂的嵌套结构。
             *    •	来源: state 通常是 reducer 函数的返回值。每次触发 action 时，Redux 都会把最新的 state 传入 reducer，以便更新状态。
             *    •	用途: 你可以使用 state 来决定如何根据 action 的内容去更新和返回新的状态。
             *
             * action 是一个触发状态更新的事件对象。它描述了你希望如何改变当前的状态。
             *
             *    •	类型: action 是一个对象，通常包含两个属性：
             *    •	type：一个字符串，用于表示你想执行的操作类型。比如 "SET_ALERT" 或 "UPDATE_USER"。这是唯一的必填字段。
             *    •	payload：一个可选的字段，用于携带你想传递给 reducer 的数据（通常是你想更新的值）。
             *    •	来源: action 是通过 dispatch 触发的。例如，dispatch(setManagerAlert({ message: "新消息", type: "warning" }))
             *           中的对象 { message: "新消息", type: "warning" } 就是 action.payload。
             */
            return {...action.payload };
        }
    }
})

export const {setManagerAlert} = ManagerAlertSlice.actions

export default ManagerAlertSlice.reducer
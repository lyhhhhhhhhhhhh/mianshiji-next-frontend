import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import DEFAULT_USER from "@/constants/user";

//todo 查阅redux的官网 弄清楚写法 （有点忘记了）


/**
 * 登录用户全局状态
 */
export const loginUserSlice = createSlice({
    //名称
    name: "loginUser",
    //初始化数据
    initialState: DEFAULT_USER,
    //这是reducers函数 接受
    reducers: {
        setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
            return {
                ...action.payload,
            };
        },
    },
});

// 修改状态
// 每个 case reducer 函数会生成对应的 Action creators
export const {setLoginUser} = loginUserSlice.actions;

export default loginUserSlice.reducer;


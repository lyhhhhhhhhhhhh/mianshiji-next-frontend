import {configureStore} from "@reduxjs/toolkit";
import loginUser from "@/stores/loginUser";
import ManagerAlert from "@/stores/managerAlert";

const store = configureStore({
    reducer: {
        // 在这里存放状态
        loginUser,
        ManagerAlert,
    },
});

// 用于类型推断和提示
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;


/**
 * redux的使用教程
 *  1.首先创建store.js文件 创建一个空的Redux Store
 *  2.创建Store之后 便可以在React组件当中使用 通过<Provider>将<App>包裹起来
 *      ========》》》 在layout.tsx当中 <Provider store={store}>
 *  3.创建 Redux State Slice
 *      ========》》》引入CreateSlice API
 *  4.可以使用React-Redux 钩子让 React 组件与 Redux store 交互
 *      ========》》》可以使用 useSelector 从 store 中读取数据，使用 useDispatch dispatch actions
 *
 */




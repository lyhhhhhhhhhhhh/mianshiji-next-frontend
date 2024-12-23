"use client"
import "./globals.css";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, {useCallback, useEffect} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {AppDispatch} from "@/stores";
import {getLoginUserUsingGet} from "@/api/userController";
import AccessLayout from "@/access/AccessLayout";
import {setLoginUser} from "@/stores/loginUser";
import DEFAULT_USER from "@/constants/user";
import ManagerAlert, {setManagerAlert} from "@/stores/managerAlert";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<Readonly<{
    children: React.ReactNode;
}>
> = ({children}) => {
    /**
     * 全局初始化函数 有全局单词调用的代码 都可以写到这里
     */
    const dispatch = useDispatch<AppDispatch>()

    console.log(useSelector(state => state.loginUser))
    //初始化全局用户状态
    const doInitLoginUser = useCallback(async () => {

        const res = await getLoginUserUsingGet();
        if (res.data){
            //更新全局用户状态
            dispatch(setLoginUser(res.data))
        }else {
            //仅用于测试
            // setTimeout( () => {
            //     const testUser = {userName:"登录测试",userAvatar: "https://www.code-nav.cn/logo.png",userRole: ACCESS_ENUM.ADMIN}
            //     dispatch(setLoginUser(testUser))
            // },3000)
        }
        console.log('init');
    }, []);

    //只执行一次
    useEffect(() => {
        doInitLoginUser()
    }, []);

    return children
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode; }>) {
    return (
        <html lang="zh">
        <body>
        <AntdRegistry>
            <Provider store={store}>
                <InitLayout>
                    <BasicLayout>
                        <AccessLayout>
                            {children}
                        </AccessLayout>
                    </BasicLayout>
                </InitLayout>
            </Provider>
        </AntdRegistry>
        </body>
        </html>
    );
}

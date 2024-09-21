"use client"
import "./globals.css";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import React, {useCallback, useEffect} from "react";
import {Provider, useDispatch} from "react-redux";
import store, {AppDispatch} from "@/stores";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";

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

    //初始化全局用户状态
    const doInitLoginUser = useCallback(async () => {

        const res = await getLoginUserUsingGet();
        if (res.data){
            //更新全局用户状态
        }else {
            // setTimeout( () => {
            //     const testUser = {userName:"登录测试",userAvatar: "https://www.code-nac.cn/logo.png"}
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
                        {children}
                    </BasicLayout>
                </InitLayout>
            </Provider>
        </AntdRegistry>
        </body>
        </html>
    );
}

"use client"

import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {userRegisterUsingPost} from "@/api/userController";
import {message} from "antd";
import {setLoginUser} from "@/stores/loginUser";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/stores";
import {ProForm} from "@ant-design/pro-form/lib";
import {useRouter} from "next/navigation";

/**
 * 用户登录页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {
    const [form] = ProForm.useForm();
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    /**
     * 提交
     */
    const doSubmit = async (value: API.UserLoginRequest) => {
        try {
            const res = await userRegisterUsingPost(value);
            if (res.data) {
                message.success("注册成功,请登录")
                //保存用户登录状态
                dispatch(setLoginUser(res.data))
                //跳转页面
                //前往登录页面
                router.replace("/user/login")
                form.resetFields();
            }
        }catch (e){
            message.error("注册失败" + e.message)
        }

    }

    return (
        /**
         * 这里花了大概半个小时找文档
         *  提示一下就是 所需属性若示例demo页面没有 则去找该组件的通用属性
         *  示例页面仅该组件可用
         */
        <div id="UserRegisterPage">
            <LoginForm
                form={form}
                logo={<Image src="/assets/logo_mianshiji.png" alt="面试鸡" height={44} width={44}/>}
                title="面试鸡 - 用户注册"
                subTitle="考公刷题平台"
                onFinish={doSubmit}
                submitter={{
                    searchConfig : {
                    submitText : "注册"
                }}
                }
            >
                <>
                    <ProFormText
                        name="userAccount"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined/>,
                        }}
                        placeholder={'请输入用户账号'}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户账号!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="userPassword"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined/>,
                        }}
                        placeholder={'请输入密码'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="checkPassword"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined/>,
                        }}
                        placeholder={'请输入确认密码'}
                        rules={[
                            {
                                required: true,
                                message: '请输入确认密码！',
                            },
                        ]}
                    />
                </>
                <div
                    style={{
                        marginBlockEnd: 24,
                        textAlign: "end",
                    }}
                >
                    已有账号
                    <Link href={"/user/login"}>
                        去登录
                    </Link>
                </div>
            </LoginForm>
        </div>
    );
};

export default UserRegisterPage;
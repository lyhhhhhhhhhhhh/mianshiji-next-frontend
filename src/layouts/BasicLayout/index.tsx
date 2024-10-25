"use client"
import {GithubFilled, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {ProLayout} from "@ant-design/pro-components";
import {Dropdown, message} from "antd";
import React from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css"
import menu from "../../../config/menu";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import {userLogoutUsingPost} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import DEFAULT_USER from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components/SearchInput";

interface Props {
    children: React.ReactNode;
}

export default function BasicLayout({children}: Props) {

    const loginUser = useSelector((state: RootState) => state.loginUser);

    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter(); // 使用 useRouter 获取当前路径

    /**
     * 用户注销
     * @constructor
     */
    const UserLogout = async () => {
        try {
            const res = await userLogoutUsingPost();
            message.success("已推出登录")
            dispatch(setLoginUser(DEFAULT_USER))
            /**
             * router.push 和 router.replace
             *  router.push相当于新加一个页面
             *  router.replace相当于替换页面
             */
            router.push("/user/login")
        } catch (e) {
            message.error("操作失败" + e.message)
        }
    }


    const pathname = usePathname();


    return (
        <div
            id="basicLayout"
            className="max-width-content"
            style={{
                minHeight: "100vh",
                height: "100vh",
                overflow: "auto",
            }}
        >
            <ProLayout
                logo={

                    <Image src="/assets/logo_mianshiji.png" height={32} width={32} alt="面试鸡刷题网站 - by LKING"/>

                }
                title="考公刷题平台"
                layout="top"
                //这里的location 代表的就是 在ProLayout当中 usePathname会自动获取到当前页面的相对路径 并自动添加高亮
                location={{
                    pathname,
                }}
                avatarProps={{
                    src: loginUser.userAvatar || "/assets/logo_mianshiji_old.png",
                    size: "small",
                    title: loginUser.userName || "面试鸡",
                    /**
                     * dom 代表了组件的默认渲染结果，通常由父组件或框架提供，表示在没有进行任何自定义修改前的内容。
                     * @param props
                     * @param dom
                     */
                    render: (props, dom) => {
                        if (!loginUser.id) {
                            return (
                            <div onClick={ () => {
                              router.push("/user/login")
                            }}>
                                {dom}
                            </div>
                            )
                        }
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "userCenter",
                                            icon: <UserOutlined/>,
                                            label: "用户中心",
                                        },
                                        {
                                            key: "logout",
                                            icon: <LogoutOutlined/>,
                                            label: "退出登录",
                                        },

                                    ],

                                    /**
                                     * onClick 可以获取到event事件 类型是{ key : React.Key }
                                     *  如果key=logout
                                     *  才执行UserLogout
                                     * @param event
                                     */
                                    onClick: async (event: { key: React.Key }) => {
                                        const {key} = event;
                                        if (key === "logout") {
                                            UserLogout();
                                        } else if (key === "userCenter") {
                                            router.push("/user/center")
                                        }
                                    },
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    },
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        //如果当前路径不包含 question 则显示搜索框
                        !pathname.includes('/question') ? <SearchInput key="search"/> : null,
                        <a
                            key="github"
                            href="https://github.com/lyhhhhhhhhhhhh">
                            <GithubFilled key="GithubFilled"/>
                        </a>
                    ];
                }}
                headerTitleRender={(logo, title, _) => {
                    return (
                        <a>
                            {logo}
                            {title}
                        </a>
                    );
                }}
                //渲染底部栏
                footerRender={(props) => {
                    return <GlobalFooter/>
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                //定义有哪些菜单
                menuDataRender={() => {
                    return getAccessibleMenus(loginUser, menu);
                }
                    /**
                     * 这里原来的写法应该是
                     *    menuDataRender={ () => {
                     *        menu
                     *        }
                     *    }
                     * 所以也就是根据新的数组 重新渲染的菜单列表
                     */
                }
                //定义了菜单项如何渲染
                menuItemRender={(item, dom) => (
                    <Link
                        href={item.path || "/"}
                        target={item.target}
                    >
                        {dom}
                    </Link>
                )}
            >
                {/*仅用于测试*/}
                {/*<MdEditor value={text} onChange={setText}/>*/}
                {/*<MdViewer value={text} />*/}
                {children}
            </ProLayout>
        </div>
    );
}

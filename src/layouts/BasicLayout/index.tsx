"use client"
import {GithubFilled, LogoutOutlined, SearchOutlined,} from "@ant-design/icons";
import {ProLayout} from "@ant-design/pro-components";
import {Dropdown, Input} from "antd";
import React, {useState} from "react";
import {Props} from "next/script";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css"
import menu from "../../../config/menu";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined style={{}} />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {

    const loginUser = useSelector ( (state : RootState ) => state.loginUser);

  const pathname = usePathname();
  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
          logo={

            <Image src="/assets/logo_mianshiji.png" height={32} width={32} alt="面试鸡刷题网站 - by LKING" />

          }
          title="面试鸡刷题平台"
        layout="top"
          //这里的location 代表的就是 在ProLayout当中 usePathname会自动获取到当前页面的相对路径 并自动添加高亮
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/notLoginUser.png",
          size: "small",
          title: loginUser.userName || "面试鸡",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
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
              <SearchInput key="search"/>,
              <a
                  key="github"
                  href="https://github.com/lyhhhhhhhhhhhh">
                  <GithubFilled key="GithubFilled" />
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
            return <GlobalFooter />
        }}
        onMenuHeaderClick={(e) => console.log(e)}
          //定义有哪些菜单
          menuDataRender={ () => {
              return menu;
          }
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
        {children}
      </ProLayout>
    </div>
  );
}

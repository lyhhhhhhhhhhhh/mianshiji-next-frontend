import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {usePathname} from "next/navigation";
import {findAllMenuItemByPath} from "../../config/menu";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";

/**
 * 统一权限校验拦截器
 * @param children
 * @constructor
 */
const AccessLayout: React.FC<Readonly<{ children: React.ReactNode; }>> = ({children}) => {
    const pathname = usePathname();
    //当前登录用户
    const loginUser = useSelector((state:RootState) => state.loginUser);
    //获取当前路径需要的权限
    const menu = findAllMenuItemByPath(pathname);
    const needAccess = menu?.access ?? ACCESS_ENUM.NOT_LOGIN;
    //校验权限
    const canAccess = checkAccess(loginUser,needAccess);
    if (!canAccess){
        return (
            <Forbidden/>
        )
    }
    return children

};

export default AccessLayout;

/**
 * 定义校验拦截器
 *  首先 获取当前路径
 *  useSelector 是 React-Redux 提供的一个 Hook，用于从 Redux store 中获取状态。
 *  获取到当前的登录用户
 *  然后根据路径去匹配权限的菜单项 然后根据菜单当中是否有access字段来确认所需权限 若没有则默认无需封登录（也就是不需要任何权限）
 *  然后权限校验的结果  查看能否访问
 *  若成功访问 则返回目标页面 如不成功 则返回无权限页面
 *
 */
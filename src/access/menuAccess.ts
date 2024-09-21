import menus from "../../config/menu";
import checkAccess from "@/access/checkAccess";

/**
 * 获取权限访问菜单
 * @param loginUser
 * @param menuItems
 */
const getAccessibleMenus = (loginUser : API.LoginUserVO,menuItems = menus) => {
    return menuItems.filter( (item) => {
         if (!checkAccess(loginUser,item.access)){
             return false
         }
         if (item.children){
             item.children = getAccessibleMenus(loginUser,item.children);
         }
         return true;
    })
}

export default getAccessibleMenus

/**
 * 菜单过滤
 *  首先需要传入当前登录的用户 和 所有菜单
 *  遍历菜单数组 根据过滤器查看菜单的access字段是否与用户角色相符合（因为存在子菜单 所以递归调用）
 *  根据每一次过滤的返回的true或者false来拼接成新的menu菜单数组
 */
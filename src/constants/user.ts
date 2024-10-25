// 默认用户
import ACCESS_ENUM from "@/access/accessEnum";

const DEFAULT_USER: API.LoginUserVO = {
    userName: "未登录",
    userProfile: "暂无简介",
    userAvatar: "/assets/notLoginUser.png",
    userRole: ACCESS_ENUM.NOT_LOGIN,
};

export const DEFAULT_ALERT = {
    message: "考公面试刷题平台！！！ 注意：题目均来自网络 会存在错误 AI答案也会存在 做参考即可",
    type: "info"
}
export default DEFAULT_USER

// 默认用户
import ACCESS_ENUM from "@/access/accessEnum";

const DEFAULT_USER: API.LoginUserVO = {
    userName: "未登录",
    userProfile: "暂无简介",
    userAvatar: "/assets/notLoginUser.png",
    userRole: ACCESS_ENUM.NOT_LOGIN,
};

export default DEFAULT_USER
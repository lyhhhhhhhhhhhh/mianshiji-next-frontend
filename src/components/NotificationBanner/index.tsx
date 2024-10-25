// 使用 useSelector 读取 Redux store 中的 alert 状态
import {useSelector} from "react-redux";
import {Alert} from "antd";
import Marquee from "react-fast-marquee";


/**
 * 独立的通知组件，避免影响数据加载
 * @returns {JSX.Element}
 * @constructor
 */
const NotificationBanner = () => {
    const alert = useSelector((state) => state.ManagerAlert); // 注意：state 中的 key 应该和你的 store 定义一致
    return (
        <div className="NotificationBanner">
            <Alert
                banner={true}
                type={alert.type}
                message={
                    <Marquee pauseOnHover gradient={false}>
                        {alert.message}
                    </Marquee>
                }
            />
        </div>
    )
}

export default NotificationBanner

import {message} from "antd";
import {useEffect, useState} from "react";
import {addSignInUsingPost} from "@/api/userController";

/**
 * 添加用户签到刷题记录钩子
 */
const useAddUserSignInRecords = () => {

    const [loading,setLoading] = useState<boolean>(true)

    //请求后端执行签到
    const doFetch = async () => {
        setLoading(true);
        try {
            const res = await addSignInUsingPost({})
        }catch (e){
            message.error(e.message);
        }
        setLoading(false)
    }

    useEffect(() => {
        doFetch()
    }, []);

    return {loading}
}

export default useAddUserSignInRecords;
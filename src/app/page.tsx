"use server";
import Title from "antd/es/typography/Title";
import {Alert, Divider, Flex, message} from "antd";
import "./index.css";
import Link from "next/link";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";
import ScrollingNotification from "@/components/ScrollingNotification";
import Marquee from "react-fast-marquee";
import {getNotificationUsingGet} from "@/api/managerController";

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {

    let questionBankList = [];

    let questionList = [];

    let alert = null;


    try {
        const res = await listQuestionBankVoByPageUsingPost({
            pageSize: 12,
            sortField: "createTime",
            sortOrder: "desc",
        })
        questionBankList = res.data.records ?? [];
    } catch (e) {
        console.log("获取题库列表失败")
    }

    try {
        const res = await listQuestionVoByPageUsingPost({
            pageSize: 12,
            sortField: "createTime",
            sortOrder: "desc",
        })
        questionList = res.data.records ?? [];
    } catch (e) {
        console.log("获取题目列表失败")
    }

    try {
        const res = await getNotificationUsingGet()
        alert = res.data
    }catch (e) {
        console.log("获取通知失败")
    }

    return <div id="homePage" className="max-width-content">

        <Alert
            banner={true}
            type={alert.type}
            message={
                <Marquee pauseOnHover gradient={false}>
                    {alert.message}
                </Marquee>
            }
        />

        <Flex justify="space-between" align="center">
            <Title level={3}>最新题库</Title>
            <Link href={"/banks"}>查看更多</Link>
        </Flex>
        {/*这里的扩展点 就是可以做一个热点 以及推荐题目的 滚动条 */}
        {/*<ScrollingNotification title="测试标题" content="测试内容"/>*/}
        <div>
            题库列表
            <QuestionBankList questionBankList={questionBankList}/>
        </div>
        <Divider/>
        <Flex justify="space-between" align="center">
            <Title level={3}>最新题目</Title>
            <Link href={"/banks"}>查看更多</Link>
        </Flex>
        <div>
            题目列表
            <QuestionList questionList={questionList}/>
        </div>
    </div>;
}



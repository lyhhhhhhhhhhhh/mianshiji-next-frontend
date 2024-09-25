"use server"

import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import {Flex, Menu} from "antd";
import "./index.css"
import Title from "antd/es/typography/Title";
import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import QuestionCard from "@/components/QUestionCard";
import Link from "next/link";


/**
 * 题库题目详情页
 * @constructor
 */
export default async  function BankQuestionPage({params}) {

    const {questionBankId, questionId} = params

    //获取题库详情
    let bank = undefined
    try {
        const res = await getQuestionBankVoByIdUsingGet({
            id: questionBankId,
            needQueryQuestionList: true,
            //可自行扩展为分野实现
            pageSize: 200,
        });
        bank = res.data
    } catch (e) {
        console.log(e)
    }
    //错误处理
    if (!bank) {
        return <div>获取题库详情失败，请刷新重试</div>
    }

    //获取题目详情
    let question = undefined
    try {
        const res = await getQuestionVoByIdUsingGet({
            id: questionId,
        });
        question = res.data
    } catch (e) {
        console.log(e)
    }
    //错误处理
    if (!bank) {
        return <div>获取题目详情失败，请刷新重试</div>
    }

    //题目菜单列表
    const questionMenuItemList = (bank.questionPage?.records || []).map( (question) => {
        return {
            label : <Link href={`/bank/${questionBankId}/question/${question.id }`}>{question.title}</Link>,
            key : question.id
        }
    })

    return (
        <div id="bankQuestionPage">
            <Flex gap={24}>
                <Sider width={240} theme="light">
                    <Title level={4} style={{padding: "0 20px"}}>{bank.title}</Title>
                    <Menu items={questionMenuItemList} selectedKeys={[question.id]}/>
                </Sider>
                <Content>
                    <QuestionCard question={question}/>
                </Content>
            </Flex>

        </div>
    )
}
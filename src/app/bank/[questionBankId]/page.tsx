"use server"

import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import {Avatar, Button, Card} from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import "./index.css"
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";


/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({params}) {

    const {questionBankId} = params

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

    // 获取第一道题目
    //用于开始刷题 题目
    let firstQuestionId;
    if (bank.questionPage?.records && bank.questionPage.records.length>0){
        firstQuestionId = bank.questionPage.records[0].id
    }

    return (
        <div id="bankPage" className="max-width-content" style={{width:"100%"}}>
            <Card>
                <Meta
                    avatar={<Avatar src={bank.picture} size={72}/>}
                    title={<Title level={3} style={{marginBottom: 0}}>{bank.title}</Title>}
                    description={
                    <>

                        <Paragraph type="secondary">
                            {bank.description}
                        </Paragraph>

                        <Button
                            type="primary"
                            shape="round"
                            href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                            target="_blank"
                            disabled={!firstQuestionId}>
                        开始刷题
                        </Button>
                    </>
                }

                />
            </Card>
            <div style={{marginBottom:16}}></div>
            <QuestionList
                questionBankId={questionBankId}
                questionList={bank.questionPage?.records ?? []}
                cardTitle={`题目列表${bank.questionPage.total || 0}`}
            />

        </div>
    )



}
"use server"

import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import "./index.css"
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";


/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({params}){

    const {questionBankId} = params

    let bank = undefined

    try {
        const res = await getQuestionBankVoByIdUsingGet({
            id : questionBankId,
            needQueryQuestionList : true,
            //可自行扩展为分野实现
            pageSize : 200,
        });
        bank = res.data
    }catch (e){
        console.log(e)
    }
    //错误处理
    if (!bank){
        return <div>获取题库详情失败，请刷新重试</div>
    }

    return (
        <div id="bankPage" className="max-width-content">
            <Card>
                    <Meta
                        avatar={<Avatar src={bank.picture} size={72}/>}
                        title={<Title level={3} style={{marginBottom : 0}}>{bank.title}</Title>}
                        description={
                            <Paragraph type="secondary">
                                {bank.description}
                            </Paragraph>}
                    />
            </Card>
            <QuestionList questionList={bank.questionPage} />

        </div>
    )


}
"use server"

import {getQuestionVoByIdUsingGet, listQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionCard from "@/components/QUestionCard";
import {Col, message, Row} from "antd";
import QuestionList from "@/components/QuestionList";

/**
 * 题库题目详情页
 * @constructor
 */
export default async  function QuestionPage({params}) {

    const {questionId} = params

    let questionList = null

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

    try{
        const res = await listQuestionVoByPageUsingPost({
            sortField: "createTime",
            sortOrder: "descend",
        });
        questionList = res.data.records ?? [];
    }catch (e){
        message.error(e.message)
    }

    return (
        <div id="QuestionPage">
            <Row gutter={8}>
                <Col span={8}>
                    <QuestionList questionList={questionList} needTags={false}/>
                </Col>
                <Col span={16}>
                    <QuestionCard question={question}/>
                </Col>
            </Row>

        </div>
    )
}
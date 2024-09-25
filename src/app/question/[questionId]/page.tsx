"use server"

import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import QuestionCard from "@/components/QUestionCard";


/**
 * 题库题目详情页
 * @constructor
 */
export default async  function QuestionPage({params}) {

    const {questionBankId, questionId} = params


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

    return (
        <div id="QuestionPage">
                    <QuestionCard question={question}/>
        </div>
    )
}
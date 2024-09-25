"use client"

import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";
import {Card} from "antd";

interface Props {
    question : API.QuestionVO;
}

const QuestionCard = (props : Props) => {
    const {question} = props;

    return (
        <div id="bankQuestionPage">
            <Card>
                <Title level={1} style={{fontSize:24}}>
                    {question.title}
                </Title>
                    <TagList tagList={question.tagList}/>
                    <div style={{marginBottom:16}}></div>
                    <MdViewer value={question.content}/>
            </Card>
            <div style={{marginBottom:16}}></div>
            <Card title="推荐答案">
                <MdViewer value={question.answer}/>
            </Card>

        </div>
    )
}

export default QuestionCard
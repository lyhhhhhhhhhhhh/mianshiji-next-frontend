"use client"

import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";
import {Card, Button, message, Row, Col} from "antd"; // 引入Button
import useAddUserSignInRecords from "@/hooks/useAddUserSignInRecords";
import { useState } from "react";
import axios from "axios";  // 引入useState用于状态管理

interface Props {
    question: API.QuestionVO;
}

const QuestionCard = (props: Props) => {
    const { question } = props;

    //执行签到钩子
    useAddUserSignInRecords();

    // 定义一个状态用于控制AI回答的显示
    const [showAIAnswer, setShowAIAnswer] = useState(false);

    const [answerForAI, setAnswerForAI] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(true)

    //获取AI答案
    const getAiAnswer = (question) => {
        message.info("获取答案中")
        axios.post('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            model: 'glm-4',
            messages: [
                {
                    role: 'user',
                    content: question
                }
            ]
        }, {
            headers: {
                'Authorization': 'Bearer 3c71f73aecfc1d22565ac3b13f6cac3f.1YBwuKexNxkWvFuU',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                message.success("获取成功")
                setAnswerForAI(response.data.choices[0].message.content);
                setLoading(false)
                console.log(response.data.choices[0].message.content)
            })
            .catch(error => {
                console.error('Error:', error);
                message.error("获取答案失败,请稍后再试")
            });
    }
    // 点击按钮时切换显示AI回答
    const handleShowAIAnswer = () => {
        setShowAIAnswer(!showAIAnswer);
        if (!answerForAI){
            getAiAnswer(question.content);
        }
    };

    return (
        <div id="bankQuestionPage" className="max-width-content">
                    <Card>
                        <Title level={1} style={{ fontSize: 24 }}>
                            {question.title}
                        </Title>
                        <TagList tagList={question.tagList} />
                        <div style={{ marginBottom: 16 }}></div>
                        <MdViewer value={question.content} />
                    </Card>
                    <div style={{ marginBottom: 16 }}></div>
                    <Card title="推荐答案">
                        <MdViewer value={question.answer} />
                    </Card>
                    <div style={{ marginBottom: 16 }}></div>
                    {/* AI 回答的按钮 */}
                    <Button type="primary" onClick={handleShowAIAnswer}>
                        {showAIAnswer ? '隐藏AI回答' : '查看AI回答'}
                    </Button>
                    {/* 显示 AI 回答 */}
                    {showAIAnswer && (
                        <Card loading={loading} title="AI 回答" style={{ marginTop: 16 }}>
                            <MdViewer value={answerForAI} />
                        </Card>
                    )}
        </div>
    );
};

export default QuestionCard;
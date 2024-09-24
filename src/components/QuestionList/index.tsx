"use client"

import {Card, List} from "antd";
import TagList from "@/components/TagList";
import Link from "next/link";


interface Props {
    questionList: API.QuestionVO;
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {

    const {questionList = []} = props;

    return (
        <Card className="question-list">
            <List
                itemLayout="horizontal"
                dataSource={questionList}
                renderItem={(item, index) => (
                    <List.Item extra={<TagList tagList={item.tagList}/>}>
                        <List.Item.Meta
                            title={<Link href={`/question/${item.id}`}>
                                {item.title}
                            </Link>}
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default QuestionList;
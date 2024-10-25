"use client"

import {Card, List} from "antd";
import TagList from "@/components/TagList";
import Link from "next/link";
import MdViewer from "@/components/MdViewer";
import {memo} from "react";


interface Props {
    questionBankId?: number;
    questionList: API.QuestionVO[];
    cardTitle?: string;
    needTags?: boolean;
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {

    const {questionList = [],cardTitle,questionBankId,needTags} = props;

    return (
        <Card className="question-list" title={cardTitle}>
            <List
                itemLayout="horizontal"
                dataSource={questionList}
                renderItem={(item, index) => (
                    <List.Item extra={needTags??<TagList tagList={item.tagList}/>}>
                        <List.Item.Meta
                            //这里的意思是 会传入一个参数(题库的id值)
                            //  若存在 意思就是从题库页面进入的题目 所以返回/bank/${questionBankId}/question/${item.id}
                            //  若不存在 意思就是从主页或者其他地方进入的题目 返回/question/${item.id}
                            title={<Link href={questionBankId ? `/bank/${questionBankId}/question/${item.id}` :`/question/${item.id}`}>
                                {item.title}
                            </Link>}
                            description={
                                <div style={{
                                    whiteSpace: 'nowrap', // 强制不换行
                                    overflow: 'hidden',   // 隐藏超出的内容
                                    textOverflow: 'ellipsis', // 显示省略号
                                    width: '90%', // 控制宽度
                                }}>
                                    {item.content.replace(/<\/br\s*\/?>/gi, ' ')}  {/* 替换 <br> */}
                                </div>}
                        />
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default memo(QuestionList);
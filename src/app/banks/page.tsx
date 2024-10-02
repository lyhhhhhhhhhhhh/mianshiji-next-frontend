"use server"

import React from "react";
import Title from "antd/es/typography/Title";
import QuestionBankList from "@/components/QuestionBankList";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import {message} from "antd";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";

/**
 * 题库列表页面
 * @constructor
 */
export default async function BankPages() {

    let questionBankList = [];

    //题库数量不多 直接全量获取
    const pageSize = 20

    try {
        const res = await listQuestionBankVoByPageUsingPost({
            pageSize,
            sortField: "createTime",
            sortOrder: "desc",
        })
        questionBankList = res.data.records ?? [];
    } catch (e) {
        console.log(e.message)
    }

    return (
        <div id="bankPages" className="max-width-content">
            <Title level={3}>题库大全</Title>
            <QuestionBankList questionBankList={questionBankList}/>
        </div>
    )
}



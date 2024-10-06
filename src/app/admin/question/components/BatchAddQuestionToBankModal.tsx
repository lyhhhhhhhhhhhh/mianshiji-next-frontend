"use client"

import {deleteQuestionUsingPost1, updateQuestionUsingPost} from '@/api/questionController';
import {Button, Form, message, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    addQuestionBankQuestionUsingPost, batchAddQuestionBankQuestionUsingPost,
    listQuestionBankQuestionVoByPageUsingPost
} from "@/api/questionBankQuestionController";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import questionBankList from "@/components/QuestionBankList";

interface Props {
    questionId?: number[];
    visible: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

/**
 * 批量向题库添加题目
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionUpdateRequest) => {
    const hide = message.loading('正在更新');
    try {
        await updateQuestionUsingPost(fields);
        hide();
        message.success('更新成功');
        return true;
    } catch (error: any) {
        hide();
        message.error('更新失败，' + error.message);
        return false;
    }
};


/**
 * 更新所属题目弹框
 * @param props
 * @constructor
 */
const BatchAddQuestionToBankModel: React.FC<Props> = (props) => {
    const {questionIdList, visible, onSubmit, onCancel} = props;

    const [form] = Form.useForm();

    const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([])


    const doSubmit = async (values: API.QuestionBankQuestionBatchAddRequest) => {
        const hide = message.loading('正在操作');
        const questionBankId = values.questionBankId;
        if (!questionBankId) return;
        try {
            await batchAddQuestionBankQuestionUsingPost({
                questionBankId: questionBankId,
                questionId: questionIdList,
            });
            hide();
            message.success("操作成功");
            onSubmit?.();
        } catch (e) {
            hide();
            message.error("操作失败");

        }
    }

    //获取所属题库列表
    const getQuestionBankList = async () => {
        try {
            const res = await listQuestionBankVoByPageUsingPost(
                {
                    pageSize: 20,
                    sortField: 'createTime',
                    sortOrder: 'descend'
                }
            )
            setQuestionBankList(res.data?.records ?? [])
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getQuestionBankList()
    }, []);

    return (
        <Modal
            destroyOnClose
            title={'批量向题库添加题目'}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.();
            }}
        >
            <Form form={form} onFinish={doSubmit}>
                <Form.Item style={{marginTop: "20px"}} label="选择题目" name="questionBankId">
                    <Select style={{width: "100%"}} options={
                        /**
                         * 传入的默认值确实是题库的 id
                         * 但因为 Select 使用了 label 来显示
                         * 默认情况下会显示对应 value 的 label
                         * 这就是为什么看到的是题库的名称而不是 id
                         */
                        questionBankList.map(item => {
                            return {
                                label: item.title,
                                value: item.id
                            }
                        })
                    }
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default BatchAddQuestionToBankModel;

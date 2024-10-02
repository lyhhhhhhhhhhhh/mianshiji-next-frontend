"use client"

import {deleteQuestionUsingPost1, updateQuestionUsingPost} from '@/api/questionController';
import {Form, message, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    addQuestionBankQuestionUsingPost,
    listQuestionBankQuestionVoByPageUsingPost
} from "@/api/questionBankQuestionController";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";

interface Props {
    questionId?: number;
    visible: boolean;
    onCancel: () => void;
}

/**
 * 更新节点
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
const UpdateBankModal: React.FC<Props> = (props) => {
    const {questionId, visible, onCancel} = props;

    const [form] = Form.useForm();

    const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([])


    //获取所属题库列表
    const getCurrentQuestionBankIdList = async () => {
        try {
            const res = await listQuestionBankQuestionVoByPageUsingPost(
                {
                    questionId: questionId,
                    pageSize: 20,
                }
            )
            const list = (res.data?.records ?? []).map(item => item.questionBankId)
            form.setFieldValue("questionBankIdList" as any, list)
        } catch (e) {
            console.log(e.message)
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

    useEffect(() => {
        if (questionId) {
            getCurrentQuestionBankIdList()
        }
    }, [questionId]);


    return (
        <Modal
            destroyOnClose
            title={'更新所属题库'}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.();
            }}
        >
            <Form form={form}>
                <Form.Item style={{marginTop: "20px"}} label="所属题库" name="questionBankIdList">
                    <Select mode="multiple" style={{width: "100%"}} options={
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
                            onSelect={async (value) => {
                                const hide = message.loading("正在更新");
                                try {
                                    await addQuestionBankQuestionUsingPost({
                                        questionId,
                                        questionBankId: value,
                                    });
                                    hide();
                                    message.success("绑定题库成功");
                                } catch (error: any) {
                                    hide();
                                    message.error("绑定题库失败，" + error.message);
                                }
                            }}
                            onDeselect={async (value) => {
                                const hide = message.loading("正在更新");
                                try {
                                    await deleteQuestionUsingPost1({
                                        questionId,
                                        questionBankId: value,
                                    });
                                    hide();
                                    message.success("取消绑定题库成功");
                                } catch (error: any) {
                                    hide();
                                    message.error("取消绑定题库失败，" + error.message);
                                }
                            }}

                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default UpdateBankModal;

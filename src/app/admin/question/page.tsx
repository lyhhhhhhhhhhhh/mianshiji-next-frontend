"use client"

import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import {deleteQuestionUsingPost, listQuestionByPageUsingPost} from '@/api/questionController';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import {Button, message, Popconfirm, Space, Table, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import TagList from "@/components/TagList";
import MdEditor from "@/components/MdEditor";
import UpdateBankModel from "@/app/admin/question/components/UpdateBankModel";
import BatchAddQuestionToBankModal from "@/app/admin/question/components/BatchAddQuestionToBankModal";
import BatchRemoveQuestionFromBankModal from "@/app/admin/question/components/BatchRemoveQuestionFromBankModal";
import {batchDeleteQuestionsUsingPost} from "@/api/questionBankQuestionController";

/**
 * 题目管理页面
 *
 * @constructor
 */
const QuestionAdminPage: React.FC = () => {
    // 是否显示新建窗口
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    // 是否显示更新窗口
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    // 是否显示更新所属题库窗口
    const [updateBankModel, setUpdateBankModel] = useState<boolean>(false);

    // 是否显示批量向题库添加题目弹窗
    const [
        batchAddQuestionsToBankModalVisible,
        setBatchAddQuestionsToBankModalVisible,
    ] = useState<boolean>(false);
// 是否显示批量从题库移除题目弹窗
    const [
        batchRemoveQuestionsFromBankModalVisible,
        setBatchRemoveQuestionsFromBankModalVisible,
    ] = useState<boolean>(false);
// 当前选中的题目 id 列表
    const [selectedQuestionIdList, setSelectedQuestionIdList] = useState<
        number[]
    >([]);


    const actionRef = useRef<ActionType>();
    // 当前题目点击的数据
    const [currentRow, setCurrentRow] = useState<API.Question>();

    /**
     * 删除节点
     *
     * @param row
     */
    const handleDelete = async (row: API.Question) => {
        const hide = message.loading('正在删除');
        if (!row) return true;
        try {
            await deleteQuestionUsingPost({
                id: row.id as any,
            });
            hide();
            message.success('删除成功');
            actionRef?.current?.reload();
            return true;
        } catch (error: any) {
            hide();
            message.error('删除失败，' + error.message);
            return false;
        }
    };

    /**
     * 批量删除
     * @param questionIdList
     */
    const handleBatchDelete = async (questionIdList: number[]) => {
        const hide = message.loading("正在操作");
        try {
            await batchDeleteQuestionsUsingPost({
                questionIds: questionIdList,
            });
            hide();
            message.success("操作成功");
            actionRef?.current?.reload();
        } catch (error: any) {
            hide();
            message.error("操作失败，" + error.message);
        }
    };


    const columns: ProColumns<API.Question>[] = [
        {
            title: "id",
            dataIndex: "id",
            valueType: "text",
            hideInForm: true,
            width: 50
        },
        {
            title: "所属题库",
            dataIndex: "questionBankId",
            hideInTable: true,
            hideInForm: true,
        },
        {
            title: "标题",
            dataIndex: "title",
            valueType: "text",
            width:80,
        },
        {
            title: "内容",
            dataIndex: "content",
            valueType: "text",
            hideInSearch: true,
            width: 240,
            renderFormItem: (
                item,
                {fieldProps},
                form,
            ) => {
                //编写要渲染的表单项
                return <MdEditor {...fieldProps}/>
            }
        },
        {
            title: "答案",
            dataIndex: "answer",
            valueType: "text",
            hideInSearch: true,
            width: 400,
            renderFormItem: (
                item,
                {fieldProps},
                form,
            ) => {
                //编写要渲染的表单项
                return <MdEditor {...fieldProps}/>
            }
        },
        {
            title: "标签",
            dataIndex: "tags",
            valueType: "select",
            fieldProps: {
                mode: "tags",
            },

            render: (_, record) => {
                const tagList = JSON.parse(record.tags || "[]")
                return <TagList tagList={tagList}></TagList>
            },
        },
        {
            title: "创建用户",
            dataIndex: "userId",
            valueType: "text",
            hideInForm: true,
        },

        {
            title: "创建时间",
            sorter: true,
            dataIndex: "createTime",
            valueType: "dateTime",
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: "编辑时间",
            sorter: true,
            dataIndex: "editTime",
            valueType: "dateTime",
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: "更新时间",
            sorter: true,
            dataIndex: "updateTime",
            valueType: "dateTime",
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: "操作",
            dataIndex: "option",
            valueType: "option",
            render: (_, record) => (
                <Space size="middle">
                    <Typography.Link
                        onClick={() => {
                            setCurrentRow(record);
                            setUpdateModalVisible(true);
                        }}
                    >
                        修改
                    </Typography.Link>
                    <Typography.Link
                        onClick={() => {
                            setCurrentRow(record);
                            setUpdateBankModel(true);
                        }}
                    >
                        修改所属题库
                    </Typography.Link>
                    <Typography.Link type="danger" onClick={() => handleDelete(record)}>
                        删除
                    </Typography.Link>
                </Space>
            ),
        },
    ];


    return (
        <PageContainer>
            <ProTable<API.Question>
                headerTitle={'查询表格'}
                actionRef={actionRef}
                rowKey="id"
                rowSelection={{
                    // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
                    // 注释该行则默认不显示下拉选项
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                tableAlertRender={({
                                       selectedRowKeys,
                                       selectedRows,
                                       onCleanSelected,
                                   }) => {
                    return (
                        <Space size={24}>
            <span>
            已选 {selectedRowKeys.length} 项
            <a style={{marginInlineStart: 8}} onClick={onCleanSelected}>
            取消选择
            </a>
            </span>
                        </Space>
                    );
                }}
                tableAlertOptionRender={({
                                             selectedRowKeys,
                                             selectedRows,
                                             onCleanSelected,
                                         }) => {
                    return (
                        <Space size={16}>
                            <Button
                                onClick={() => {
                                    // 打开弹窗
                                    setSelectedQuestionIdList(selectedRowKeys as number[])
                                    setBatchAddQuestionsToBankModalVisible(true);
                                }}
                            >
                                批量向题库添加题目
                            </Button>
                            <Button
                                onClick={() => {
                                    // 打开弹窗
                                    setSelectedQuestionIdList(selectedRowKeys as number[])
                                    setBatchRemoveQuestionsFromBankModalVisible(true);
                                }}
                            >
                                批量从题库移除题目
                            </Button>
                            <Popconfirm
                                title="确认删除"
                                description="你确定要删除这些题目么？"
                                onConfirm={() => {
                                    // 批量删除题目
                                    handleBatchDelete(selectedRowKeys as number[])
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger>批量删除题目</Button>
                            </Popconfirm>
                        </Space>
                    );
                }}

                scroll={{
                    x: true,
                }}
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            setCreateModalVisible(true);
                        }}
                    >
                        <PlusOutlined/> 新建
                    </Button>,
                ]}
                request={async (params, sort, filter) => {
                    const sortField = Object.keys(sort)?.[0];
                    const sortOrder = sort?.[sortField] ?? undefined;

                    const {data, code} = await listQuestionByPageUsingPost({
                        ...params,
                        sortField,
                        sortOrder,
                        ...filter,
                    } as API.QuestionQueryRequest);

                    return {
                        success: code === 0,
                        data: data?.records || [],
                        total: Number(data?.total) || 0,
                    };
                }}
                columns={columns}
            />
            <CreateModal
                visible={createModalVisible}
                columns={columns}
                onSubmit={() => {
                    setCreateModalVisible(false);
                    actionRef.current?.reload();
                }}
                onCancel={() => {
                    setCreateModalVisible(false);
                }}
            />
            <UpdateModal
                visible={updateModalVisible}
                columns={columns}
                oldData={currentRow}
                onSubmit={() => {
                    setUpdateModalVisible(false);
                    setCurrentRow(undefined);
                    actionRef.current?.reload();
                }}
                onCancel={() => {
                    setUpdateModalVisible(false);
                }}
            />
            <UpdateBankModel
                visible={updateBankModel}
                questionId={currentRow?.id}
                onCancel={() => {
                    setUpdateBankModel(false);
                }}
            />
            <BatchAddQuestionToBankModal
                visible={batchAddQuestionsToBankModalVisible}
                questionIdList={selectedQuestionIdList}
                onSubmit={() => {
                    setBatchAddQuestionsToBankModalVisible(false);
                }}
                onCancel={() => {
                    setBatchAddQuestionsToBankModalVisible(false);
                }}
            />
            <BatchRemoveQuestionFromBankModal
                visible={batchRemoveQuestionsFromBankModalVisible}
                questionIdList={selectedQuestionIdList}
                onSubmit={() => {
                    setBatchRemoveQuestionsFromBankModalVisible(false);
                }}
                onCancel={() => {
                    setBatchRemoveQuestionsFromBankModalVisible(false);
                }}
            />

        </PageContainer>
    );
};
export default QuestionAdminPage;

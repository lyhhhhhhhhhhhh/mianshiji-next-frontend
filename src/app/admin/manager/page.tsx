"use client"

import React from 'react';
import type {FormProps} from 'antd';
import {Button, Card, Form, Input, Select, Typography, Space} from 'antd';
import {addNotificationUsingPost} from "@/api/managerController";

const {Title, Text} = Typography;

type FieldType = {
    NotificationMessage?: string;
    NotificationType?: string;
};

const Manager: React.FC = () => {

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        // 直接通过 values 获取 NotificationMessage 和 NotificationType
        const {NotificationMessage, NotificationType} = values;
        try {
            const res = await addNotificationUsingPost({
                message: NotificationMessage,
                type: NotificationType
            });
            console.log(res);
        } catch (e) {
            console.log(e);
        }
        console.log(NotificationMessage, NotificationType);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="max-width-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width: '100%', background: '#f0f2f5' }}>
            <Card style={{ width:'60%',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>通知管理</Title>
                    <Text type="secondary" style={{ textAlign: 'center',display:'block' }}>
                        请填写通知信息并选择通知类型
                    </Text>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ NotificationType: 'info' }} // 默认通知类型
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="通知内容"
                            name="NotificationMessage"
                            rules={[{ required: true, message: '请输入通知内容!' }]}
                        >
                            <Input placeholder="请输入通知内容" />
                        </Form.Item>

                        <Form.Item
                            label="通知类型"
                            name="NotificationType"
                            rules={[{ required: true, message: '请选择通知类型!' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                options={[
                                    { value: 'success', label: '成功' },
                                    { value: 'info', label: '信息' },
                                    { value: 'warning', label: '警告' },
                                    { value: 'error', label: '错误' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Manager;
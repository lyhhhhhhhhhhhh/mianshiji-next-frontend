"use client"

// 引入依赖组件和库
import CreateModal from './components/CreateModal'; // 新建用户的模态框组件
import UpdateModal from './components/UpdateModal'; // 更新用户的模态框组件
import { deleteUserUsingPost, listUserByPageUsingPost } from '@/api/userController'; // 用户相关的 API 请求
import { PlusOutlined } from '@ant-design/icons'; // 加号图标，用于按钮
import type { ActionType, ProColumns } from '@ant-design/pro-components'; // Ant Design Pro 提供的类型
import { PageContainer, ProTable } from '@ant-design/pro-components'; // Ant Design Pro 的页面容器和表格组件
import {Button, message, Popconfirm, Space, Typography} from 'antd'; // Ant Design UI 组件库
import React, { useRef, useState } from 'react'; // React 的核心库，用于函数式组件和状态管理

/**
 * 用户管理页面组件
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
  // 定义用于控制新建用户模态框是否显示的状态
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  // 定义用于控制更新用户模态框是否显示的状态
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);

  // 用于操作表格的 action 引用，用来刷新数据等
  const actionRef = useRef<ActionType>();

  // 存储当前选中的行数据（当前用户），用于在更新时显示
  const [currentRow, setCurrentRow] = useState<API.User>();

  /**
   * 删除用户
   *
   * @param row 当前选中的行数据
   */
  const handleDelete = async (row: API.User) => {
    const hide = message.loading('正在删除'); // 显示删除中的加载提示
    if (!row) return true; // 如果没有选中用户，直接返回
    try {
      await deleteUserUsingPost({ // 调用删除用户的 API
        id: row.id as any, // 传递用户 ID
      });
      hide(); // 隐藏加载提示
      message.success('删除成功'); // 显示成功信息
      actionRef?.current?.reload(); // 刷新表格数据
      return true;
    } catch (error: any) {
      hide(); // 隐藏加载提示
      message.error('删除失败，' + error.message); // 显示错误信息
      return false;
    }
  };

  /**
   * 定义表格的列配置
   */
  const columns: ProColumns<API.User>[] = [
    {
      title: 'id', // 列标题
      dataIndex: 'id', // 数据索引
      valueType: 'text', // 值类型为文本
      hideInForm: true, // 在表单中隐藏此列
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image', // 值类型为图片
      fieldProps: {
        width: 64, // 定义图片的宽度
      },
      hideInSearch: true, // 在搜索表单中隐藏此列
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'textarea', // 值类型为多行文本
    },
    {
      title: '权限',
      dataIndex: 'userRole',
      valueEnum: { // 值枚举，用于显示权限类型
        user: {
          text: '用户',
        },
        admin: {
          text: '管理员',
        },
      },
    },
    {
      title: '创建时间',
      sorter: true, // 可排序
      dataIndex: 'createTime',
      valueType: 'dateTime', // 值类型为日期时间
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作', // 操作列，用于放置操作按钮
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => ( // 渲染操作按钮
          <Space size="middle">
            <Typography.Link
                onClick={() => {
                  setCurrentRow(record); // 设定当前用户
                  setUpdateModalVisible(true); // 打开更新模态框
                }}
            >
              修改
            </Typography.Link>
              <Popconfirm
                  title="删除操作提示"
                  description="确定删除此条记录吗"
                  onConfirm={ () => handleDelete(record)}
                  >
                  <Typography.Link type="danger">
                      删除
                  </Typography.Link>
              </Popconfirm>
          </Space>
      ),
    },
  ];

  // 返回用户管理页面的 JSX 结构
  return (
      <PageContainer>
        <ProTable<API.User>
            headerTitle={'查询表格'} // 表格头部标题
            actionRef={actionRef} // actionRef 用于触发刷新操作
            rowKey="key" // 每一行的唯一标识字段
            search={{
              labelWidth: 120, // 搜索栏标签宽度
            }}
            toolBarRender={() => [ // 工具栏渲染
              <Button
                  type="primary"
                  key="primary"
                  onClick={() => {
                    setCreateModalVisible(true); // 打开新建用户模态框
                  }}
              >
                <PlusOutlined /> 新建
              </Button>,
            ]}
            // 异步请求数据
            request={async (params, sort, filter) => {
              const sortField = Object.keys(sort)?.[0]; // 获取排序字段
              const sortOrder = sort?.[sortField] ?? undefined; // 获取排序顺序

              const { data, code } = await listUserByPageUsingPost({
                ...params, // 传递查询参数
                sortField,
                sortOrder,
                ...filter, // 传递过滤参数
              } as API.UserQueryRequest);

              return {
                success: code === 0, // 请求成功时返回 true
                data: data?.records || [], // 返回记录数据
                total: Number(data?.total) || 0, // 返回数据总数
              };
            }}

            onRequestError={ (error) => {
                console.log(error)
            }}
            columns={columns} // 传递表格列配置
        />
        {/* 新建用户模态框 */}
        <CreateModal
            visible={createModalVisible} // 控制是否可见
            columns={columns} // 表单使用的列配置
            onSubmit={() => {
              setCreateModalVisible(false); // 提交后关闭模态框
              actionRef.current?.reload(); // 刷新表格
            }}
            onCancel={() => {
              setCreateModalVisible(false); // 取消后关闭模态框
            }}
        />
        {/* 更新用户模态框 */}
        <UpdateModal
            visible={updateModalVisible} // 控制是否可见
            columns={columns} // 表单使用的列配置
            oldData={currentRow} // 传递旧数据
            onSubmit={() => {
              setUpdateModalVisible(false); // 提交后关闭模态框
              setCurrentRow(undefined); // 清空当前选中的行数据
              actionRef.current?.reload(); // 刷新表格
            }}
            onCancel={() => {
              setUpdateModalVisible(false); // 取消后关闭模态框
            }}
        />
      </PageContainer>
  );
};

// 导出组件
export default UserAdminPage;
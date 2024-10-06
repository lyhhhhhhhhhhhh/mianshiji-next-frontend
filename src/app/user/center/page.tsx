"use client"

import {Avatar, Card, Col, Row} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import {useState} from "react";
import CalendarChart from "@/app/user/center/components/CalendarChart";

/**
 * 用户中心页面
 * @constructor
 */
export default function UserCenterPage() {

    //获取登录用户信息
    const loginUser = useSelector((state:RootState) => state.loginUser);
    //便于复用 新起一个变量
    const user = loginUser;
    //控制菜单栏的高亮
    const [activeTab, setActiveTab] = useState<string>("record")

    return (
        <div id="UserCenterPage" style={{maxWidth:"1200px"}}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                    <Card style={{textAlign:"center"}}>
                        <Avatar src={user.userAvatar} size={72}/>
                        <div style={{marginBottom: "16px"}}></div>
                        <Card.Meta title={<Title level={4}>{user.userName}</Title>}
                        description={
                            <Paragraph type="secondary">
                                {user.userProfile}
                        </Paragraph>}
                        >
                        </Card.Meta>
                    </Card>
                </Col>
                <Col xs={24} md={18}>
                    <Card tabList={[
                        {
                            key: "record",
                            label: "刷题记录"
                        },
                        {
                            key: "others",
                            label: "其他"
                        }
                    ]}
                    activeTabKey={activeTab}
                          onTabChange={
                              (key) => {
                                  setActiveTab(key)
                              }
                          }
                    >
                        {activeTab === 'record' && <>
                        <CalendarChart></CalendarChart>
                        </>}
                        {activeTab === 'others' && <>bbb</>}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
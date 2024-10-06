"use client";

import MdEditor from "@/components/MdEditor";
import {Button, message} from "antd";
import {useCallback, useState} from "react";
import {scSend} from "serverchan-sdk";

export default function TestPage() {
    // 使用 useState 来存储编辑器的内容
    const [markdownContent, setMarkdownContent] = useState<string>("");

    const sendKey = "sctp1230t1qsyp6qjy9z1f3w6fy8un3";
    const title = "通知";

    // onChange 回调函数，使用 useCallback 来优化
    const handleEditorChange = useCallback((content: string) => {
        setMarkdownContent(content); // 更新编辑器内容到 state 中
    }, []);

    const sendMsgToPhone = async () => {
        try {
            // 发送消息并等待响应
            const response = await scSend(sendKey, title, markdownContent, {tags: '服务器报警|报告'});
            message.success(response?.message || '消息发送成功');
        } catch (error) {
            // 安全处理错误
            message.error(error instanceof Error ? error.message : '发送失败，请重试');
        }
    };

    return (
        <div className="max-width-content" style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MdEditor
                value={markdownContent} // 传递编辑器的内容
                onChange={handleEditorChange} // 当内容变化时，更新 state
                placeholder="Start typing your markdown here..."
            />
            <Button
                type="primary"
                style={{marginTop: "10px"}}
                onClick={sendMsgToPhone}
            >
                发送消息到手机
            </Button>
        </div>
    );
}
"use client";

import MdEditor from "@/components/MdEditor";
import {Button, Input, TimePicker, message} from "antd";
import {useCallback, useEffect, useState} from "react";
import {scSend} from "serverchan-sdk";
import dayjs from "dayjs";

export default function SendMsgToPhone() {
    // 使用 useState 存储编辑器内容、sendKey、以及发送时间
    const [markdownContent, setMarkdownContent] = useState<string>("");
    const [sendKey, setSendKey] = useState<string>("");
    const [sendTime, setSendTime] = useState<any>(null);

    const title = "通知";

    // onChange 回调函数，使用 useCallback 来优化
    const handleEditorChange = useCallback((content: string) => {
        setMarkdownContent(content); // 更新编辑器内容到 state 中
    }, []);

    // 处理sendKey输入变化
    const handleSendKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSendKey(e.target.value);
    };

    // 处理发送时间变化
    const handleTimeChange = (time: any) => {
        setSendTime(time);
    };

    // 发送消息函数
    const sendMsgToPhone = async () => {
        if (!sendKey) {
            message.error("请填写 sendKey");
            return;
        }
        try {
            // 发送消息并等待响应
            const response = await scSend(sendKey, title, markdownContent, {tags: '服务器报警|报告'});
            message.success(response?.message || '消息发送成功');
        } catch (error) {
            // 安全处理错误
            message.error(error instanceof Error ? error.message : '发送失败，请重试');
        }
    };

    // 使用 useEffect 来设定定时任务
    useEffect(() => {
        if (!sendTime) return;

        const now = dayjs();
        const selectedTime = dayjs(sendTime);

        // 计算出距离发送时间的毫秒数
        let delay = selectedTime.diff(now);

        if (delay < 0) {
            // 如果当前时间已经过了设定时间，延迟到明天的相同时间
            delay += 24 * 60 * 60 * 1000;
        }

        const timer = setTimeout(() => {
            sendMsgToPhone();
        }, delay);

        return () => clearTimeout(timer); // 清除定时器
    }, [sendTime, markdownContent, sendKey]);

    return (
        <div className="max-width-content">
            <Input
                placeholder="请输入 sendKey"
                value={sendKey}
                onChange={handleSendKeyChange}
                style={{marginBottom: '10px',width:"80%"}}
            />
            <TimePicker
                onChange={handleTimeChange}
                value={sendTime}
                format="HH:mm"
                placeholder="选择每天发送的时间"
                style={{marginBottom: '10px'}}
            />
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
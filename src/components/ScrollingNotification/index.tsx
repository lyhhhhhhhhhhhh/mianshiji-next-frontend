"use client"

import React, { useEffect } from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import './ScrollingNotification.css'; // 引入自定义的 CSS 样式

interface Props {
    title?: string;
    content?: string;
}

const ScrollingNotification = ({title,content} : Props) => {
    const openNotification = () => {
        notification.open({
            message: title,
            description: content,
            duration: 0, // 设置为 0，使其持续显示
            style: {
                maxHeight: '50px',
                overflow: 'hidden',
            },
            className: 'scrolling-notification',
        });
    };

    useEffect(() => {
        openNotification();
    }, [title, content]);

    return null; // 不需要实际的 DOM 渲染
};

export default ScrollingNotification;

// ScrollingNotification.css



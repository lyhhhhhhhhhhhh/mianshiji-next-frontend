import React from "react";
import "./index.css"

/**
 * 全局底部栏规范
 * @constructor
 */
export default function GlobalFooter() {
    const currentYear = new Date().getFullYear()
  return (
    <div
        className="global-footer"
    >
      <div>© {currentYear} 考公刷题平台</div>
      <div>
          <a href="https://github.com/lyhhhhhhhhhhhh/mianshiji-next-frontend" target="_blank">
              作者：LKING
          </a>
      </div>
    </div>
  );
}
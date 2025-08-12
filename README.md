# React 智慧读书APP
 readme.md 中记载
 一款方便用户读书的APP，
 采用古风文化类的样式，使用户更加热爱中国文化

## 项目亮点
1. 采用了React的懒加载和代码分割技术，可以显著提高应用的初始加载速度，特别是对于大型应用
2. 组件化设计清晰，将界面拆分成多个独立，可复用的组件，每个组件负责界面的一部分功能，方便维护和扩展 
如：
- 书架组件
- 发现组件
- AI助手组件
- 笔记组件
- 我的组件
3. 包含主题切换功能：
- 支持切换日间模式和夜间模式
4. 流式输出：
5. AI助手的回复采用流式输出，用户可以边打字边等待回复，避免等待时间过长。
- kimi引入聊天功能
    在Chat组件中引入kimi的api，实现聊天功能，当用户发送消息时，调用kimi的api，将用户的消息发送给kimi，kimi会返回一个回复，将回复显示在页面上。
    同时，在Chat组件中引入kimi的聊天记录功能，用户可以查看之前的聊天记录，方便用户继续对话。


6. - 全面ES6和HTML5化
    ES6：箭头函数、结构赋值、模板字符串、Promise、async/await、类、模块等
    HTML5：语义化标签、表单新属性、本地存储、会话存储等




## 项目问题
- 版本不兼容
 项目使用的是React 19.1.0和ReactDOM 19.1.0 
 react-vant 版本3.3.5 与React 19.1.0 不兼容，导致页面无法正常运行
 只能去手写Input, Toast, Dialog 等组件，导致代码量增加，但是功能正常运行



## 技术栈
- React全家桶
  - React组件
  1.组件封装
  2.第三方组件库React-vant
  3.自定义hooks和内置hooks
- React-router-dom
1.路由懒加载
2.路由守卫

- Mock.js 模拟数据
- axios 发送请求
- 本地存储
  1. 书架数据
  2. 笔记数据
  3. 阅读进度
- 全局状态管理
  1. 主题切换
  2. 登录状态
  3. 路由跳转
- 性能优化
  1. 代码分割
  2. 图片压缩
  3. 缓存策略

## 项目结构

- mock     模拟数据
- public  公共文件
- api      接口
- assets    静态资源
- components   组件
- hooks    自定义hooks
- llm      用来连接大模型
- pages    页面
- store    状态管理
- utils    工具类
- App.jsx  入口文件
- main.jsx  主入口文件
- .env.local  环境变量配置文件
- index.html  根文件
- package.json  包管理文件
- postcss.config.js  postcss配置文件
- vite.config.ts  vite配置文件

# 安装的依赖
    - 生产依赖(都用`npm i ...`进行安装)
        1. @react-vant/icons
        2. axios			
        3. lib-flexible
        4. mitt
        5. mockjs
        6. react-router-dom
        7. react-vant

# 页面结构（6个页面）
1.书架页(/)
 · 展示“在读/已读/待读”三种书架
 · 支持长按多选、批量移动/删除
2.发现页(/discover)
 ·搜索+推荐榜单（豆瓣API/自建爬虫）
 ·点击书籍->跳详情页
3.AI助手页(/ai)
 ·封面、简介、评分、加入书架/立即阅读 按钮
4.笔记页(/notes)
 ·汇总所有划线+批注，可搜索、导出txt
5.我的页(/me)
 ·账号信息、阅读时长统计、设置(缓存清理、夜间模式)
 
 猜你想问与用户互动
  - 问题咨询
  - 阅读建议
  - 笔记生成

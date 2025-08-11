# Read App 项目规则

> 适用于 Vite 6 + React 19 + React Router 7 + ESLint 9 的前端项目。本规则用于统一开发习惯、保障质量与交付效率。

## 一、基础信息与环境
- 技术栈: Vite、React、React Router、ESLint（含 react-hooks / react-refresh 插件）
- Node: 建议使用 20 LTS（最低 18）
- 包管理: 统一使用 npm
- 常用脚本:
  - npm run dev: 启动本地开发
  - npm run build: 构建产物
  - npm run preview: 预览构建产物
  - npm run lint: 代码检查（提交前必须通过）

## 二、目录结构与命名
现有主要结构:

```
src/
  App.jsx
  main.jsx
  assets/
  page/
    book/index.jsx
    discover/index.jsx
    me/index.jsx
    notes/index.jsx
    read/index.jsx
```

建议按需新增:
- src/components/: 复用组件（文件命名 PascalCase.jsx）
- src/services/: API 调用与数据适配（如 bookService.js、noteService.js）
- src/hooks/: 自定义 Hook（useXxx 命名）
- src/utils/: 工具函数
- src/styles/: 全局样式、变量与主题
- src/store/: 轻量全局状态（Context 等）

命名规范:
- 组件、类: PascalCase；Hook: useXxx；其余: camelCase
- 路由目录使用小写（已采用）
- 静态资源小写短横线分隔（如 cover-large.png）

## 三、路由规范
- 入口: src/App.jsx 使用 BrowserRouter/Routes/Route
- 既定路径（与 README 对齐）:
  - /: 书架页（当前实现首页为 Discover，若需切回书架页请在后续调整）
  - /discover: 发现页
  - /book/:id: 书籍详情页
  - /read/:id: 阅读器页
  - /notes: 笔记页
  - /me: 我的页
- 动态路由参数通过 useParams 获取
- 代码分割: 页面与重型组件使用 React.lazy + Suspense 懒加载
- 错误边界: 在 App 外层提供错误边界，避免单页异常影响整体

## 四、代码风格与质量
- ESLint: 必须通过；遵循 react-hooks 规则；禁止无用变量（已对大写开头常量作忽略）
- 格式化: 推荐配合 Prettier（可后续补充配置）；当前以 ESLint 自动修复为主
- 导入顺序: 第三方 > 别名模块 > 相对路径；样式导入位于文件末尾
- 组件: 函数组件 + Hooks；早返回避免深嵌套
- 健壮性: Props 明确；如未接入 TS，必要时使用 PropTypes

## 五、样式与主题
- 现状: 全局 CSS（src/index.css、src/App.css）
- 建议策略（二选一或组合）:
  - CSS Modules: Component.module.css，避免全局污染
  - BEM 命名: block__element--modifier
- 主题: 通过 data-theme 或根节点 class 切换；颜色使用 CSS Variables
- 响应式: 移动优先；通用断点 375/414/768/1024/1440

## 六、数据与 API
- 服务层: 在 src/services/ 中按资源拆分模块
- 请求规范:
  - 统一封装 fetch：超时、AbortController、错误码与 JSON 解析
  - 幂等 GET 可按需重试
  - 针对列表/详情可做内存或 sessionStorage 缓存
- 环境变量: 使用 .env.*（Vite 规则）
  - 例如 VITE_API_BASE_URL=https://api.example.com
- 错误语义: 服务层抛出结构化错误 { code, message, detail }，UI 层决定呈现

## 七、状态与存储
- 优先级: 组件局部状态 > URL 参数 > Context（或轻量全局）> 持久化
- 本地持久化（阅读进度/划线笔记）:
  - 小量数据: localStorage；较大数据: IndexedDB
  - 通过 src/utils/storage 封装：键名、版本、迁移与容量检查
- 同步策略: 离线优先，在线合并（后续可扩展）

## 八、错误处理与日志
- 错误边界兜底渲染期异常（提供刷新/返回首页操作）
- 请求错误统一转用户友好文案，区分网络/权限/空数据
- console 仅限开发，必要时接入埋点/日志平台

## 九、性能与体验
- 路由与重型组件懒加载；长列表（>100 行）考虑虚拟化
- 图片资源压缩与 loading="lazy"
- 合理使用 useMemo/useCallback，避免无谓重渲染
- 拆分大组件，优化首屏

## 十、可访问性与语义化
- 图片 alt、交互 aria-*、语义标签（main/nav/section）
- 对比度与键盘可达；label 与表单控件关联

## 十一、国际化（可选）
- 若需要多语言，建议使用 i18next；文案统一管理，避免硬编码

## 十二、安全
- 任何 HTML 片段渲染前需净化（如 DOMPurify）以防 XSS
- 使用 HTTPS；敏感信息谨慎存储（优先 httpOnly Cookie）
- 密钥不入库，使用 .env 与密钥管理

## 十三、Git 与协作
- 分支命名:
  - 功能: feat/xxx；修复: fix/xxx；重构: refactor/xxx
- 提交信息（Conventional Commits）:
  - 例如: feat(book): 支持加入书架与批量移动
- 代码评审:
  - 变更 > 200 行建议拆分；合并前必须通过 ESLint 与自测

## 十四、版本与发布
- 版本: 采用 SemVer（major.minor.patch）
- 构建: npm run build → dist/
- 预览: npm run preview
- 回滚: 保留上一个稳定构建产物与标签

## 十五、测试（后续补充）
- 建议接入 Vitest + React Testing Library：
  - 关键组件/Hook/服务层函数需最少用例覆盖
  - 路由与页面行为冒烟测试

## 十六、落地清单（务必遵守）
- 提交前运行并通过: npm run lint
- 新页面与重型组件使用懒加载
- API 调用通过 src/services/* 统一封装
- 本地持久化通过 src/utils/storage 工具
- UI 错误由错误边界统一兜底



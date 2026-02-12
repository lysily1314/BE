# ec-ui 微信小程序组件库 Wiki 文档

## 1. 项目概述

### 1.1 项目简介
ec-ui 是一个基于微信小程序原生开发的电商组件库，提供了丰富的UI组件和页面模板，旨在帮助开发者快速构建高质量的电商小程序。

### 1.2 项目特点
- **丰富的组件库**：包含按钮、输入框、滑动菜单、吸顶容器等多种常用组件
- **完整的页面模板**：提供登录页、个人中心等常用页面模板
- **原生开发**：基于微信小程序原生开发，无外部依赖
- **易于使用**：组件API设计简洁明了，易于集成和使用
- **高度可定制**：支持自定义样式和行为
- **响应式设计**：适配不同屏幕尺寸

### 1.3 应用场景
- 电商小程序开发
- 企业展示小程序
- 内容服务小程序
- 任何需要高质量UI组件的小程序项目

## 2. 架构设计

### 2.1 项目结构

```
g:\workSpace\BE/
├── components/            # 组件目录
│   ├── common/            # 通用工具和样式
│   ├── ec-action-sheet/   # 动作面板组件
│   ├── ec-button/         # 按钮组件
│   ├── ec-input/          # 输入框组件
│   └── ... (其他组件)
├── pages/                 # 页面目录
│   ├── button/            # 按钮示例页面
│   ├── input/             # 输入框示例页面
│   ├── login/             # 登录页模板
│   ├── profile/           # 个人中心页模板
│   └── ... (其他示例页面)
├── app.js                 # 应用入口
├── app.json               # 应用配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
└── sitemap.json           # 站点地图
```

### 2.2 组件设计原则
- **单一职责**：每个组件只负责一个特定的功能
- **可复用性**：组件设计考虑多场景复用
- **可定制性**：支持通过属性和样式进行定制
- **性能优化**：考虑组件的渲染性能
- **一致性**：组件API设计保持一致

### 2.3 页面模板设计
- **模块化**：页面模板采用模块化设计，易于集成
- **可扩展性**：预留扩展点，支持功能扩展
- **最佳实践**：集成组件使用的最佳实践

## 3. 技术栈说明

### 3.1 前端技术
- **框架**：微信小程序原生开发
- **开发工具**：微信开发者工具
- **模板语言**：WXML (类似HTML)
- **样式语言**：WXSS (类似CSS)
- **脚本语言**：JavaScript (ES6+)
- **数据绑定**：微信小程序数据绑定机制

### 3.2 配置与构建
- **项目配置**：project.config.json
- **应用配置**：app.json
- **构建工具**：微信开发者工具内置构建
- **代码压缩**：支持代码压缩和混淆

### 3.3 依赖管理
- **无外部依赖**：纯原生实现，无第三方库依赖
- **内部依赖**：组件间的依赖通过微信小程序组件引用机制管理

## 4. 开发环境配置指南

### 4.1 开发工具安装
1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 注册并登录微信开发者账号
3. 创建或导入项目

### 4.2 项目导入
1. 打开微信开发者工具
2. 点击"导入项目"
3. 选择项目根目录 `g:\workSpace\BE`
4. 填写AppID（如果没有，可选择"测试号"）
5. 点击"导入"按钮完成导入

### 4.3 开发配置
- **ES6支持**：已在 `project.config.json` 中开启
- **代码压缩**：已在 `project.config.json` 中开启
- **热重载**：已在 `project.config.json` 中开启
- **调试模式**：可在微信开发者工具中开启

### 4.4 运行项目
1. 在微信开发者工具中点击"编译"按钮
2. 可在模拟器中预览效果
3. 可使用真机调试功能在真实设备上测试

## 5. 核心功能模块说明

### 5.1 基础UI组件

#### 5.1.1 Button 按钮
- **功能**：提供多种类型、尺寸、状态的按钮
- **属性**：type, size, disabled, loading, icon等
- **事件**：tap
- **使用场景**：表单提交、操作确认、导航等

#### 5.1.2 Input 输入框
- **功能**：提供文本输入功能，支持多种输入类型
- **属性**：value, placeholder, type, disabled等
- **事件**：input, focus, blur, confirm
- **使用场景**：表单输入、搜索框、登录注册等

#### 5.1.3 Icon 图标
- **功能**：提供多种图标
- **属性**：name, size, color
- **使用场景**：导航、按钮、状态指示等

### 5.2 交互组件

#### 5.2.1 Swipeout 滑动菜单
- **功能**：支持左右滑动显示操作按钮
- **属性**：rightActions, leftActions, threshold等
- **事件**：action
- **使用场景**：列表项操作、消息管理等

#### 5.2.2 Sticky 吸顶容器
- **功能**：滚动到指定位置时固定在顶部
- **属性**：offsetTop, enabled, zIndex等
- **事件**：change
- **使用场景**：导航栏、标签栏、筛选条件等

#### 5.2.3 Dialog 对话框
- **功能**：提供模态对话框
- **属性**：show, title, message, confirmText等
- **事件**：confirm, cancel
- **使用场景**：确认操作、提示信息等

### 5.3 表单组件

#### 5.3.1 Radio 单选/复选
- **功能**：提供单选和复选功能
- **属性**：value, checked, disabled等
- **事件**：change
- **使用场景**：表单选择、设置项等

#### 5.3.2 Switch 开关
- **功能**：提供开关功能
- **属性**：checked, disabled等
- **事件**：change
- **使用场景**：设置项、功能开关等

#### 5.3.3 Stepper 步进器
- **功能**：提供数字增减功能
- **属性**：value, min, max, step等
- **事件**：change
- **使用场景**：数量选择、评分等

### 5.4 页面模板

#### 5.4.1 Login 登录页
- **功能**：提供完整的登录页面模板
- **支持**：手机号登录、验证码登录
- **特性**：表单验证、倒计时、密码显示/隐藏
- **使用场景**：用户登录

#### 5.4.2 Profile 个人中心
- **功能**：提供个人中心页面模板
- **支持**：用户信息展示、订单状态、快捷功能
- **特性**：模块化设计、可扩展性
- **使用场景**：用户个人中心

## 6. API接口文档

### 6.1 组件API通用规则
- **属性传递**：通过组件属性传递配置
- **事件触发**：通过bind:事件名绑定事件处理函数
- **插槽使用**：通过slot标签使用组件插槽
- **外部样式**：通过externalClasses传递外部样式类

### 6.2 核心组件API

#### 6.2.1 Button 按钮
```xml
<ec-button 
  type="primary" 
  size="medium" 
  disabled="{{false}}" 
  loading="{{false}}" 
  icon="cart" 
  bind:tap="onTap"
>
  按钮文本
</ec-button>
```

#### 6.2.2 Input 输入框
```xml
<ec-input 
  value="{{inputValue}}" 
  placeholder="请输入" 
  type="text" 
  disabled="{{false}}" 
  bind:input="onInput" 
  bind:focus="onFocus" 
  bind:blur="onBlur"
/>
```

#### 6.2.3 Swipeout 滑动菜单
```xml
<ec-swipeout 
  right-actions="{{rightActions}}" 
  left-actions="{{leftActions}}" 
  bind:action="onAction"
>
  <ec-cell title="内容" value="滑动操作" is-link="{{false}}" />
</ec-swipeout>
```

#### 6.2.4 Sticky 吸顶容器
```xml
<ec-sticky 
  offset-top="0" 
  enabled="{{true}}" 
  z-index="99" 
  bind:change="onChange"
>
  <ec-tabs 
    active="{{activeTab}}" 
    bind:change="onTabChange"
    items="{{tabs}}"
  />
</ec-sticky>
```

### 6.3 页面模板API

#### 6.3.1 Login 登录页
- **配置**：支持配置登录方式、验证码设置等
- **事件**：登录成功、注册、忘记密码等
- **使用**：直接引入页面模板，配置相应参数

#### 6.3.2 Profile 个人中心
- **配置**：支持配置用户信息、快捷功能等
- **事件**：点击各项功能、登录等
- **使用**：直接引入页面模板，配置相应参数

## 7. 常见问题解决方案

### 7.1 组件显示问题

#### 7.1.1 组件样式错乱
- **问题**：组件样式显示不正常
- **原因**：可能是样式冲突或CSS优先级问题
- **解决方案**：
  1. 检查是否存在样式冲突
  2. 使用组件的externalClasses自定义样式
  3. 确保组件的样式类名正确

#### 7.1.2 组件高度为0
- **问题**：组件显示但高度为0
- **原因**：可能是内容为空或样式设置问题
- **解决方案**：
  1. 确保组件内有内容
  2. 检查组件的样式设置
  3. 对于容器组件，确保设置了合适的高度

### 7.2 交互问题

#### 7.2.1 滑动操作不响应
- **问题**：滑动操作没有反应
- **原因**：可能是触摸事件被阻止或样式问题
- **解决方案**：
  1. 检查是否有其他元素阻止了触摸事件
  2. 确保组件的样式设置正确
  3. 检查组件的disabled属性是否为true

#### 7.2.2 吸顶效果不生效
- **问题**：吸顶容器没有固定在顶部
- **原因**：可能是offsetTop设置不正确或样式问题
- **解决方案**：
  1. 检查offsetTop属性设置
  2. 确保容器内有内容
  3. 检查zIndex是否足够高，避免被其他元素覆盖

### 7.3 性能问题

#### 7.3.1 滚动卡顿
- **问题**：滚动时页面卡顿
- **原因**：可能是组件渲染过多或事件处理复杂
- **解决方案**：
  1. 减少同一页面的组件数量
  2. 优化事件处理逻辑
  3. 使用wx:if和wx:else控制组件渲染

#### 7.3.2 初始加载缓慢
- **问题**：页面初始加载缓慢
- **原因**：可能是组件初始化逻辑复杂或资源加载过多
- **解决方案**：
  1. 优化组件初始化逻辑
  2. 减少初始加载的资源
  3. 使用异步加载和懒加载

## 8. 版本历史记录

### 8.1 版本 1.0.0
- **发布日期**：2026-02-12
- **主要功能**：
  - 基础UI组件：Button、Input、Icon等
  - 交互组件：Swipeout、Sticky、Dialog等
  - 表单组件：Radio、Switch、Stepper等
  - 页面模板：Login、Profile等
- **技术特点**：
  - 微信小程序原生开发
  - 无外部依赖
  - 模块化设计
  - 高度可定制

### 8.2 版本规划

#### 版本 1.1.0
- **计划日期**：2026-03-30
- **预期功能**：
  - 新增更多电商相关组件
  - 优化组件性能
  - 完善文档
  - 增加更多页面模板

#### 版本 1.2.0
- **计划日期**：2026-05-30
- **预期功能**：
  - 支持主题定制
  - 增加动画效果
  - 优化移动端体验
  - 增加国际化支持

## 9. 贡献指南

### 9.1 开发规范

#### 代码风格
- **命名规范**：
  - 组件名：ec-组件名（小写，中划线分隔）
  - 变量名：小驼峰命名法
  - 函数名：小驼峰命名法
  - 常量名：大写，下划线分隔
- **缩进**：使用2个空格缩进
- **注释**：
  - 组件说明：详细说明组件功能和用法
  - 代码注释：关键逻辑添加注释
  - API文档：每个组件提供完整的API文档

#### 开发流程
1. **分支管理**：
   - master：主分支，用于发布稳定版本
   - develop：开发分支，用于集成新功能
   - feature/xxx：功能分支，用于开发新功能
   - fix/xxx：修复分支，用于修复bug
2. **提交规范**：
   - 提交信息：类型(scope): 描述
   - 类型：feat(新功能)、fix(修复)、docs(文档)、style(样式)、refactor(重构)、test(测试)
   - 示例：feat(button): 添加图标支持

### 9.2 贡献步骤

1. **Fork 仓库**：在GitHub上Fork项目仓库
2. **克隆仓库**：克隆到本地开发环境
3. **创建分支**：根据功能创建相应分支
4. **开发功能**：实现新功能或修复bug
5. **测试验证**：确保功能正常，无bug
6. **提交代码**：按照规范提交代码
7. **创建PR**：在GitHub上创建Pull Request
8. **代码审查**：等待代码审查
9. **合并代码**：审查通过后合并到主分支

### 9.3 代码审查标准

#### 功能性
- 功能是否完整实现
- 是否符合需求文档
- 是否有边界情况处理

#### 代码质量
- 代码是否清晰易读
- 是否有适当的注释
- 是否遵循代码规范

#### 性能
- 是否有性能优化
- 是否避免了不必要的渲染
- 是否有内存泄漏风险

#### 兼容性
- 是否兼容不同版本的微信小程序
- 是否兼容不同设备尺寸
- 是否兼容不同操作系统

### 9.4 问题反馈与支持

#### 问题反馈
- **GitHub Issues**：在GitHub上提交Issue
- **描述问题**：详细描述问题现象、复现步骤、预期结果
- **提供环境**：微信小程序版本、设备信息等
- **附上代码**：相关代码片段或完整代码

#### 技术支持
- **文档查阅**：先查阅本Wiki文档
- **社区讨论**：参与项目讨论
- **邮件支持**：联系项目维护者

## 10. 附录

### 10.1 资源链接
- **微信小程序开发文档**：[https://developers.weixin.qq.com/miniprogram/dev/framework/](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- **微信开发者工具**：[https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- **项目GitHub仓库**：[链接]

### 10.2 术语表
- **组件**：微信小程序中的自定义组件
- **页面**：微信小程序中的页面
- **WXML**：微信小程序的模板语言
- **WXSS**：微信小程序的样式语言
- **API**：应用程序接口
- **PR**：Pull Request，代码合并请求
- **Issue**：GitHub上的问题反馈



---
用户要求为项目中的每个组件编写详细的使用教程文档。这是一个大任务，需要逐一为每个组件编写文档。我将从核心组件开始，先编写Button组件的使用教程。
        
            
toolName: todo_write
            
status: success
          
Todos updated: 10 items
          
# Button 组件使用教程

## 1. 功能描述

Button 组件是一个功能丰富的按钮组件，用于在小程序中创建各种类型的按钮。它支持多种按钮类型、尺寸、状态和样式，可用于表单提交、操作确认、导航等各种场景。

## 2. 传入参数

| 参数名称 | 数据类型 | 默认值 | 是否必填 | 详细说明 |
|---------|---------|-------|---------|---------|
| `type` | String | 'default' | 否 | 按钮类型，可选值：'primary'（主要按钮）、'default'（默认按钮）、'text'（文字按钮） |
| `size` | String | 'medium' | 否 | 按钮尺寸，可选值：'large'（大号）、'medium'（中号）、'small'（小号） |
| `block` | Boolean | false | 否 | 是否为通栏按钮（宽度占满父容器） |
| `disabled` | Boolean | false | 否 | 是否禁用按钮 |
| `loading` | Boolean | false | 否 | 是否显示加载状态 |
| `round` | Boolean | false | 否 | 是否为圆角按钮 |
| `plain` | Boolean | false | 否 | 是否为朴素按钮（透明背景） |
| `icon` | String | '' | 否 | 按钮图标名称，参考 Icon 组件的图标列表 |

## 3. 事件

| 事件名称 | 详细说明 | 回调参数 |
|---------|---------|---------|
| `tap` | 按钮点击事件，在按钮未禁用且非加载状态时触发 | 无 |

## 4. 代码示例

### 4.1 基础用法

```xml
<!-- 主要按钮 -->
<ec-button type="primary" bind:tap="onTap">主要按钮</ec-button>

<!-- 默认按钮 -->
<ec-button type="default" bind:tap="onTap">默认按钮</ec-button>

<!-- 文字按钮 -->
<ec-button type="text" bind:tap="onTap">文字按钮</ec-button>
```

### 4.2 不同尺寸

```xml
<!-- 大号按钮 -->
<ec-button type="primary" size="large" bind:tap="onTap">大号按钮</ec-button>

<!-- 中号按钮 -->
<ec-button type="primary" size="medium" bind:tap="onTap">中号按钮</ec-button>

<!-- 小号按钮 -->
<ec-button type="primary" size="small" bind:tap="onTap">小号按钮</ec-button>
```

### 4.3 圆角按钮

```xml
<!-- 圆角主要按钮 -->
<ec-button type="primary" round bind:tap="onTap">圆角按钮</ec-button>

<!-- 圆角默认按钮 -->
<ec-button type="default" round bind:tap="onTap">圆角按钮</ec-button>
```

### 4.4 通栏按钮

```xml
<!-- 通栏主要按钮 -->
<ec-button type="primary" block bind:tap="onTap">通栏按钮</ec-button>

<!-- 通栏默认按钮 -->
<ec-button type="default" block bind:tap="onTap">通栏按钮</ec-button>
```

### 4.5 禁用状态

```xml
<!-- 禁用的主要按钮 -->
<ec-button type="primary" disabled bind:tap="onTap">禁用按钮</ec-button>

<!-- 禁用的默认按钮 -->
<ec-button type="default" disabled bind:tap="onTap">禁用按钮</ec-button>
```

### 4.6 加载状态

```xml
<!-- 加载中的主要按钮 -->
<ec-button type="primary" loading bind:tap="onTap">加载中</ec-button>

<!-- 点击后显示加载状态 -->
<ec-button type="primary" loading="{{loading}}" bind:tap="onLoadingTap">{{loading ? '加载中' : '点击加载'}}</ec-button>
```

### 4.7 带图标按钮

```xml
<!-- 带购物车图标的按钮 -->
<ec-button type="primary" icon="cart" bind:tap="onTap">购物车</ec-button>

<!-- 带心形图标的按钮 -->
<ec-button type="default" icon="heart" bind:tap="onTap">收藏</ec-button>
```

### 4.8 朴素按钮

```xml
<!-- 朴素主要按钮 -->
<ec-button type="primary" plain bind:tap="onTap">朴素按钮</ec-button>

<!-- 朴素默认按钮 -->
<ec-button type="default" plain bind:tap="onTap">朴素按钮</ec-button>
```

## 5. 常见使用场景及最佳实践

### 5.1 表单提交

**场景描述**：用于表单的提交按钮，通常使用主要按钮类型，以突出显示。

**代码示例**：

```xml
<form bindsubmit="onSubmit">
  <!-- 表单字段 -->
  <ec-input name="username" placeholder="请输入用户名" />
  <ec-input name="password" placeholder="请输入密码" password />
  
  <!-- 提交按钮 -->
  <ec-button type="primary" block formType="submit" bind:tap="onSubmit">登录</ec-button>
</form>
```

**最佳实践**：
- 使用 `type="primary"` 突出显示提交按钮
- 使用 `block` 属性使按钮宽度占满表单宽度
- 配合 `loading` 属性显示提交中的状态

### 5.2 操作确认

**场景描述**：用于需要用户确认的操作，如删除、取消等。

**代码示例**：

```xml
<view class="action-buttons">
  <ec-button type="default" size="medium" bind:tap="onCancel">取消</ec-button>
  <ec-button type="primary" size="medium" bind:tap="onConfirm">确认</ec-button>
</view>
```

**最佳实践**：
- 使用不同类型的按钮区分操作的重要性
- 确认按钮使用 `type="primary"`，取消按钮使用 `type="default"`
- 对于危险操作（如删除），可考虑使用红色等醒目的颜色

### 5.3 导航按钮

**场景描述**：用于页面导航或链接跳转的按钮。

**代码示例**：

```xml
<ec-button type="primary" icon="arrow-right" bind:tap="onNavigate">
  查看详情
</ec-button>
```

**最佳实践**：
- 使用图标增强导航按钮的视觉效果
- 对于次要导航，可使用 `type="text"` 或 `type="default"`
- 对于重要导航，使用 `type="primary"`

### 5.4 状态切换

**场景描述**：用于切换状态的按钮，如收藏/取消收藏、关注/取消关注等。

**代码示例**：

```xml
<ec-button 
  type="{{isFavorited ? 'primary' : 'default'}}" 
  icon="{{isFavorited ? 'heart-fill' : 'heart'}}" 
  bind:tap="onToggleFavorite"
>
  {{isFavorited ? '已收藏' : '收藏'}}
</ec-button>
```

**最佳实践**：
- 根据状态动态改变按钮的类型和图标
- 使用清晰的文字说明当前状态
- 配合动画效果提升用户体验

### 5.5 按钮组

**场景描述**：多个按钮组合使用，如筛选条件、步骤导航等。

**代码示例**：

```xml
<view class="button-group">
  <ec-button 
    type="{{activeTab === 0 ? 'primary' : 'default'}}" 
    bind:tap="onTabChange" 
    data-index="0"
  >
    全部
  </ec-button>
  <ec-button 
    type="{{activeTab === 1 ? 'primary' : 'default'}}" 
    bind:tap="onTabChange" 
    data-index="1"
  >
    待付款
  </ec-button>
  <ec-button 
    type="{{activeTab === 2 ? 'primary' : 'default'}}" 
    bind:tap="onTabChange" 
    data-index="2"
  >
    已完成
  </ec-button>
</view>
```

**最佳实践**：
- 使用相同的尺寸和样式保持一致性
- 根据当前状态高亮显示活动按钮
- 对于水平排列的按钮组，可使用 `size="small"` 适应空间

## 6. 代码运行示例

以下是一个完整的页面示例，展示了 Button 组件的各种用法：

```xml
<!-- button-demo.wxml -->
<view class="demo-page">
  <!-- 按钮类型 -->
  <view class="demo-section">
    <text class="demo-section__title">按钮类型</text>
    <view class="demo-section__content">
      <ec-button type="primary" bind:tap="onTap">主要按钮</ec-button>
      <ec-button type="default" bind:tap="onTap">默认按钮</ec-button>
      <ec-button type="text" bind:tap="onTap">文字按钮</ec-button>
    </view>
  </view>

  <!-- 按钮尺寸 -->
  <view class="demo-section">
    <text class="demo-section__title">按钮尺寸</text>
    <view class="demo-section__content">
      <ec-button type="primary" size="large" bind:tap="onTap">大号按钮</ec-button>
      <ec-button type="primary" size="medium" bind:tap="onTap">中号按钮</ec-button>
      <ec-button type="primary" size="small" bind:tap="onTap">小号按钮</ec-button>
    </view>
  </view>

  <!-- 圆角按钮 -->
  <view class="demo-section">
    <text class="demo-section__title">圆角按钮</text>
    <view class="demo-section__content">
      <ec-button type="primary" round bind:tap="onTap">圆角按钮</ec-button>
      <ec-button type="default" round bind:tap="onTap">圆角按钮</ec-button>
    </view>
  </view>

  <!-- 通栏按钮 -->
  <view class="demo-section">
    <text class="demo-section__title">通栏按钮</text>
    <view class="demo-section__content">
      <ec-button type="primary" block bind:tap="onTap">通栏按钮</ec-button>
      <ec-button type="default" block bind:tap="onTap">通栏按钮</ec-button>
    </view>
  </view>

  <!-- 禁用状态 -->
  <view class="demo-section">
    <text class="demo-section__title">禁用状态</text>
    <view class="demo-section__content">
      <ec-button type="primary" disabled bind:tap="onTap">禁用按钮</ec-button>
      <ec-button type="default" disabled bind:tap="onTap">禁用按钮</ec-button>
    </view>
  </view>

  <!-- 加载状态 -->
  <view class="demo-section">
    <text class="demo-section__title">加载状态</text>
    <view class="demo-section__content">
      <ec-button 
        type="primary" 
        loading="{{loading}}" 
        bind:tap="onLoadingTap"
      >
        {{loading ? '加载中' : '点击加载'}}
      </ec-button>
    </view>
  </view>

  <!-- 带图标按钮 -->
  <view class="demo-section">
    <text class="demo-section__title">带图标按钮</text>
    <view class="demo-section__content">
      <ec-button type="primary" icon="cart" bind:tap="onTap">购物车</ec-button>
      <ec-button type="default" icon="heart" bind:tap="onTap">收藏</ec-button>
    </view>
  </view>
</view>
```

```javascript
// button-demo.js
Page({
  data: {
    loading: false,
    isFavorited: false
  },
  
  onTap() {
    wx.showToast({
      title: '点击了按钮',
      icon: 'none'
    });
  },
  
  onLoadingTap() {
    this.setData({ loading: true });
    setTimeout(() => {
      this.setData({ loading: false });
    }, 2000);
  },
  
  onToggleFavorite() {
    this.setData({
      isFavorited: !this.data.isFavorited
    });
  },
  
  onNavigate() {
    wx.navigateTo({
      url: '/pages/detail/index'
    });
  }
});
```

```css
/* button-demo.wxss */
.demo-page {
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 40rpx;
}

.demo-section__title {
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
  color: #333;
}

.demo-section__content {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
  justify-content: flex-end;
  margin-top: 20rpx;
}
```

## 7. 注意事项

1. **按钮类型选择**：根据按钮的重要性和使用场景选择合适的类型，主要操作使用 `primary` 类型，次要操作使用 `default` 类型，文本链接使用 `text` 类型。

2. **按钮尺寸**：根据页面布局和视觉层次选择合适的尺寸，大尺寸按钮用于重要操作，小尺寸按钮用于次要操作或空间有限的场景。

3. **加载状态**：对于异步操作，应使用 `loading` 属性显示加载状态，防止用户重复点击。

4. **禁用状态**：对于不可用的操作，应使用 `disabled` 属性禁用按钮，并提供清晰的视觉反馈。

5. **性能优化**：对于大量按钮的场景，可考虑使用 `wx:if` 和 `wx:else` 控制按钮的渲染，避免不必要的渲染开销。

6. **样式定制**：如需进一步定制按钮样式，可使用外部样式类 `custom-class`。

Button 组件是小程序中最常用的组件之一，掌握其各种用法和最佳实践，能够有效提升小程序的用户体验和界面美观度。

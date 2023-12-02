## Supported Frameworks

## 📖 目录结构

```
 - .storybook
 - docs
 - scripts
 - src
   - components   // 组件存放
   - sotries   // 输出文档
   - index.ts   // 导出组件
 - storybook-static
 - .gitignore
 - CHANGELOG.md
 - package.json
 - README.md
 - tsconfig.json
 - tsconfig.node.json
 - vite.config.ts

```

## 🏠 如何安装？


使用 npm

` npm i @best/components`

## 😄 相关脚本

启动

`npm run storybook` or `yarn run storybook`

打包构建

`npm run build` or `yarn run build`

打包生成文档

`npm run build-storybook` or `yarn run build-storybook`

发布

`npm run release`  or `yarn run release`

## 🧐 开发规范

### React组件规范
#### 文件命名

• 每一个文件只包含一个组件，每一个基本组件只包含单一功能

• 如果文件返回是一个类，文件名首字母大写

• 每一个组件使用一个单独的测试用例文件

#### Js规范

• 使用es6+开发，尽量使用常用的ES6+语法

• 使用tsx语法

• 组件文件命名使用大驼峰， ComponentDemo

• 带命名空间的组件，如果一个组件包含只有自身使用的子组件，以该组件为命名空间编写组件，例如Table，Table.Head

• 自定义属性使用data-

• 定义props避开react关键字及保留字，常用的props及state定义可参考下表

• 尽量少或者不使用ref获取和操作dom节点，使用state和prop进行控制dom，如遇必须使用的情况，添加详细注释信息

• 事件调用使用在元素上onClick调用

• 注意，react和html的表单元素的差异

• 不能私自添加第三方js库，如需要使用，必须通知本组组长，并在工作群里提出，At所有前端负责人，经讨论后再添加

• 尽量多而有用的代码注释，方法使用块级注释

• 避免使用定时器类的编码，如必须使用，需添加详细注释，各组长合并代码时需要审查是否合理，合确认是否含有销毁方法

• 自身定义的props属性应避免与react的关键字相同

#### 样式规范

• 在添加src/style/theme/default.scoped.less中添加公共样式变量，各开发人员尽可能使用里面定义的公共样式变量


##  🤔 如何快速开发？

1. src/components目录下新建开发组件；
2. 组件开发完，于src/stories路径下新建文件并补全自动生成文档所需逻辑，在index.ts中导出即可。


## 相关组件详细文档地址

[文档地址](https://storybook.js.org/)

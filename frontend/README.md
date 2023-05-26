# frontend

This template should help get you started developing with Vue 3 in Vite.
这个readme.md是在框架搭建完成后自动生成的.md上稍微修改得到的。
## Recommended IDE Setup
推荐运行环境：vscode+volar扩展（不要用vetur）+相应ts插件
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS
这里可以不看
TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

在运行这部分，用什么包管理器应该都可以，推荐用`yarn`，相比于`npm`在包管理上有做进一步优化
## Project Setup
首先安装需要的依赖
```sh
npm install
//或者
yarn install
```

### Compile and Hot-Reload for Development

运行项目
```sh
npm run dev
//或者
yarn run dev
```

### Type-Check, Compile and Minify for Production

项目打包（暂时用不到）
```sh
npm run build
//或者
yarn run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

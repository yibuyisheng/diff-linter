# [WIP]

# lint-diff

Run lint tools for git diffs.

# 安装

# 编译

在使用 Webpack 编译的时候，默认会使用本库的 ES 版本（包含一系列最新的 ES 语法），因此需要留意让本库的 JS 代码过 babel-loader。如果想使用本库的 `ES5 + CommonJS` 版本，可以配置 Webpack 的 [resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolve-mainfields)，或者配置 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias)。

# 如何使用

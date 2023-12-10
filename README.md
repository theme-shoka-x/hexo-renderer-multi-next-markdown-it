# hexo-renderer-multi-next-markdown-it
![](	https://img.shields.io/github/license/zkz098/hexo-renderer-multi-markdown-it) ![](https://badgen.net/npm/v/hexo-renderer-multi-next-markdown-it)
## hexo-renderer-multi-next-markdown-it做了什么工作?
从这个长的离谱的标题就能看出来,这个项目基于`hexo-renderer-multi-markdown-it`(下文简称"它") \
这个渲染器的用途也和它一样,而关键字则是**next**,截止目前为止,此分支(计划)实现了以下功能:
- 可以渲染与压缩包含ES6的代码
- 更新了十几个依赖项
- 提升markdown-it套餐版本
- 使用terser压缩js

## 如何使用?
卸载hexo的默认渲染器
```shell
npm un hexo-renderer-marked --save
# 或
yarn remove hexo-renderer-marked
```
安装此渲染器
```shell
npm i hexo-renderer-multi-next-markdown-it --save
# 或
yarn add hexo-renderer-multi-next-markdown-it --save
```

## 此渲染器可以在shoka上使用吗?
可以,已经过测试 \
如果出现`deasync`的编译问题,请前往github反馈

## 运行有问题/我有一个建议
前往本项目github主页反馈即可

## 开源项目
基于[hexo-renderer-multi-markdown-it](https://github.com/amehime/hexo-renderer-multi-markdown-it) 制作

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fzkz098%2Fhexo-renderer-multi-next-markdown-it.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fzkz098%2Fhexo-renderer-multi-next-markdown-it?ref=badge_large)

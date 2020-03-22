# expression-generator
四则运算表达式生成器

# App目录描述
```txt
App
├── node_modules 			// 依赖包
├── index.html 				// 主页面
├── main.js 				// 主进程
├── renderer 				// 渲染进程
│ └── index.js
├── Uitls 				// 存放功能函数
│ └── index.js
├── package.json 			// webpack 配置
├── package-lock.json 			// webpack 配置
├── .gitignore 				// github 推送忽略配置
├── .babelrc 				// es6 babel 配置文件
└── preload.js 				// 主页面
```

# `npm run start`
> 启动程序

# `npm run package`
> 打包生成 `.exe` 文件，可以通过 `cmd`命令行传参操作

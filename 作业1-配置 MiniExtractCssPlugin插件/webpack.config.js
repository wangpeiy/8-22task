/* 为什么要配置脚本？
"scripts": {
    "build": "webpack",
    "serve": "webpack serve"
  }, */

//   npx命令
// 终端输入npx webpack 等同于以上配置
// 首先到node_modules找webpack命令，执行它
// 看到有安装webpack，使用webpack打包
// 没有安装的话会下载，并在打包完删除包




const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'bundle'),
        filename: 'bundle.js',
        clean: true // 先清除path目录，在重新打包
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        // 当你serve以后，open:true会自动打开浏览器运行
        open: true,
        // 端口号:默认8080 可设置范围[0,65535]
        // port: 8888,
    },

    // 配置模块解析规则
    // module.rules:[] 配置我们的loader
    module: {
        // test 正则，匹配的文件
        // use:[] 指定匹配上的文件使用什么loader
        // 重点：style-loader 要写在 css-loader 前面
        // 因为 use数组的解析顺序为：从后往前
        rules: [
            {
                /*  test: /\.css$/,
                 use: [
                     {
                         loader: 'style-loader'
                     },
                     {
                         loader: 'css-loader',
                         // 配置loader选项
                         options: { url: false }
                     }
                 ] */

            },
            {
                // 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                /*  test: /\.(gif|jpg|png|svg|ico)$/,
                 type: 'asset/resource', */          // 图片打包成单独文件
                /* generator: {
                    filename: 'images/[name]-[hash:6][ext]'
                } */
                // generator 生成器：指定打包以后的产物生成到哪里
                // Rule.generator

                // extension: 扩展名
                // generator.filename : 指定生成文件名字
                // [name] : 文件原名 [hash:字符串的位数] 代表随机生成的字符串 [ext] : 代表文件的原始后缀


                // test: /\.(gif|jpg|png|svg|ico)$/,
                // 会把图片以base64的形式打包进js
                // type: 'asset/inline',

                test: /\.(gif|jpg|png|svg|ico)$/,
                // 以8kb作为界限，大于8kb会打包成文件，小于8kb会打包成base64
                type: 'asset',
                generator: {
                    filename: "imgs/[name]-[hash:6][ext]"
                },
                parser: {
                    // base64 打包的时候的选项
                    dataUrlCondition: {
                        // maxSize 单位是字节 1kb = 1024字节
                        maxSize: 5 * 1024
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name]-[hash:6][ext]"
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    }

}
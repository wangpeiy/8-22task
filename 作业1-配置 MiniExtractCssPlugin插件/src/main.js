// 按需引入
import { marquee } from './marquee.js'
// 默认引入
import tabs from './tabs.js'

// 调用函数
marquee();
tabs();

// webpack默认只能去打包js文件和json文件
// - 如果说我们想去扩展webpack的打包能力，需要loader

// 在main.js里引入css文件
// 注意：.css不能省略 .js可以省略
// 引入css文件时，直接引入整个文件

/* You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> .marquee {
|     background-color: skyblue;
| } */
import './style/index.css'
import './style/index.less'

// 添加图片
// (1)
// 1. 引入图片- src属性
import gifSrc from './assets/1.gif'
// 2. 创建img节点
const img1 = document.createElement('img')
// 3. 给img节点赋值src属性
img1.src = gifSrc
// 4. 将img添加到body的最后面
document.body.appendChild(img1)

// (2)
import pngSrc from './assets/logo_small.png'
const img2 = document.createElement('img')
img2.src = pngSrc
document.body.appendChild(img2)

import './assets/fonts/iconfont.css'

class App {
    a = 123
}

console.log(App.a)


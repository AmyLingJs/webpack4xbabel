const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    //入口
    entry:'./src/index.js',
    //出口文件
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        /**
    * test: 匹配特定条件。一般是提供一个正则表达式或正则表达式的数组
    * include: 匹配特定条件。一般是提供一个字符串或者字符串数组
    * exclude: 排除特定条件
    * and: 必须匹配数组中的所有条件
    * or: 匹配数组中任何一个条件,
    * nor: 必须排除这个条件
    */
        rules:[
            //打包css 
            //上述两个 loader 的处理后，CSS 代码会转变为 JS，
            // 如果需要单独把 CSS 文件分离出来，我们需要使用 mini-css-extract-plugin 插件
            {
                test:/\.css$/,
                include:[path.resolve(__dirname,"src")],
                use:['style-loader','css-loader']
            },
            //打包图片
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options:{
                    outputPath:'images/',
                    limit: 500
                    //copy url-loader内置了file-loader
                    //将小于500b的文件打成base64格式，写入js 大于
                    //limit 的还会使用 file-loader 进行 
                }
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader'
                },
                exclude:/node_modules/
            }
        ]

    },


    plugins:[
        //创建模板html
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html',
            hash:true,
            //压缩html =>production模式使用
            minify:{
                removeAttributeQuotes:true,//删除双引号
                collapseWhitespace:true //折叠html为一行
            }
        })
    ],
    // 配置开发服务器
    devServer: {
        port: 1234,
        open: true, // 自动打开浏览器
        compress: true // 服务器压缩
        //... proxy、hot
    }
}
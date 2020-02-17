/*
   webpack.dev.config.ts 开发环境配置
   秦国胜
   2019-12-13
*/
// const path = require('path')
const webpacks = require ('webpack')
const merge = require('webpack-merge');
const baseConfig = require('./base.config.ts');
// 打包日志
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge (
   baseConfig,
   {
      plugins:[
         //模块热替换
         new webpacks.NamedModulesPlugin(),
         new webpacks.HotModuleReplacementPlugin(),
         // 打包日志优化
         new FriendlyErrorsWebpackPlugin({
            // 运行成功
            compilationSuccessInfo: {
               message: 'http://localhost:8888/',
               notes: [ 'http://localhost:8888/' ]
            }
         })
         // 提升编译速度
         // new HardSourceWebpackPlugin()
      ],
     //本地服务器配置
      devServer: {
         contentBase: './dist',
         host: '0.0.0.0',
         port: 8888,
         historyApiFallback: true,
         overlay: {
            errors: false//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
         },
         quiet: false, // 控制台不输出打包信息
         inline: true, // 使用inline的方式进行页面自动刷新
         open: false, // 不自动打开浏览器
         hot: true,
         progress: false,
         clientLogLevel: 'none' // 不在浏览器控制台输出错误
         // 代理
         // proxy: {
         //    '/api/*': {
         //       target: 'http://172.17.203.139:3000/'
         //    }
         // }
      }   
   }
)
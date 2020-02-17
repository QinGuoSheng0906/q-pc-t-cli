/*
   base.config.ts 开发环境和生产环境都需要使用的配置
   秦国胜
   2019-12-13
*/

const path = require('path')
const webpack = require ('webpack')

//HTML 模版
const HtmlWebpackPlugin = require('html-webpack-plugin');

//清理本地打包文件
const { CleanWebpackPlugin }= require('clean-webpack-plugin');

//这个插件可以将样式文件从bundle.js抽离出来一个文件，并且支持chunk css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: {
      main: [ path.resolve(__dirname,'../src/index.tsx') ]
   },
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].js'
   },
    // 只在发生错误或有新的编译时输出 // errors-only minimal
   stats: 'errors-only',
   module: {
      rules: [
         {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            include: [ path.resolve('./src') ],// 限定范围
            use: [ 'babel-loader', 'ts-loader' ]
         },
         {
            test: /\.(js|jsx|ts|tsx)$/,
            use: [ 'source-map-loader' ],
            enforce: 'pre'
         },
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               //'style-loader',
               'css-loader',
               'postcss-loader'
            ]
         },
         {
            test: /\.less$/,
            use: [
               MiniCssExtractPlugin.loader,
               //'style-loader',
               'css-loader',
               'less-loader',
               'postcss-loader',
               {
                  loader:'less-loader?sourceMap=true',
                  options:{
                     javascriptEnabled: true
                  }
               }
               // include: path.resolve(__dirname, 'src')
            ]
         },
         {
            test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
            use: 'url-loader'
         }
         // {
         //    test: /\.(woff|woff2|eot|ttf|otf|ico)$/,
         //    use: 'file-loader'
         // }
      ]
   },
   // 插件
   plugins: [
      new HtmlWebpackPlugin({
         title: 'q-r-t-cli',
         template: path.resolve(__dirname, '../public/index.html'),
         favicon: path.resolve(__dirname, '../public/favicon.ico') // 添加小图标
         // minify: {
         //    html5: true,
         //    collapseWhitespace: true, //去除空格
         //    preserveLineBreaks: false, //去除换行
         //    minifyCSS: true,
         //    minifyJS: true,
         //    removeComments: false //去除注释
         // }
      }),
      //每次打包 清除 dist 目录 生成新的
      new CleanWebpackPlugin(),
      //css less 抽离
      new MiniCssExtractPlugin({
         filename: 'styles/[name].[hash:4].css',
         chunkFilename:'styles/[name].[hash:4].css'
      }),
      // 全局环境变量
      new webpack.DefinePlugin({
         'process.env': {
            PROCESS_ENV: JSON.stringify(process.env.PROCESS_ENV)
         }
      })
   ],
   // 设置别名
   resolve: {
      // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
      modules: [ path.resolve(__dirname, '../src'), path.resolve('node_modules') ],
      alias: {
         '@': path.resolve(__dirname, '../src'),
         'assets': path.resolve(__dirname, '../src/assets'),
         'components': path.resolve(__dirname, '../src/components'),
         'pages': path.resolve(__dirname, '../src/pages/'),
         'lib': path.resolve(__dirname, '../src/lib')
      },
      enforceExtension: false,
      extensions: [ '.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.json' ]
   }
}
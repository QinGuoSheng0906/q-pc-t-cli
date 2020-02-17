import React, { Component } from 'react'
import {  HashRouter as Router } from 'react-router-dom';
// UI组件国际化
import { ConfigProvider } from 'antd';                               
import zh_CN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
class APP extends Component {
   render () {
      return (
         <ConfigProvider locale = { zh_CN }>
            <Router>
               <div>这是TSX</div>
            </Router>
         </ConfigProvider>
      )
   }
}
export default APP
import React from 'react';
import ReactDOM from 'react-dom';
import ECharts from 'react-echarts';
import Simditor from 'simditor';
import $ from 'jquery';
import superagent from 'superagent';

export default class Home extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        var textbox = ReactDOM.findDOMNode(this.refs.textarea);
        var editor = new Simditor({
            textarea: $(textbox),
            upload: {
              url : 'http://139.196.21.6:8080/web/peersArticle/uploadimgurlQiniu.tj', //文件上传的接口地址
              params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
              fileKey: 'imgurl', //服务器端获取文件数据的参数名
              connectionCount: 3,
              leaveConfirm: '正在上传文件'
            }
        });
    }

    render() {

        return (
            <div>
                <textarea ref='textarea' />
            </div>
        )
    }
}

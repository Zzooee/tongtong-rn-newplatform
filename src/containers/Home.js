import React from 'react';
import ReactDOM from 'react-dom';
import ECharts from 'react-echarts';
import Simditor from 'simditor';
import $ from 'jquery';
import superagent from 'superagent';

var data1 = [];
var data2 = [];
var data3 = [];

var random = function (max) {
    return (Math.random() * max).toFixed(3);
};

for (var i = 0; i < 500; i++) {
    data1.push([random(15), random(10), random(1)]);
    data2.push([random(10), random(10), random(1)]);
    data3.push([random(15), random(10), random(1)]);
}

const option = {
    animation: false,
    legend: {
        data: ['scatter', 'scatter2', 'scatter3']
    },
    tooltip: {
    },
    xAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
        splitLine: {
            show: true
        }
    },
    yAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
        splitLine: {
            show: true
        }
    },
    dataZoom: [
        {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 35
        },
        {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            left: '93%',
            start: 29,
            end: 36
        },
        {
            type: 'inside',
            xAxisIndex: [0],
            start: 1,
            end: 35
        },
        {
            type: 'inside',
            yAxisIndex: [0],
            start: 29,
            end: 36
        }
    ],
    series: [
        {
            name: 'scatter',
            type: 'scatter',
            itemStyle: {
                normal: {
                    opacity: 0.8
                }
            },
            symbolSize: function (val) {
                return val[2] * 40;
            },
            data: data1
        },
        {
            name: 'scatter2',
            type: 'scatter',
            itemStyle: {
                normal: {
                    opacity: 0.8
                }
            },
            symbolSize: function (val) {
                return val[2] * 40;
            },
            data: data2
        },
        {
            name: 'scatter3',
            type: 'scatter',
            itemStyle: {
                normal: {
                    opacity: 0.8,
                }
            },
            symbolSize: function (val) {
                return val[2] * 40;
            },
            data: data3
        }
    ]
}

export default class Home extends React.Component {
    constructor() {
        super()
    }

    showparams(params){
        console.log(params)
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

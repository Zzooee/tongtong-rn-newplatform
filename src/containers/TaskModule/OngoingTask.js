import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input, Form, Modal, Popconfirm, message, Icon, Radio} from 'antd'
import {getAllOngoing, resetOngoingList, execOngoing, resumeOngoing, resetTrigger} from '../../actions/TaskModule/ongoing'
import classNames from 'classnames';
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;

var styles = {
  refreshbtn: {
    margin: '20px 0 12px'
  }
}

class Ongoing extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getAllOngoing()
    }

    componentDidUpdate() {
        if (this.props.triggerStateChange == 201) {
            message.error('信息加载失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 301) {
            message.error('状态更改失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 101) {
            message.error('执行失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 303) {
            message.success('状态更改成功', 2)
            this.props.resetTrigger()
            this.props.getAllOngoing()
        } else if (this.props.triggerStateChange == 103) {
            message.success('执行成功', 2)
            this.props.resetTrigger()
            this.props.getAllOngoing()
        }
    }

    confirmExec(){
        this.props.execOngoing(this.state.targetgroup, this.state.targetname)
    }

    confirmResume(){
        var targetsta = ''
        if (this.state.targetstatus == 'NORMAL') {
            targetsta = 'stop'
        } else if (this.state.targetstatus == "PAUSED") {
            targetsta = 'start'
        }
        this.props.resumeOngoing(this.state.targetgroup, this.state.targetname, targetsta)
    }

    getUser(item) {
        var tmpid = item.target.id
        var tmparr = this.props.ongoingList.filter(item => item.id == tmpid)
        this.setState({
            targetid: tmparr[0].id,
            targetgroup: tmparr[0].taskGroup,
            targetname: tmparr[0].taskName,
            targetstatus: tmparr[0].status
        })
    }

    refreshClickHandler(){
        this.props.resetOngoingList()
        this.props.getAllOngoing()
    }

    render() {

        const {ongoingList} = this.props
        const that = this
        const data = []

        const pagination = {
            total: this.props.ongoingList.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                console.log('Current: ', current);
            }
        };

        const columns = [{
            title: '任务分组',
            dataIndex: 'taskGroup',
            key: 'taskGroup',
        }, {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
        }, {
            title: '执行间隔时间',
            dataIndex: 'taskCron',
            key: 'taskCron'
        }, {
            title: '上一次执行时间',
            dataIndex: 'previousFireTimeString',
            key: 'previousFireTimeString',
        }, {
            title: '下一次执行时间',
            dataIndex: 'nextFireTimeString',
            key: 'nextFireTimeString',
        }, {
            title: '任务状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <span>
                        <Popconfirm title="确认执行此任务吗？" onConfirm={that.confirmExec.bind(that)} okText={'确认执行'} cancelText="取消">
                            <a href="#" id={record.key} onClick={that.getUser.bind(that)}>执行</a>
                        </Popconfirm>
                        <span className="ant-divider"></span>
                        <Popconfirm title="确认更改任务状态吗？" onConfirm={that.confirmResume.bind(that)} okText={record.status == 'NORMAL' ? '确认暂停' : '确认启动'} cancelText="取消">
                            <a href="#" id={record.key} onClick={that.getUser.bind(that)} disabled={record.status == 'NORMAL'  || record.status == 'PAUSED' ? false : true}>{record.status == 'NORMAL' ? '暂停' : '开始'}</a>
                        </Popconfirm>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.ongoingList.length; i++)
        {
            data.push({
                key: this.props.ongoingList[i].id,
                taskGroup: this.props.ongoingList[i].taskGroup,
                taskName: this.props.ongoingList[i].taskName,
                status: this.props.ongoingList[i].status,
                taskCron: this.props.ongoingList[i].taskCron,
                previousFireTimeString: this.props.ongoingList[i].previousFireTimeString,
                nextFireTimeString: this.props.ongoingList[i].nextFireTimeString
            })
        }


        return (
            <div>
                <Button style={styles.refreshbtn} onClick={this.refreshClickHandler.bind(this)}>刷新</Button>
                <Table pagination={pagination} columns={columns} dataSource={data} size="middle"/>
            </div>
        )
    }
}

Ongoing = Form.create()(Ongoing);

function mapStateToProps(state) {

    return {
        ongoingList: state.ongoing.ongoingList,
        triggerStateChange: state.ongoing.triggerStateChange
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetOngoingList: bindActionCreators(resetOngoingList, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
        getAllOngoing: bindActionCreators(getAllOngoing, dispatch),
        execOngoing: bindActionCreators(execOngoing, dispatch),
        resumeOngoing: bindActionCreators(resumeOngoing, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ongoing)

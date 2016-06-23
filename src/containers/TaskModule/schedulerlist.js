import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import api from '../../common/api'
import {Table, Button, Input, Form, Modal, Cascader, Popconfirm, message, Icon, Radio, Upload} from 'antd'
import {getAllScheduler, resetSchedulerList, resetTrigger, editScheduler, addScheduler} from '../../actions/TaskModule/scheduler'
import {getAllTgroup} from '../../actions/TaskModule/group'
import {updateKeyword} from '../../actions/keyword'
import authUtils from '../../common/utils/auth';
import classNames from 'classnames';
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
import superagent from 'superagent';

var styles = {
  searchinput: {
    height: 42,
    lineHeight: '42px',
    fontSize: 14,
    textIndent: 6
  },
  searchicon: {
    height: 42,
    lineHeight: '42px',
    fontSize: 14,
    width: 100,
    margin: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  refreshbtn: {
    margin: '20px 0 12px'
  }
}

class SchedulerList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getAllScheduler(1,10),
        this.setState({
            editvisible: false,
            addvisible: false,
            currentpage: 1,
            pagesize: 10,
            defaultgroupid: [],
            defaulttaskname: '',
            defaulttasktype: '',
            defaulttaskdesc: '',
            defaulttaskcron: '',
            defaulttaskenable: 1
        })
        this.props.getAllTgroup()
    }

    componentDidUpdate() {
        if (this.props.triggerStateChange == 201) {
            message.error('信息加载失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 101) {
            message.error('编辑失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 301) {
            message.error('添加失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 103) {
            this.props.getAllScheduler(this.state.currentpage,this.state.pagesize,this.props.filterText)
            message.success('编辑成功', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 303) {
            this.props.getAllScheduler(this.state.currentpage,this.state.pagesize,this.props.filterText)
            message.success('添加成功', 2)
            this.props.resetTrigger()
        }
    }

    editScheduler(item) {
        var tmpid = item.target.id
        var tmparr = this.props.schedulerList.filter(item => item.id == tmpid)
        this.setState({
            editvisible: true,
            edittarget: tmparr[0].id,
            defaultgroupid: [tmparr[0].groupId],
            defaulttaskname: tmparr[0].taskName,
            defaulttasktype: tmparr[0].taskType,
            defaulttaskdesc: tmparr[0].taskDesc,
            defaulttaskcron: tmparr[0].taskCron,
            defaulttaskenable: tmparr[0].enable
        })
    }

    submitEdit() {
        var edittaskdata = this.props.form.getFieldsValue()
        if (!edittaskdata.taskgroupid) {
            message.error('请选择组名称', 2)
        } else if (!edittaskdata.taskname) {
            message.error('请填写任务名称', 2)
        } else if (!edittaskdata.tasktype) {
            message.error('请填写任务类型', 2)
        } else if (!edittaskdata.taskdesc) {
            message.error('请填写任务描述', 2)
        } else if (!edittaskdata.taskcron) {
            message.error('请填写执行间隔时间', 2)
        } else if (edittaskdata.taskenable == undefined){
            message.error('请选择是否启用', 2)
        } else {
            this.hideEditModal();
            this.props.editScheduler(this.state.edittarget, edittaskdata.taskgroupid[0], edittaskdata.taskname, edittaskdata.tasktype, edittaskdata.taskdesc, edittaskdata.taskcron, edittaskdata.taskenable)
        }
    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            defaultgroupid: [],
            defaulttaskname: '',
            defaulttasktype: '',
            defaulttaskdesc: '',
            defaulttaskcron: '',
            defaulttaskenable: 1
        })
    }

    addClickHandler() {
        this.setState({
            addvisible: true,
            defaultgroupid: [],
            defaulttaskname: '',
            defaulttasktype: '',
            defaulttaskdesc: '',
            defaulttaskcron: '',
            defaulttaskenable: 1
        })
    }

    submitAdd() {
        var addtaskdata = this.props.form.getFieldsValue()
        if (!addtaskdata.taskgroupid) {
            message.error('请选择组名称', 2)
        } else if (!addtaskdata.taskname) {
            message.error('请填写任务名称', 2)
        } else if (!addtaskdata.tasktype) {
            message.error('请填写任务类型', 2)
        } else if (!addtaskdata.taskdesc) {
            message.error('请填写任务描述', 2)
        } else if (!addtaskdata.taskcron) {
            message.error('请填写执行间隔时间', 2)
        } else if (addtaskdata.taskenable == undefined){
            message.error('请选择是否启用', 2)
        } else {
            this.props.addScheduler(addtaskdata.taskgroupid[0], addtaskdata.taskname, addtaskdata.tasktype, addtaskdata.taskdesc, addtaskdata.taskcron, addtaskdata.taskenable)
            this.hideAddModal()
        }
    }

    hideAddModal() {
        this.setState({
            addvisible: false
        })
        this.props.form.resetFields()
    }

    refreshClickHandler() {
        this.props.updateKeyword('')
        this.props.resetSchedulerList()
        this.props.getAllScheduler(this.state.currentpage,this.state.pagesize)
    }

    enterKeyword(item) {
      this.props.updateKeyword(item.target.value)
    }

    onSearch (event){
        if(event.keyCode == 27){
            this.props.updateKeyword('')
            this.props.getAllScheduler(1,this.state.pagesize)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 13){
            this.props.getAllScheduler(1,this.state.pagesize, this.props.filterText)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 8){
            if (this.props.filterText == ''){
                this.props.updateKeyword('')
                this.props.getAllScheduler(1,this.state.pagesize)
                this.setState({
                    currentpage: 1,
                })
            }
       }

    }

    startSearch(){
        this.props.getAllScheduler(1,this.state.pagesize,this.props.filterText)
        this.setState({
            currentpage: 1,
        })
    }

    render() {

        const {schedulerList} = this.props
        const that = this
        const data = []

        var currentpage = 1
        var pagesize = 10
        var currentpage = this.state.currentpage

        const pagination = {
            total: this.props.totals,
            current: currentpage,
            showQuickJumper: (this.props.totals > this.state.pagesize),
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
                currentpage = current;
                pagesize = pageSize;
                that.setState({
                    currentpage: current,
                    pagesize: pageSize
                });
                that.props.getAllScheduler(current,pageSize,that.props.filterText)
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
                that.props.getAllScheduler(current,that.state.pagesize, that.props.filterText)
            }
        };

        const columns = [{
            title: '组名称',
            dataIndex: 'groupinfo',
            key: 'groupinfo'
        }, {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
        }, {
            title: '任务类型',
            dataIndex: 'taskType',
            key: 'taskType',
        }, {
            title: '任务描述',
            dataIndex: 'taskDesc',
            key: 'taskDesc'
        }, {
            title: '执行间隔时间',
            dataIndex: 'taskCron',
            key: 'taskCron'
        }, {
            title: '上一次执行时间',
            dataIndex: 'taskPreviousFireTimeString',
            key: 'taskPreviousFireTimeString',
        }, {
            title: '下一次执行时间',
            dataIndex: 'taskNextFireTimeString',
            key: 'taskNextFireTimeString',
        }, {
            title: '是否启用',
            dataIndex: 'enableString',
            key: 'enableString',
        }, {
            title: '更新时间',
            dataIndex: 'updatetimeString',
            key: 'updatetimeString',
            width: 100,
        }, {
            title: '更新人',
            dataIndex: 'updateuserName',
            key: 'updateuserName',
            width: 100,
        }, {
            title: '创建时间',
            dataIndex: 'createtimeString',
            key: 'createtimeString',
            width: 100,
        }, {
            title: '创建人',
            dataIndex: 'createuserName',
            key: 'createuserName',
            width: 100,
        }, {
            title: '操作',
            key: 'operation',
            width: 80,
            render(text, record) {
                return (
                    <span>
                        <a href="#" id={record.key} onClick={that.editScheduler.bind(that)}>编辑</a>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.schedulerList.length; i++)
        {
            let groupinfo = this.props.tgroupList.filter(item => item.id == this.props.schedulerList[i].groupId)
            data.push({
                key: this.props.schedulerList[i].id,
                groupinfo: groupinfo[0].groupName,
                taskName: this.props.schedulerList[i].taskName,
                enableString: `${this.props.schedulerList[i].enable == 1 ? '启用' : '停用'}`,
                enable: this.props.schedulerList[i].enable,
                taskType: this.props.schedulerList[i].taskType,
                taskDesc: this.props.schedulerList[i].taskDesc,
                taskCron: this.props.schedulerList[i].taskCron,
                taskPreviousFireTimeString: this.props.schedulerList[i].taskPreviousFireTimeString,
                taskNextFireTimeString: this.props.schedulerList[i].taskNextFireTimeString,
                updatetimeString: this.props.schedulerList[i].updatetimeString,
                updateuserName: this.props.schedulerList[i].updateuserName,
                createtimeString: this.props.schedulerList[i].createtimeString,
                createuserName: this.props.schedulerList[i].createuserName
            })
        }

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

        var options2 = []
        if(this.props.tgroupList) {
            for (let i=0; i<this.props.tgroupList.length; i++)
            {
                options2.push({
                    value: this.props.tgroupList[i].id,
                    label: this.props.tgroupList[i].groupName
                })
            }
        }

        const groupidProps = getFieldProps('taskgroupid', {
            rules: [
                { required: true, type: 'array' }
            ],
            initialValue: this.state.defaultgroupid
        });

        const taskNameProps = getFieldProps('taskname', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaulttaskname
        });

        const taskTypeProps = getFieldProps('tasktype', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaulttasktype
        });

        const taskDescProps = getFieldProps('taskdesc', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaulttaskdesc
        });

        const taskCronProps = getFieldProps('taskcron', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaulttaskcron
        });

        const searchProps = getFieldProps('searchkeyword', {});

        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 },
        };

        const btnCls = classNames({
            'ant-search-btn': true
        });
        const searchCls = classNames({
            'ant-search-input': true
        });

        return (
            <div>
                <InputGroup className="tj-search-group">
                    <Input {...searchProps} style={styles.searchinput} onKeyUp={this.onSearch.bind(this)} value={this.props.filterText} onChange={this.enterKeyword.bind(this)}
                        placeholder="搜索任务 (按Esc键重置)"/>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} style={styles.searchicon} onClick={this.startSearch.bind(this)}>
                            <Icon type="search" />
                        </Button>
                    </div>
                </InputGroup>
                <Button onClick={this.addClickHandler.bind(this)} type="primary" style={{margin: '8px 12px 0 0'}}><Icon type="plus-circle-o"/>添加</Button>
                <Button style={styles.refreshbtn} onClick={this.refreshClickHandler.bind(this)}>刷新</Button>
                <Table pagination={pagination} columns={columns} dataSource={data} size="middle"/>
                <Modal title="编辑任务" visible={this.state.editvisible} onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="组名称："
                            help=" "
                            validateStatus="success">
                            <Cascader {...groupidProps} options={options2} allowClear={false}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="任务名称："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...taskNameProps} placeholder="请输入任务名称"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="任务类型："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...taskTypeProps} placeholder="请输入任务类型"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="任务描述："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...taskDescProps} placeholder="请输入任务描述"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="执行间隔时间："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...taskCronProps} placeholder="请输入执行间隔时间"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="是否启用："
                            help=" "
                            validateStatus="success"
                            style={{marginBottom: 20}}
                            >
                            <RadioGroup {...getFieldProps('taskenable', { initialValue: this.state.defaulttaskenable })} style={{marginTop: 10}}>
                                <Radio key="a" value={1}>启用</Radio>
                                <Radio key="b" value={0}>停用</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal title="添加积分类型" visible={this.state.addvisible} onOk={this.submitAdd.bind(this)} onCancel={this.hideAddModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="组名称："
                            help=" "
                            validateStatus="success">
                            <Cascader {...groupidProps} options={options2} allowClear={false}/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="任务名称："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...taskNameProps} placeholder="请输入任务名称"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="任务类型："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...taskTypeProps} placeholder="请输入任务类型"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="任务描述："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...taskDescProps} placeholder="请输入任务描述"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="执行间隔时间："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...taskCronProps} placeholder="请输入执行间隔时间"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="是否启用："
                            help=" "
                            validateStatus="success"
                            style={{marginBottom: 20}}
                            >
                            <RadioGroup {...getFieldProps('taskenable', { initialValue: this.state.defaulttaskenable })} style={{marginTop: 10}}>
                                <Radio key="a" value={1}>启用</Radio>
                                <Radio key="b" value={0}>停用</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

SchedulerList = Form.create()(SchedulerList);

function mapStateToProps(state) {

    return {
        schedulerList: state.scheduler.schedulerList,
        triggerStateChange: state.scheduler.triggerStateChange,
        filterText: state.keyword.filterText,
        totals: state.scheduler.totals,
        tgroupList: state.tgroup.tgroupList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllScheduler: bindActionCreators(getAllScheduler, dispatch),
        resetSchedulerList: bindActionCreators(resetSchedulerList, dispatch),
        editScheduler: bindActionCreators(editScheduler, dispatch),
        addScheduler: bindActionCreators(addScheduler, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        getAllTgroup: bindActionCreators(getAllTgroup, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerList)

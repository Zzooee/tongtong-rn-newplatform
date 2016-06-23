import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import api from '../../common/api'
import {Table, Button, Input, Form, Modal, Cascader, Popconfirm, message, Icon, Radio, Upload} from 'antd'
import {getAllTgroup, resetTgroupList, resetTrigger, editTgroup, addTgroup} from '../../actions/TaskModule/group'
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

class TgroupList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getAllTgroup(1,10),
        this.setState({
            editvisible: false,
            addvisible: false,
            currentpage: 1,
            pagesize: 10,
            defaultgroupname: '',
            defaultgroupdesc: ''
        })
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
            this.props.getAllTgroup(this.state.currentpage,this.state.pagesize,this.props.filterText)
            message.success('编辑成功', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 303) {
            this.props.getAllTgroup(this.state.currentpage,this.state.pagesize,this.props.filterText)
            message.success('添加成功', 2)
            this.props.resetTrigger()
        }
    }

    editTgroup(item) {
        var tmpid = item.target.id
        var tmparr = this.props.tgroupList.filter(item => item.id == tmpid)
        this.setState({
            editvisible: true,
            edittarget: tmparr[0].id,
            defaultgroupname: tmparr[0].groupName,
            defaultgroupdesc: tmparr[0].groupDesc
        })
    }

    submitEdit() {
        var editgroupdata = this.props.form.getFieldsValue()
        if (!editgroupdata.groupname) {
            message.error('请填写组名称', 2)
        } else if (!editgroupdata.groupdesc) {
            message.error('请填写组描述', 2)
        } else {
            this.hideEditModal();
            this.props.editTgroup(this.state.edittarget, editgroupdata.groupname, editgroupdata.groupdesc)
        }
    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            defaultgroupname: '',
            defaultgroupdesc: ''
        })
    }

    addClickHandler() {
        this.setState({
            addvisible: true,
            defaultgroupname: '',
            defaultgroupdesc: ''
        })
    }

    submitAdd() {
        var addgroupdata = this.props.form.getFieldsValue()
        if (!addgroupdata.groupname) {
            message.error('请填写组名称', 2)
        } else if (!addgroupdata.groupdesc) {
            message.error('请填写组描述', 2)
        } else {
            this.props.addTgroup(addgroupdata.groupname, addgroupdata.groupdesc)
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
        this.props.resetTgroupList()
        this.props.getAllTgroup(this.state.currentpage,this.state.pagesize)
    }

    enterKeyword(item) {
      this.props.updateKeyword(item.target.value)
    }

    onSearch (event){
        if(event.keyCode == 27){
            this.props.updateKeyword('')
            this.props.getAllTgroup(1,this.state.pagesize)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 13){
            this.props.getAllTgroup(1,this.state.pagesize, this.props.filterText)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 8){
            if (this.props.filterText == ''){
                this.props.updateKeyword('')
                this.props.getAllTgroup(1,this.state.pagesize)
                this.setState({
                    currentpage: 1,
                })
            }
       }

    }

    startSearch(){
        this.props.getAllTgroup(1,this.state.pagesize,this.props.filterText)
        this.setState({
            currentpage: 1,
        })
    }

    render() {

        const {tgroupList} = this.props
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
                that.props.getAllTgroup(current,pageSize,that.props.filterText)
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
                that.props.getAllTgroup(current,that.state.pagesize, that.props.filterText)
            }
        };

        const columns = [{
            title: '组名称',
            dataIndex: 'groupName',
            key: 'groupName'
        }, {
            title: '组描述',
            dataIndex: 'groupDesc',
            key: 'groupDesc'
        }, {
            title: '更新时间',
            dataIndex: 'updatetimeString',
            key: 'updatetimeString'
        }, {
            title: '更新人',
            dataIndex: 'updateuserName',
            key: 'updateuserName'
        }, {
            title: '创建时间',
            dataIndex: 'createtimeString',
            key: 'createtimeString'
        }, {
            title: '创建人',
            dataIndex: 'createuserName',
            key: 'createuserName'
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <span>
                        <a href="#" id={record.key} onClick={that.editTgroup.bind(that)}>编辑</a>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.tgroupList.length; i++)
        {
            data.push({
                key: this.props.tgroupList[i].id,
                groupName: this.props.tgroupList[i].groupName,
                groupDesc: this.props.tgroupList[i].groupDesc,
                updatetimeString: this.props.tgroupList[i].updatetimeString,
                updateuserName: this.props.tgroupList[i].updateuserName,
                createtimeString: this.props.tgroupList[i].createtimeString,
                createuserName: this.props.tgroupList[i].createuserName
            })
        }

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

        const groupnameProps = getFieldProps('groupname', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultgroupname
        });

        const groupdescProps = getFieldProps('groupdesc', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultgroupdesc
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
                        placeholder="搜索组 (按Esc键重置)"/>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} style={styles.searchicon} onClick={this.startSearch.bind(this)}>
                            <Icon type="search" />
                        </Button>
                    </div>
                </InputGroup>
                <Button onClick={this.addClickHandler.bind(this)} type="primary" style={{margin: '8px 12px 0 0'}}><Icon type="plus-circle-o"/>添加</Button>
                <Button style={styles.refreshbtn} onClick={this.refreshClickHandler.bind(this)}>刷新</Button>
                <Table pagination={pagination} columns={columns} dataSource={data} size="middle"/>
                <Modal title="编辑组" visible={this.state.editvisible} onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="组名称："
                            help=" "
                            validateStatus="success">
                            <Input {...groupnameProps} placeholder="请输入组名称"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="组描述："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...groupdescProps} placeholder="请输入组描述"></Input>
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
                          <Input {...groupnameProps} placeholder="请输入组名称"></Input>
                      </FormItem>
                      <FormItem
                          {...formItemLayout}
                          label="组描述："
                          help=" "
                          validateStatus="success"
                          >
                          <Input {...groupdescProps} placeholder="请输入组描述"></Input>
                      </FormItem>
                  </Form>
                </Modal>
            </div>
        )
    }
}

TgroupList = Form.create()(TgroupList);

function mapStateToProps(state) {

    return {
        tgroupList: state.tgroup.tgroupList,
        triggerStateChange: state.tgroup.triggerStateChange,
        filterText: state.keyword.filterText,
        totals: state.tgroup.totals
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllTgroup: bindActionCreators(getAllTgroup, dispatch),
        resetTgroupList: bindActionCreators(resetTgroupList, dispatch),
        editTgroup: bindActionCreators(editTgroup, dispatch),
        addTgroup: bindActionCreators(addTgroup, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TgroupList)

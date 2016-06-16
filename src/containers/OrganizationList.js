import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input, Form, Modal, Popconfirm, message, Icon, Radio, Tree, Cascader} from 'antd'
import {getOrganizationList, resetOrganizationList, addOrganization, editOrganization, resetTrigger} from '../actions/organization'
import {updateKeyword} from '../actions/keyword'
import classNames from 'classnames';
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

var styles = {
  refreshbtn: {
    margin: '20px 0 12px'
  }
}

class OrganizationList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getOrganizationList(1,10),
        this.setState({
            editvisible: false,
            addvisible: false,
            permitvisible: false,
            currentpage: 1,
            pagesize: 10,
            defaultorganization: '',
            defaultdescription: '',
            defaultenable: true,
            selectedvalue: ['SYSTEM'],
        })
    }

    componentDidUpdate() {
        if (this.props.triggerStateChange == 801) {
            message.error('组织列表加载失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 301) {
            message.error('添加失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 501) {
            message.error('权限修改失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 101) {
            message.error('编辑失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 303) {
            message.success('添加成功', 2)
            this.props.resetTrigger()
            this.props.getOrganizationList(this.state.currentpage, this.state.pagesize, this.props.filterText)
        } else if (this.props.triggerStateChange == 503) {
            message.success('权限修改成功', 2)
            this.props.resetTrigger()
            this.props.getOrganizationList(this.state.currentpage, this.state.pagesize, this.props.filterText)
        } else if (this.props.triggerStateChange == 103) {
            message.success('编辑成功', 2)
            this.props.resetTrigger()
            this.props.getOrganizationList(this.state.currentpage, this.state.pagesize, this.props.filterText)
        }
    }

    addClickHandler() {
        this.setState({
            addvisible: true,
            selectedprop: ['SYSTEM']
        })
    }

    submitAdd() {
        var addorganizationdata = this.props.form.getFieldsValue()
        if (!addorganizationdata.organizationname) {
            message.error('请输入组织名称', 2)
        } else if (!addorganizationdata.description) {
            message.error('请输入组织描述', 2)
        } else if (!addorganizationdata.organizationtype) {
            message.error('请选择组织属性', 2)
        } else {
            this.props.addOrganization(addorganizationdata.organizationname, addorganizationdata.description, addorganizationdata.organizationenable, addorganizationdata.organizationtype)
            this.hideAddModal()
        }

    }

    hideAddModal() {
        this.setState({
            addvisible: false,
            selectedprop: ['SYSTEM']
        })
        this.props.form.resetFields()
    }

    editUserInfo(item) {
        var tmpid = (item.target.id * 1 - 2048)/666
        var tmparr = this.props.orgItems.filter(item => item.id == tmpid)
        this.setState({
            editvisible: true,
            edittarget: tmparr[0].id,
            defaultorganization: tmparr[0].organization,
            defaultdescription: tmparr[0].description,
            defaultenable: tmparr[0].available,
            selectedprop: [tmparr[0].type],
        })
        this.props.getOrganizationList(this.state.currentpage, this.state.pagesize)
    }

    submitEdit() {
        var editorganizationdata = this.props.form.getFieldsValue()
        if (!editorganizationdata.organizationname) {
            message.error('请输入组织名称', 2)
        } else if (!editorganizationdata.description) {
            message.error('请输入组织描述', 2)
        } else if (!editorganizationdata.organizationtype) {
            message.error('请选择组织属性', 2)
        } else {
            this.props.editOrganization(this.state.edittarget, editorganizationdata.organizationname, editorganizationdata.description, editorganizationdata.organizationenable, editorganizationdata.organizationtype)
            this.hideEditModal()
        }
    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            defaultorganization: '',
            defaultdescription: '',
            defaultenable: true,
            selectedprop: ['SYSTEM'],
        })
    }

    onCheck(info) {
        console.log('onCheck', info);

        this.setState({
            checkedkeys: info
        })
    }

    getUser(item) {
        var tmpid = (item.target.id * 1 - 1024)/233
        var tmparr = this.props.orgItems.filter(item => item.id == tmpid)
        var tmpkey = []
        if(tmparr[0].resourceIds){
            tmpkey = tmparr[0].resourceIds.split(',')
        }
        this.setState({
            permitvisible: true,
            permittarget: tmparr[0].id,
            defaultorganizationnm: tmparr[0].organization,
            defaultdesp: tmparr[0].description,
            checkedkeys: tmpkey,
            selectedprop: [tmparr[0].type],
        })
    }

    submitPermit() {
        this.props.authOrganization(this.state.permittarget, this.state.checkedkeys+",")
        this.hidePermitModal()
    }

    hidePermitModal() {
        this.setState({
            permitvisible: false,
            defaultorganizationnm: '',
            defaultdesp: '',
            checkedkeys: [],
            selectedprop: ['SYSTEM'],
        })
    }

    refreshClickHandler(){
        this.props.updateKeyword('')
        this.props.resetOrganizationList()
        this.props.getOrganizationList(this.state.currentpage, this.state.pagesize)
    }

    enterKeyword(item) {
      this.props.updateKeyword(item.target.value)
    }

    onSearch (event){
        if(event.keyCode == 27){
            this.props.updateKeyword('')
            this.props.getOrganizationList(1,this.state.pagesize)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 13){
            this.props.getOrganizationList(1,this.state.pagesize, this.props.filterText)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 8){
            if (this.props.filterText == ''){
                this.props.updateKeyword('')
                this.props.getOrganizationList(1,this.state.pagesize)
                this.setState({
                    currentpage: 1,
                })
            }
       }
    }

    startSearch(){
        this.props.getOrganizationList(1,this.state.pagesize,this.props.filterText)
        this.setState({
            currentpage: 1,
        })
    }

    validproperty(value){
      this.setState({
          selectedprop: value
      })
    }

    render() {

        const {orgItems} = this.props
        const that = this
        const data = []

        const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect(record, selected, selectedRows) {
              console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
              console.log(selected, selectedRows, changeRows);
            },
        };

        var currentpage = 1
        var pagesize = 10

        const pagination = {
            total: this.props.totals,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
                currentpage = current;
                pagesize = pageSize;
                that.setState({
                    currentpage: current,
                    pagesize: pageSize
                });
                that.props.getOrganizationList(current,pageSize,that.props.filterText)
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
                that.props.getOrganizationList(current,that.state.pagesize,that.props.filterText)
            }
        };

        const columns = [{
            title: '组织名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '组织属性',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '是否可用',
            dataIndex: 'available',
            key: 'available',
        }, {
            title: '创建时间',
            dataIndex: 'createtime',
            key: 'createtime',
        }, {
            title: '更新时间',
            dataIndex: 'updatetime',
            key: 'updatetime',
        }, {
            title: '创建人ID',
            dataIndex: 'createuserid',
            key: 'createuserid',
        }, {
            title: '更新人ID',
            dataIndex: 'updateuserid',
            key: 'updateuserid',
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <span>
                        <a href="#" id={record.key * 666 + 2048} onClick={that.editUserInfo.bind(that)}>编辑</a>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.orgItems.length; i++)
        {
            var propname = '';
            if (orgItems[i].type == 'SYSTEM') {
                propname = '系统菜单'
            } else if (orgItems[i].type == 'DISTRICT') {
                propname = '区菜单'
            } else if (orgItems[i].type == 'KINDERGARTEN') {
                propname = '幼儿园菜单'
            }

            data.push({
                key: this.props.orgItems[i].id,
                name: this.props.orgItems[i].name,
                type: propname,
                available: `${this.props.orgItems[i].available ? '是' : '否'}`,
                createtime: this.props.orgItems[i].createtimeString,
                createtimedetail: this.props.orgItems[i].createtime,
                updatetime: this.props.orgItems[i].updatetimeString,
                updatetimedetail: this.props.orgItems[i].updatetime,
                createuserid: this.props.orgItems[i].createuserid,
                updateuserid: this.props.orgItems[i].updateuserid
            })
        }

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

        const organizationnameProps = getFieldProps('organizationname', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultorganization
        });

        const propertyProps = getFieldProps('organizationtype', {
            rules: [
                { required: true, type: 'array' }
            ],
            initialValue: this.state.selectedprop
        });

        const FormItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 13 },
        };

        const propoptions = [{
            value: 'SYSTEM',
            label: '系统菜单',
        },{
            value: 'DISTRICT',
            label: '区菜单',
        },{
            value: 'KINDERGARTEN',
            label: '幼儿园菜单',
        }]

        const searchProps = getFieldProps('searchkeyword', {});

        const btnCls = classNames({
            'ant-search-btn': true
        });
        const searchCls = classNames({
            'ant-search-input': true
        });

        var menu = this.props.items.map((item) => {
            return (
                <TreeNode title={<span>{item.name}</span>} key={item.id}>
                    {item.childMenus.map((node) => {
                        return (
                            <TreeNode title={node.name} key={node.id}/>
                        )
                    })}
                </TreeNode>
            )
        });

        return (
            <div>
                <InputGroup className="tj-search-group">
                    <Input {...searchProps} onKeyUp={this.onSearch.bind(this)} value={this.props.filterText} onChange={this.enterKeyword.bind(this)}
                        placeholder="搜索组织名称 (按Esc键重置)"/>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} onClick={this.startSearch.bind(this)}>
                            <Icon type="search" />
                        </Button>
                    </div>
                </InputGroup>
                <Button onClick={this.addClickHandler.bind(this)} type="primary" style={{margin: '8px 12px 0 0'}}><Icon type="plus-circle-o"/>添加</Button>
                <Button style={styles.refreshbtn} onClick={this.refreshClickHandler.bind(this)}>刷新</Button>
                <Table rowSelection={rowSelection} pagination={pagination} columns={columns} dataSource={data} size="middle"/>
                <Modal title="添加组织" visible={this.state.addvisible} onOk={this.submitAdd.bind(this)} onCancel={this.hideAddModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入组织名称："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...organizationnameProps} placeholder="请输入组织名称"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请选择组织属性： "
                            help=" "
                            >
                            <Cascader {...propertyProps} options={propoptions} allowClear={false} onChange={this.validproperty.bind(this)}/>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="是否可用："
                            help=" "
                            validateStatus="success"
                            style={{marginBottom: 20}}
                            >
                            <RadioGroup {...getFieldProps('organizationenable', { initialValue: this.state.defaultenable })} style={{marginTop: 10}}>
                                <Radio key="a" value={true}>是</Radio>
                                <Radio key="b" value={false}>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal title="编辑组织" visible={this.state.editvisible} onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入组织名称："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...organizationnameProps} placeholder="请输入组织名称"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请选择组织属性： "
                            help=" "
                            >
                            <Cascader {...propertyProps} options={propoptions} allowClear={false} onChange={this.validproperty.bind(this)}/>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="是否可用："
                            help=" "
                            validateStatus="success"
                            style={{marginBottom: 20}}
                            >
                            <RadioGroup {...getFieldProps('organizationenable', { initialValue: this.state.defaultenable })} style={{marginTop: 10}}>
                                <Radio key="a" value={true}>是</Radio>
                                <Radio key="b" value={false}>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

OrganizationList = Form.create()(OrganizationList);

function mapStateToProps(state) {

    return {
        orgItems: state.organization.orgItems,
        triggerStateChange: state.organization.triggerStateChange,
        filterText: state.keyword.filterText,
        totals: state.organization.totals,
        items: state.menu.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetOrganizationList: bindActionCreators(resetOrganizationList, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        getOrganizationList: bindActionCreators(getOrganizationList, dispatch),
        addOrganization: bindActionCreators(addOrganization, dispatch),
        editOrganization: bindActionCreators(editOrganization, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationList)

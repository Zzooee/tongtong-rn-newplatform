import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input, Form, Modal, Popconfirm, message, Icon, Radio, Tree, Cascader} from 'antd'
import {getRoleList, resetRoleList, addRole, editRole, resetTrigger, authRole} from '../../actions/AdminModule/rolelist'
import {updateKeyword} from '../../actions/keyword'
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

class level3 extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getRoleList(1,10),
        this.setState({
            editvisible: false,
            addvisible: false,
            permitvisible: false,
            currentpage: 1,
            pagesize: 10,
            defaultrole: '',
            defaultdescription: '',
            defaultenable: true,
            selectedvalue: ['SYSTEM'],
        })
    }

    componentDidUpdate() {
        if (this.props.triggerStateChange == 801) {
            message.error('角色列表加载失败', 2)
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
            this.props.getRoleList(this.state.currentpage, this.state.pagesize, this.props.filterText)
        } else if (this.props.triggerStateChange == 503) {
            message.success('权限修改成功', 2)
            this.props.resetTrigger()
            this.props.getRoleList(this.state.currentpage, this.state.pagesize, this.props.filterText)
        } else if (this.props.triggerStateChange == 103) {
            message.success('编辑成功', 2)
            this.props.resetTrigger()
            this.props.getRoleList(this.state.currentpage, this.state.pagesize, this.props.filterText)
        }
    }

    addClickHandler() {
        this.setState({
            addvisible: true,
            selectedprop: ['SYSTEM']
        })
    }

    submitAdd() {
        var addroledata = this.props.form.getFieldsValue()
        if (!addroledata.rolename) {
            message.error('请输入角色名称', 2)
        } else if (!addroledata.description) {
            message.error('请输入角色描述', 2)
        } else if (!addroledata.roletype) {
            message.error('请选择角色属性', 2)
        } else {
            this.props.addRole(addroledata.rolename, addroledata.description, addroledata.roleenable, addroledata.roletype)
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
        var tmparr = this.props.roleItems.filter(item => item.id == tmpid)
        this.setState({
            editvisible: true,
            edittarget: tmparr[0].id,
            defaultrole: tmparr[0].role,
            defaultdescription: tmparr[0].description,
            defaultenable: tmparr[0].available,
            selectedprop: [tmparr[0].type],
        })
        this.props.getRoleList(this.state.currentpage, this.state.pagesize)
    }

    submitEdit() {
        var editroledata = this.props.form.getFieldsValue()
        if (!editroledata.rolename) {
            message.error('请输入角色名称', 2)
        } else if (!editroledata.description) {
            message.error('请输入角色描述', 2)
        } else if (!editroledata.roletype) {
            message.error('请选择角色属性', 2)
        } else {
            this.props.editRole(this.state.edittarget, editroledata.rolename, editroledata.description, editroledata.roleenable, editroledata.roletype)
            this.hideEditModal()
        }
    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            defaultrole: '',
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
        var tmparr = this.props.roleItems.filter(item => item.id == tmpid)
        var tmpkey = []
        if(tmparr[0].resourceIds){
            tmpkey = tmparr[0].resourceIds.split(',')
        }
        this.setState({
            permitvisible: true,
            permittarget: tmparr[0].id,
            defaultrolenm: tmparr[0].role,
            defaultdesp: tmparr[0].description,
            checkedkeys: tmpkey,
            selectedprop: [tmparr[0].type],
        })
    }

    submitPermit() {
        this.props.authRole(this.state.permittarget, this.state.checkedkeys+",")
        this.hidePermitModal()
    }

    hidePermitModal() {
        this.setState({
            permitvisible: false,
            defaultrolenm: '',
            defaultdesp: '',
            checkedkeys: [],
            selectedprop: ['SYSTEM'],
        })
    }

    refreshClickHandler(){
        this.props.updateKeyword('')
        this.props.resetRoleList()
        this.props.getRoleList(this.state.currentpage, this.state.pagesize)
    }

    enterKeyword(item) {
      this.props.updateKeyword(item.target.value)
    }

    onSearch (event){
        if(event.keyCode == 27){
            this.props.updateKeyword('')
            this.props.getRoleList(1,this.state.pagesize)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 13){
            this.props.getRoleList(1,this.state.pagesize, this.props.filterText)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 8){
            if (this.props.filterText == ''){
                this.props.updateKeyword('')
                this.props.getRoleList(1,this.state.pagesize)
                this.setState({
                    currentpage: 1,
                })
            }
       }
    }

    startSearch(){
        this.props.getRoleList(1,this.state.pagesize,this.props.filterText)
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

        const {roleItems} = this.props
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
                that.props.getRoleList(current,pageSize,that.props.filterText)
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
                that.props.getRoleList(current,that.state.pagesize,that.props.filterText)
            }
        };

        const columns = [{
            title: '角色名称',
            dataIndex: 'role',
            key: 'role',
        }, {
            title: '角色描述',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: '角色属性',
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
            title: '创建人',
            dataIndex: 'creater',
            key: 'creater',
        }, {
            title: '最后更新人',
            dataIndex: 'lastupdater',
            key: 'lastupdater',
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <span>
                        <a href="#" id={record.key * 666 + 2048} onClick={that.editUserInfo.bind(that)}>编辑</a>
                        <span className="ant-divider"></span>
                        <a href="#" id={record.key * 233 + 1024} onClick={that.getUser.bind(that)}>权限设置</a>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.roleItems.length; i++)
        {
            var propname = '';
            if (roleItems[i].type == 'SYSTEM') {
                propname = '系统菜单'
            } else if (roleItems[i].type == 'DISTRICT') {
                propname = '区菜单'
            } else if (roleItems[i].type == 'KINDERGARTEN') {
                propname = '幼儿园菜单'
            }

            data.push({
                key: this.props.roleItems[i].id,
                role: this.props.roleItems[i].role,
                type: propname,
                description: this.props.roleItems[i].description,
                available: `${this.props.roleItems[i].available ? '是' : '否'}`,
                createtime: this.props.roleItems[i].createtimeString,
                createtimedetail: this.props.roleItems[i].createtime,
                updatetime: this.props.roleItems[i].updatetimeString,
                updatetimedetail: this.props.roleItems[i].updatetime,
                creater: this.props.roleItems[i].createuserName,
                lastupdater: this.props.roleItems[i].updateuserName
            })
        }

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

        const rolenameProps = getFieldProps('rolename', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultrole
        });

        const descriptionProps = getFieldProps('description', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultdescription
        });

        const roleProps = getFieldProps('userrole', {
            rules: [
                { required: true, type: 'array' }
            ],
        });

        const propertyProps = getFieldProps('roletype', {
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
                        placeholder="搜索角色名称 (按Esc键重置)"/>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} onClick={this.startSearch.bind(this)}>
                            <Icon type="search" />
                        </Button>
                    </div>
                </InputGroup>
                <Button onClick={this.addClickHandler.bind(this)} type="primary" style={{margin: '8px 12px 0 0'}}><Icon type="plus-circle-o"/>添加</Button>
                <Button style={styles.refreshbtn} onClick={this.refreshClickHandler.bind(this)}>刷新</Button>
                <Table rowSelection={rowSelection} pagination={pagination} columns={columns} dataSource={data} size="middle"/>
                <Modal title="添加角色" visible={this.state.addvisible} onOk={this.submitAdd.bind(this)} onCancel={this.hideAddModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入角色名称："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...rolenameProps} placeholder="请输入角色名称"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="角色描述："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...descriptionProps} placeholder="请输入角色描述"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请选择角色属性： "
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
                            <RadioGroup {...getFieldProps('roleenable', { initialValue: this.state.defaultenable })} style={{marginTop: 10}}>
                                <Radio key="a" value={true}>是</Radio>
                                <Radio key="b" value={false}>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal title="编辑角色" visible={this.state.editvisible} onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入角色名称："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...rolenameProps} placeholder="请输入角色名称"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="角色描述："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...descriptionProps} placeholder="请输入角色描述"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请选择角色属性： "
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
                            <RadioGroup {...getFieldProps('roleenable', { initialValue: this.state.defaultenable })} style={{marginTop: 10}}>
                                <Radio key="a" value={true}>是</Radio>
                                <Radio key="b" value={false}>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal title="权限设置" className="setpermit" visible={this.state.permitvisible} onOk={this.submitPermit.bind(this)} onCancel={this.hidePermitModal.bind(this)} okText="提交" cancelText="取消">
                    <p style={{marginBottom: 12}}>角色名称：{this.state.defaultrolenm}</p>
                    <p style={{marginBottom: 12}}>角色描述：{this.state.defaultdesp}</p>
                    <Tree showLine multiple checkable defaultExpandAll
                        selectedKeys={[]}
                        checkedKeys={this.state.checkedkeys}
                        onCheck={this.onCheck.bind(this)}>
                        {menu}
                    </Tree>
                </Modal>
            </div>
        )
    }
}

level3 = Form.create()(level3);

function mapStateToProps(state) {

    return {
        roleItems: state.rolelist.roleItems,
        triggerStateChange: state.rolelist.triggerStateChange,
        filterText: state.keyword.filterText,
        totals: state.rolelist.totals,
        items: state.menu.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetRoleList: bindActionCreators(resetRoleList, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        getRoleList: bindActionCreators(getRoleList, dispatch),
        addRole: bindActionCreators(addRole, dispatch),
        editRole: bindActionCreators(editRole, dispatch),
        authRole: bindActionCreators(authRole, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(level3)

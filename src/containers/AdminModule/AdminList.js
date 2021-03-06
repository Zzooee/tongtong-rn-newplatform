import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input, Form, Modal, Cascader, Popconfirm, message, Icon,Tree} from 'antd'
import {getAllAdmin, resetAdminList, lockAdmin, resetTrigger, editAdmin, addAdmin, deleteAdmin} from '../../actions/AdminModule/admin'
import {getRoleList} from '../../actions/AdminModule/rolelist'
import {getOrganizationList} from '../../actions/AdminModule/organization'
import {updateKeyword} from '../../actions/keyword'

import classNames from 'classnames';
const InputGroup = Input.Group;
const TreeNode = Tree.TreeNode;
const createForm = Form.create;
const FormItem = Form.Item;

var styles = {
  refreshbtn: {
    margin: '20px 0 12px'
  }
}

class AdminList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getAllAdmin(1,10),
        this.setState({
            editvisible: false,
            currentpage: 1,
            pagesize: 10,
            selectedRows: []
        })
    }

    componentDidUpdate() {
        if (this.props.triggerStateChange == 201) {
            message.error('信息加载失败', 2)
        } else if (this.props.triggerStateChange == 801) {
            message.error('角色列表加载失败', 2)
            this.props.resetTrigger()
            
        } else if (this.props.triggerStateChange == 101) {
            message.error('编辑失败', 2)
            
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 301) {
            message.error('管理员名称重复', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 3031) {
            message.error('用户名无效', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 401) {
            message.error('删除失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 103) {
            this.props.getAllAdmin(this.state.currentpage,this.state.pagesize,this.props.filterText)
            message.success('编辑成功', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 303) {
            this.props.getAllAdmin(this.state.currentpage,this.state.pagesize,this.props.filterText)
            message.success('添加成功', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 403) {
            this.props.getAllAdmin(this.state.currentpage,this.state.pagesize,this.props.filterText)
            message.success('删除成功', 2)
            if(this.props.totals == (this.state.currentpage - 1)*this.state.pagesize){
            }
            this.props.getAllAdmin(this.state.currentpage,this.state.pagesize,this.props.filterText)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 9) {
            this.props.getAllAdmin(this.state.currentpage,this.state.pagesize,this.props.filterText)
            this.props.resetTrigger()
        }
    }

    editUserInfo(item) {
        var tmpid = (item.target.id * 1 - 2048)/666
        var tmparr = this.props.listItems.filter(item => item.id == tmpid)
        this.setState({
            editvisible: true,
            edittarget: tmparr[0].id,
            defaultusername: tmparr[0].username,
            defaultroleid: tmparr[0].roleIds,
            roleValue: [tmparr[0].roleIds*1],
            organizationValue: [tmparr[0].organizationId*1],
            checkedkeys: tmparr[0].resourceIds.split(",")
        })
        this.props.getRoleList();
        this.props.getOrganizationList();
    }

    submitEdit() {
        var userdata = this.props.form.getFieldsValue()
        if (!this.state.roleValue){
            message.error('请选择管理员角色', 2)
        }else {
            console.log(userdata.organization);
            console.log(this.state.organizationValue);
            this.props.editAdmin(this.state.edittarget, userdata.username, this.state.roleValue,
                this.state.checkedkeys,this.state.organizationValue);
            this.hideEditModal()
        }

    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            edittarget: '',
            defaultusername: '',
            defaultroleid: '',
            roleValue: [],
            checkedkeys: []
        })
    }

    addClickHandler() {
        this.setState({
            addvisible: true
        });
        this.props.getRoleList();
        this.props.getOrganizationList();
    }

    onCheck(info) {
        this.setState({
            checkedkeys: info
        })
    }

    submitAdd() {
        var adduserdata = this.props.form.getFieldsValue()
        if (!adduserdata.username) {
            message.error('请输入管理员名称', 2)
        } else if (adduserdata.username.length < 5) {
            message.error('管理员名称至少为 5 个字符', 2)
        } else if (!adduserdata.password){
            message.error('请输入管理员密码', 2)
        } else if (adduserdata.password.length < 6){
            message.error('管理员密码至少为 6 个字符', 2)
        } else if (!adduserdata.confirmpassword){
            message.error('请再次输入管理员密码', 2)
        } else if (adduserdata.password !== adduserdata.confirmpassword){
            message.error('两次输入密码不同', 2)
        } else if (!this.state.roleValue){
            message.error('请选择管理员角色', 2)
        } else {
            this.props.addAdmin(adduserdata.username, adduserdata.password,adduserdata.confirmpassword,
                this.state.roleValue[0],this.state.checkedkeys,adduserdata.organization);
            this.hideAddModal()
        }
    }

    hideAddModal() {
        this.setState({
            addvisible: false
        })
        this.props.form.resetFields()
    }

    getUser(item) {
        var tmpid = (item.target.id * 1 - 1024)/233
        var tmparr = this.props.listItems.filter(item => item.id == tmpid)
        this.setState({
            lockuserid: tmparr[0].id
        })
    }

    confirmLock() {
        var tmparr = this.props.listItems.filter(item => item.id == this.state.lockuserid)
        this.props.lockAdmin(tmparr[0].id)
    }

    roleChange(role) {
        var tmparr = this.props.roleItems.filter(item => item.id == role[0])
        if(tmparr[0].resourceIds){
            this.setState({
                checkedkeys:tmparr[0].resourceIds.split(","),
                roleValue: [tmparr[0].id*1]
            })
        }
    }

    organizationChange(organization) {
        var tmparr = this.props.orgItems.filter(item => item.id == organization[0])
        if(!!tmparr[0].id){
            this.setState({
                organizationValue: [tmparr[0].id*1],
            })
        }
    }

    confirmDelete() {
        var selectedkeys = []
        for (let i=0 ;i<this.state.selectedRows.length;i++){
            selectedkeys.push(this.state.selectedRows[i].key)
        }
        if(this.props.totals - selectedkeys.length < (this.state.currentpage - 1) * this.state.pagesize + 1 ) {
            this.setState({
                currentpage : (this.state.currentpage == 1? 1 : this.state.currentpage - 1)
            })
        }
        this.setState({
            selectedRows: []
        })
        this.props.deleteAdmin(selectedkeys+",")
    }

    refreshClickHandler() {
        this.props.updateKeyword('')
        this.props.resetAdminList()
        this.props.getAllAdmin(this.state.currentpage,this.state.pagesize)
    }

    enterKeyword(item) {
      this.props.updateKeyword(item.target.value)
    }

    onSearch (event){
        if(event.keyCode == 27){
            this.props.updateKeyword('')
            this.props.getAllAdmin(1,this.state.pagesize)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 13){
            this.props.getAllAdmin(1,this.state.pagesize, this.props.filterText)
            this.setState({
                currentpage: 1,
            })
       } else if (event.keyCode == 8){
            if (this.props.filterText == ''){
                this.props.updateKeyword('')
                this.props.getAllAdmin(1,this.state.pagesize)
                this.setState({
                    currentpage: 1,
                })
            }
       }

    }

    startSearch(){
        this.props.getAllAdmin(1,this.state.pagesize,this.props.filterText)
        this.setState({
            currentpage: 1,
        })
    }

    render() {

        const {listItems} = this.props
        const that = this
        const data = []

        const rowSelection = {

            onChange(selectedRowKeys, selectedRows) {
              that.setState({
                selectedRows: selectedRows
              })
            },
            onSelect(record, selected, selectedRows) {
            },
            onSelectAll(selected, selectedRows, changeRows) {
            },

        };

        var currentpage = 1
        var pagesize = 10
        var currentpage = this.state.currentpage

        const pagination = {
            total: this.props.totals,
            current: currentpage,
            showQuickJumper: (this.props.totals > this.state.pagesize),
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                currentpage = current;
                pagesize = pageSize;
                that.setState({
                    currentpage: current,
                    pagesize: pageSize
                });
                that.props.getAllAdmin(current,pageSize,that.props.filterText)
            },
            onChange(current) {
                that.setState({
                    currentpage: current
                });
                that.props.getAllAdmin(current,that.state.pagesize,that.props.filterText)
            }
        };

        const columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '角色',
            dataIndex: 'roleNames',
            key: 'roleNames',
        }, {
            title: '组织',
            dataIndex: 'organizationName',
            key: 'organizationName',
        },{
            title: '是否锁定',
            dataIndex: 'iflockedString',
            key: 'iflockedString',
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
                        <Popconfirm title="确认锁定此管理员吗" onConfirm={that.confirmLock.bind(that)} okText={record.iflocked ? '确认解锁' : '确认锁定'} cancelText="取消">
                            <a href="#" id={record.key * 233 + 1024} onClick={that.getUser.bind(that)}>{record.iflocked ? '解锁' : '锁定'}</a>
                        </Popconfirm>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.listItems.length; i++)
        {
            data.push({
                key: this.props.listItems[i].id,
                username: this.props.listItems[i].username,
                roleIds: this.props.listItems[i].roleIds,
                organizationName: this.props.listItems[i].organizationName,
                roleNames: this.props.listItems[i].roleNames,
                iflockedString: `${this.props.listItems[i].locked ? '是' : '否'}`,
                iflocked: this.props.listItems[i].locked,
                createtime: this.props.listItems[i].createtime,
                createtimedetail: this.props.listItems[i].createtime,
                updatetime: this.props.listItems[i].updatetime,
                updatetimedetail: this.props.listItems[i].updatetime,
                creater: this.props.listItems[i].createUserName,
                lastupdater: this.props.listItems[i].updateuserName
            })
        }

        var options = []
        if(this.props.roleItems) {
            for (let i=0; i<this.props.roleItems.length; i++)
            {
                options.push({
                    value: this.props.roleItems[i].id,
                    label: this.props.roleItems[i].description,
                })
            }
        }
        var organizationOptions = []
        if(this.props.orgItems) {
            for (let i=0; i<this.props.orgItems.length; i++)
            {
                organizationOptions.push({
                    value: this.props.orgItems[i].id,
                    label: this.props.orgItems[i].name,
                })
            }
        }
        const defaultrole = options.filter(item => item.value == this.state.defaultroleid)

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

        const nameProps = getFieldProps('username', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultusername
        });

        const passwdProps = getFieldProps('password', {
            rules: [
                { required: true, whitespace: true }
            ],
        });

        const confirmpasswdProps = getFieldProps('confirmpassword', {
            rules: [
                { required: true, whitespace: true }
            ],
        });

        const roleProps = getFieldProps('userrole', {
            rules: [
                { required: true, type: 'array' }
            ],
        });

        const organizationProps = getFieldProps('organization', {
            rules: [
                { required: true, type: 'array' }
            ],
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

        var menus = this.props.menuItems.map((item) => {
            return (
                <TreeNode title={<span>{item.name}</span>} key={item.id}>
                    {
                        item.childMenus.map((node2) =>
                        {
                            if(node2.childMenus.length>0){
                                return(
                                    <TreeNode title={node2.name} key={node2.id}>
                                        {
                                            node2.childMenus.map(node3 => {
                                                if(node3.childMenus.length>0){
                                                    return(
                                                        <TreeNode title={node3.name} key={node3.id}>
                                                            {
                                                                node3.childMenus.map(node4=>{
                                                                    return(
                                                                        <TreeNode title={node4.name} key={node4.id}/>
                                                                    )
                                                                })
                                                            }
                                                        </TreeNode>
                                                    )
                                                }else{
                                                    return(
                                                        <TreeNode title={node3.name} key={node3.id}/>
                                                    )
                                                }
                                            })
                                        }
                                    </TreeNode>
                                )
                            }else{
                                return (
                                    <TreeNode title={node2.name} key={node2.id}/>
                                )
                            }
                        })
                    }
                </TreeNode>
            )
        });

        return (
            <div>
                <InputGroup className="tj-search-group">
                    <Input {...searchProps} onKeyUp={this.onSearch.bind(this)} value={this.props.filterText} onChange={this.enterKeyword.bind(this)}
                        placeholder="搜索用户名 (按Esc键重置)"/>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} onClick={this.startSearch.bind(this)}>
                            <Icon type="search" />
                        </Button>
                    </div>
                </InputGroup>

                <Popconfirm title="确认删除选中的管理员吗" onConfirm={that.confirmDelete.bind(that)} okText="确认删除" cancelText="取消">
                    <Button type="ghost" style={{margin: '8px 12px 0 0'}} disabled={this.state.selectedRows.length == 0}><Icon type="delete" style={{color: '#f45f06'}}/>删除</Button>
                </Popconfirm>

                <Button onClick={this.addClickHandler.bind(this)} type="primary" style={{margin: '8px 12px 0 0'}}><Icon type="plus-circle-o"/>添加</Button>
                <Button style={styles.refreshbtn} onClick={this.refreshClickHandler.bind(this)}>刷新</Button>

                <Table rowSelection={rowSelection} pagination={pagination} columns={columns} dataSource={data} size="middle"/>

                <Modal title="编辑管理员" visible={this.state.editvisible} onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)}>
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="管理员名称："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...nameProps} placeholder="请输入管理员名称"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="管理员组织： ">
                            <Cascader {...organizationProps} options={organizationOptions}
                                  allowClear={false} value={this.state.organizationValue}
                                  onChange={that.organizationChange.bind(that)} placeholder="请选择组织" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="管理员角色： ">
                            <Cascader {...roleProps} options={options} allowClear={false}
                                                     placeholder="请选择角色" onChange={that.roleChange.bind(that)}
                                                     value={this.state.roleValue}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="自定义菜单">
                            <div style= {{height:'300px',overflow:'overlay',border: '1px solid #d5f1fd',
                                    borderRadius: '6px'}}>
                                <Tree showLine multiple checkable
                                      selectedKeys={[]}
                                      checkedKeys={this.state.checkedkeys}
                                      onCheck={this.onCheck.bind(this)}>
                                    {menus}
                                </Tree>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="添加管理员" visible={this.state.addvisible} onOk={this.submitAdd.bind(this)} onCancel={this.hideAddModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="管理员名称："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...nameProps} placeholder="请输入管理员名称"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="管理员密码："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...passwdProps} type='password' autoComplete="off" onContextMenu={false}
                            onPaste={false} onCopy={false} onCut={false} placeholder="请输入管理员密码"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认管理员密码："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...confirmpasswdProps} type='password' autoComplete="off" onContextMenu={false}
                            onPaste={false} onCopy={false} onCut={false} placeholder="请再次输入管理员密码"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="管理员组织： ">
                            <Cascader {...organizationProps} options={organizationOptions}
                               allowClear={false} placeholder="请选择组织" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="管理员角色： ">
                            <Cascader {...roleProps} options={options} allowClear={false}
                              placeholder="请选择角色" onChange={that.roleChange.bind(that)}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="自定义菜单">
                            <div style= {{height:'300px',overflow:'overlay',border: '1px solid #d5f1fd',
                                    borderRadius: '6px'}}>
                                <Tree showLine multiple checkable
                                      selectedKeys={[]}
                                      checkedKeys={this.state.checkedkeys}
                                      onCheck={this.onCheck.bind(this)}>
                                    {menus}
                                </Tree>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>

            </div>
        )
    }
}

AdminList = Form.create()(AdminList);

function mapStateToProps(state) {

    return {
        listItems: state.admin.listItems,
        roleItems: state.rolelist.roleItems,
        orgItems: state.organization.orgItems,
        menuItems: state.menu.items,
        triggerStateChange: state.admin.triggerStateChange,
        filterText: state.keyword.filterText,
        totals: state.admin.totals
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllAdmin: bindActionCreators(getAllAdmin, dispatch),
        resetAdminList: bindActionCreators(resetAdminList, dispatch),
        lockAdmin: bindActionCreators(lockAdmin, dispatch),
        editAdmin: bindActionCreators(editAdmin, dispatch),
        addAdmin: bindActionCreators(addAdmin, dispatch),
        deleteAdmin: bindActionCreators(deleteAdmin, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        getRoleList: bindActionCreators(getRoleList, dispatch),
        getOrganizationList: bindActionCreators(getOrganizationList, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminList)

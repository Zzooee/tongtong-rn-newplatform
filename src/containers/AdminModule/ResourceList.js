import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input, Form, Modal, Cascader, Popconfirm, message, Icon, Radio} from 'antd'
import {getAllResource, resetResourceList, addResource, editResource, resetTrigger, getAllResourceByType} from '../../actions/AdminModule/resource'
import {updateKeyword} from '../../actions/keyword';
import {getOrganizationList} from '../../actions/AdminModule/organization';
import {getAllMenu} from '../../actions/menu'
import authUtils from '../../utils/auth';
import classNames from 'classnames';
import api from '../../api';
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;

const createForm = Form.create;
const FormItem = Form.Item;

var styles = {
  refreshbtn: {
    margin: '20px 0 12px'
  }
}

class ResourceList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getAllResource(),
        this.setState({
            editvisible: false,
            addvisible: false,
            defaultname: '',
            selectedvalue: ['FIRST_MENU'],
            defaulturl: '',
            defaultroute: '',
            defaultpermission: '',
            selectedvalue: ['SYSTEM'],
            defaultparent: [0],
            defaultavail: true,
            defaulticon: '',
            menuops: [{'value':0,'label':'无父ID'}],
            loading: false,
            data: [],
            pagination: {},
            initialload: 1
        })
    }

    componentWillReceiveProps() {

    }

    componentDidUpdate() {
        if (this.props.resourceItems.length > 0 && this.state.initialload == 1) {
            this.setState({
                initialitems: this.props.resourceItems,
                initialload: 2
            })
        } else if (this.props.triggerStateChange == 301) {
            message.error('添加失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 101) {
            message.error('编辑失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 303) {
            message.success('添加成功', 2)
            this.props.resetTrigger()
            this.props.getAllResource(this.props.filterText)
            this.props.getAllMenu()
        } else if (this.props.triggerStateChange == 103) {
            this.props.getAllResource(this.props.filterText)
            message.success('编辑成功', 2)
            this.props.resetTrigger()
            this.props.getAllMenu()
        }
    }

    editResourceInfo(item) {
        var tmpid = (item.target.id * 1 - 2048)/666
        var tmparr = this.state.initialitems.filter(item => item.id == tmpid)
        var tmptypename = []
        var menuops = []
        if (tmparr[0].type == "一级菜单") {
            tmptypename = ['FIRST_MENU']
            menuops = [{'value':0,'label':'无父ID'}]
        } else if (tmparr[0].type == "二级菜单") {
            tmptypename = ['SECOND_MENU']
            var firstmenus = this.state.initialitems.filter(item => item.parentId == 0)
            for (let i=0; i<firstmenus.length; i++){
                menuops.push({
                    value: firstmenus[i].id,
                    label: firstmenus[i].name
                })
            }
        } else if (tmparr[0].type == "按钮") {
            tmptypename = ['BUTTON']
            for (let i=0; i<this.state.initialitems.length; i++){
                menuops.push({
                    value: this.state.initialitems[i].id,
                    label: this.state.initialitems[i].name
                })
            }
        } else if (tmparr[0].type == "三级菜单") {
            tmptypename = ['THIRD_MENU']
            var sndmenus = this.state.initialitems.filter(item => item.type == '二级菜单')
            for (let i=0; i<sndmenus.length; i++){
                menuops.push({
                    value: sndmenus[i].id,
                    label: sndmenus[i].name
                })
            }
        } else if (tmparr[0].type == "四级菜单") {
            tmptypename = ['FOURTH_MENU']
            var trdmenus = this.props.resourceItems.filter(item => item.type == '三级菜单')
            for (let i=0; i<trdmenus.length; i++){
                menuops.push({
                    value: trdmenus[i].id,
                    label: trdmenus[i].name
                })
            }
        }

        var propname = '';
        if (tmparr[0].property == '系统菜单') {
            propname = 'SYSTEM'
        } else if (tmparr[0].property == '区菜单') {
            propname = 'DISTRICT'
        } else if (tmparr[0].property == '幼儿园菜单') {
            propname = 'KINDERGARTEN'
        }

        this.setState({
            editvisible: true,
            edittarget: tmparr[0].id,
            defaultname: tmparr[0].name,
            selectedvalue: tmptypename,
            defaulturl: tmparr[0].url,
            defaultroute: tmparr[0].routeUrl ? tmparr[0].routeUrl : '',
            defaultpermission: tmparr[0].permission,
            selectedprop: [propname],
            defaultparent: [tmparr[0].parentId],
            defaultavail: tmparr[0].available,
            defaulticon: tmparr[0].iconType,
            menuops: menuops
        })
    }

    submitEdit() {
        var editresourcedata = this.props.form.getFieldsValue()
        if (!editresourcedata.resourcename) {
            message.error('请输入资源名称', 2)
        } else if (!editresourcedata.resourceproperty) {
            message.error('请选择资源属性', 2)
        } else if (!editresourcedata.resourceurl) {
            message.error('请选择资源url', 2)
        } else if (!editresourcedata.resourcereacturl) {
            message.error('请选择资源ReactUrl', 2)
        } else if (!editresourcedata.resourcepermission) {
            message.error('请选择资源权限', 2)
        } else if (!editresourcedata.resourceparent) {
            message.error('请选择上级菜单', 2)
        } else if (editresourcedata.resourcetype == 'FIRST_MENU' && editresourcedata.resourceparent != 0) {
            message.error('无父ID', 2)
        } else if (!editresourcedata.resourceenable) {
            message.error('请选择是否可用', 2)
        } else {
            this.props.editResource(this.state.edittarget, editresourcedata.resourcename, editresourcedata.resourcetype, editresourcedata.resourceurl, editresourcedata.resourcereacturl, editresourcedata.resourceicontype, editresourcedata.resourceenable, editresourcedata.resourceparent, editresourcedata.resourcepermission, authUtils.getUid(), editresourcedata.resourceproperty)
            this.hideEditModal()
        }
    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            defaultname: '',
            selectedvalue: ['FIRST_MENU'],
            defaulturl: '',
            defaultroute: '',
            defaultpermission: '',
            selectedprop: ['SYSTEM'],
            defaultparent: [0],
            defaultavail: true,
            defaulticon: ''
        })
        this.props.form.resetFields()
    }

    addClickHandler() {
        this.setState({
            addvisible: true,
            selectedvalue: ['FIRST_MENU'],
            menuops : [{'value':0,'label':'无父ID'}],
            selectedprop: ['SYSTEM']
        })
    }

    submitAdd() {
        var addresourcedata = this.props.form.getFieldsValue()
        if (!addresourcedata.resourcename) {
            message.error('请输入资源名称', 2)
        } else if (!addresourcedata.resourcetype) {
            message.error('请选择资源类型', 2)
        } else if (!addresourcedata.resourceurl) {
            message.error('请选择资源url', 2)
        } else if (!addresourcedata.resourcereacturl) {
            message.error('请选择资源ReactUrl', 2)
        } else if (!addresourcedata.resourcepermission) {
            message.error('请选择资源权限', 2)
        } else if (!addresourcedata.resourceproperty) {
            message.error('请选择资源属性', 2)
        } else if (!addresourcedata.resourceparent) {
            message.error('请选择上级菜单', 2)
        } else if (addresourcedata.resourcetype == 'FIRST_MENU' && addresourcedata.resourceparent != 0) {
            message.error('无父ID', 2)
        } else {
            this.props.addResource(addresourcedata.resourcename, addresourcedata.resourcetype, addresourcedata.resourceurl, addresourcedata.resourcereacturl, addresourcedata.resourceicontype, addresourcedata.resourceenable, addresourcedata.resourceparent, addresourcedata.resourcepermission, addresourcedata.resourceproperty)
            this.hideAddModal()
        }

    }

    hideAddModal() {
        this.setState({
            addvisible: false,
            selectedvalue: ['FIRST_MENU'],
            selectedprop:['SYSTEM']
        })
        this.props.form.resetFields()
    }

    refreshClickHandler(){
        this.props.updateKeyword('')
        this.props.resetResourceList()
        this.props.getAllResource()
    }

    enterKeyword(item) {
      this.props.updateKeyword(item.target.value)
    }

    onSearch (event){
        if(event.keyCode == 27){
            this.props.updateKeyword('')
            this.props.getAllResource()
       } else if (event.keyCode == 13){
            this.props.getAllResource(this.props.filterText)
       } else if (event.keyCode == 8){
            if (this.props.filterText == ''){
                this.props.updateKeyword('')
                this.props.getAllResource()
            }
       }

    }

    startSearch(){
        this.props.getAllResource(this.props.filterText)
    }

    validmenus(value) {
        var menuops = []
        if(value == 'FIRST_MENU') {
            menuops = [{'value':0,'label':'无父ID'}]
        } else if (value == 'SECOND_MENU'){
            var firstmenus = this.props.resourceItems.filter(item => item.parentId == 0)
            for (let i=0; i<firstmenus.length; i++){
                menuops.push({
                    value: firstmenus[i].id,
                    label: firstmenus[i].name
                })
            }
        } else if (value == 'THIRD_MENU'){
            var sndmenu = this.props.resourceItems.filter(item => item.type == '二级菜单')
            for (let i=0; i<sndmenu.length; i++){
                menuops.push({
                    value: sndmenu[i].id,
                    label: sndmenu[i].name
                })
            }
        } else if (value == 'FOURTH_MENU'){
            var trdmenu = this.props.resourceItems.filter(item => item.type == '三级菜单')
            for (let i=0; i<trdmenu.length; i++){
                menuops.push({
                    value: trdmenu[i].id,
                    label: trdmenu[i].name
                })
            }
        }
        this.setState({
            selectedvalue: value,
            menuops: menuops
        })

    }

    validproperty(value){
      this.setState({
          selectedprop: value
      })
    }

    handleTableChange(pagination, filters, sorter) {
      if(filters.length > 0) {this.props.getAllResourceByType(filters.type[0])}
    }


    render() {

        const {resourceItems} = this.props
        const that = this
        const data = []

        var currentpage = 1
        var pagesize = 10

        const pagination = {
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
                currentpage = current;
                pagesize = pageSize;
                that.setState({
                    currentpage: current,
                    pagesize: pageSize
                });
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
            }
        };

        const columns = [{
            title: '资源名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '资源ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '父ID',
            dataIndex: 'parentid',
            key: 'parentid',
        }, {
            title: '资源类型',
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: '一级菜单', value: 'FIRST_MENU' },
                { text: '二级菜单', value: 'SECOND_MENU' },
                { text: '三级菜单', value: 'THIRD_MENU' },
                { text: '四级菜单', value: 'FOURTH_MENU' }
              ],
            filterMultiple: false,
        }, {
            title: 'url',
            dataIndex: 'url',
            key: 'url',
            width: 100,
        }, {
            title: 'ReactUrl',
            dataIndex: 'ReactUrl',
            key: 'ReactUrl',
            width: 100,
        }, {
            title: 'Icon',
            dataIndex: 'iconType',
            key: 'iconType',
        }, {
            title: '父级菜单',
            dataIndex: 'parentName',
            key: 'parentName',
        }, {
            title: '资源权限',
            dataIndex: 'permission',
            key: 'permission',
        }, {
            title: '资源属性',
            dataIndex: 'property',
            key: 'property',
        }, {
            title: '是否可用',
            dataIndex: 'available',
            key: 'available',
        }, {
            title: '创建时间',
            dataIndex: 'createtime',
            key: 'createtime',
            width: 100,
        }, {
            title: '更新时间',
            dataIndex: 'updatetime',
            key: 'updatetime',
            width: 100,
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
            width: 80,
            render(text, record) {
                return (
                    <span>
                        <a href="#" id={record.key * 666 + 2048} onClick={that.editResourceInfo.bind(that)}>编辑</a>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.resourceItems.length; i++)
        {
            data.push({
                key: this.props.resourceItems[i].id,
                id: this.props.resourceItems[i].id,
                parentid: this.props.resourceItems[i].parentId,
                name: this.props.resourceItems[i].name,
                type: this.props.resourceItems[i].type,
                url: this.props.resourceItems[i].url,
                ReactUrl: this.props.resourceItems[i].routeUrl,
                iconType: this.props.resourceItems[i].iconType,
                parentName: this.props.resourceItems[i].parentName,
                permission: this.props.resourceItems[i].permission,
                property: this.props.resourceItems[i].property,
                available: `${this.props.resourceItems[i].available ? '是' : '否'}`,
                createtime: this.props.resourceItems[i].createtimeString,
                createtimedetail: this.props.resourceItems[i].createtime,
                updatetime: this.props.resourceItems[i].updatetimeString,
                updatetimedetail: this.props.resourceItems[i].updatetime,
                creater: this.props.resourceItems[i].createuserName,
                lastupdater: this.props.resourceItems[i].updateuserName
            })
        }

        const options = [{
            value: 'FIRST_MENU',
            label: '一级菜单',
        },{
            value: 'SECOND_MENU',
            label: '二级菜单',
        },{
            value: 'THIRD_MENU',
            label: '三级菜单',
        },{
            value: 'FOURTH_MENU',
            label: '四级菜单',
        },{
            value: 'BUTTON',
            label: '按钮',
        }]

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

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

        const resourceProps = getFieldProps('resourcename', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultname
        });

        const typeProps = getFieldProps('resourcetype', {
            rules: [
                { required: true, type: 'array' }
            ],
            initialValue: this.state.selectedvalue
        });

        const urlProps = getFieldProps('resourceurl', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaulturl
        });

        const reacturlProps = getFieldProps('resourcereacturl', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultroute
        });

        const icontypeProps = getFieldProps('resourceicontype', {
            initialValue: this.state.defaulticon
        });

        const permissionProps = getFieldProps('resourcepermission', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultpermission
        });

        const parentProps = getFieldProps('resourceparent', {
            rules: [
                { required: true, type: 'array' }
            ],
            initialValue: this.state.defaultparent
        });

        const propertyProps = getFieldProps('resourceproperty', {
            rules: [
                { required: true, type: 'array' }
            ],
            initialValue: this.state.selectedprop
        });

        const FormItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 13 },
        };

        const searchProps = getFieldProps('searchkeyword', {});

        const btnCls = classNames({
            'ant-search-btn': true
        });
        const searchCls = classNames({
            'ant-search-input': true
        });

        return (
            <div>
                <InputGroup className="tj-search-group">
                    <Input {...searchProps} onKeyUp={this.onSearch.bind(this)} value={this.props.filterText} onChange={this.enterKeyword.bind(this)}
                        placeholder="搜索资源名称 (按Esc键重置)"/>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} onClick={this.startSearch.bind(this)}>
                            <Icon type="search" />
                        </Button>
                    </div>
                </InputGroup>
                <Button onClick={this.addClickHandler.bind(this)} type="primary" style={{margin: '8px 12px 0 0'}}><Icon type="plus-circle-o"/>添加</Button>
                <Button style={styles.refreshbtn} onClick={this.refreshClickHandler.bind(this)}>刷新</Button>
                <Table pagination={pagination} columns={columns} dataSource={data} size="middle" onChange={this.handleTableChange.bind(this)} loading={this.state.loading}/>
                <Modal title="添加资源" visible={this.state.addvisible} onOk={this.submitAdd.bind(this)} onCancel={this.hideAddModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入资源名称："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...resourceProps} placeholder="请输入资源名称"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="资源类型："
                            help=" "
                            validateStatus="success"
                            >
                            <Cascader {...typeProps} options={options} allowClear={false} onChange={this.validmenus.bind(this)}/>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入资源路径："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...urlProps} placeholder="请输入资源路径"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入React路径： "
                            help=" "
                            >
                            <Input {...reacturlProps} placeholder="请输入React路径"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入Icon名称： "
                            help=" "
                            >
                            <Input {...icontypeProps} placeholder="请输入Icon名称"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入资源权限： "
                            help=" "
                            >
                            <Input {...permissionProps} placeholder="请输入资源权限"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请选择资源属性： "
                            help=" "
                            >
                            <Cascader {...propertyProps} options={propoptions} allowClear={false} onChange={this.validproperty.bind(this)}/>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请选择上级菜单："
                            help=" "
                            validateStatus="success"
                            >
                            <Cascader {...parentProps} options={this.state.menuops} allowClear={false} disabled={this.state.selectedvalue == 'FIRST_MENU'}/>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="是否可用："
                            help=" "
                            validateStatus="success"
                            style={{marginBottom: 20}}
                            >
                            <RadioGroup {...getFieldProps('resourceenable', { initialValue: true })} style={{marginTop: 10}}>
                                <Radio key="a" value={true}>是</Radio>
                                <Radio key="b" value={false}>否</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal title="编辑资源" visible={this.state.editvisible} onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)}>
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入资源名称："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...resourceProps} placeholder="请输入资源名称"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="资源类型："
                            help=" "
                            validateStatus="success"
                            >
                            <Cascader {...typeProps} options={options} allowClear={false} onChange={this.validmenus.bind(this)}/>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入资源路径："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...urlProps} placeholder="请输入资源路径"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入React路径： "
                            help=" "
                            >
                            <Input {...reacturlProps} placeholder="请输入React路径"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入Icon名称： "
                            help=" "
                            >
                            <Input {...icontypeProps} placeholder="请输入Icon名称"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请输入资源权限： "
                            help=" "
                            >
                            <Input {...permissionProps} placeholder="请输入资源权限"></Input>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请选择资源属性： "
                            help=" "
                            >
                            <Cascader {...propertyProps} options={propoptions} allowClear={false} onChange={this.validproperty.bind(this)}/>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="请选择上级菜单："
                            help=" "
                            validateStatus="success"
                            >
                            <Cascader {...parentProps} options={this.state.menuops} allowClear={false} disabled={this.state.selectedvalue == 'FIRST_MENU'}/>
                        </FormItem>
                        <FormItem
                            {...FormItemLayout}
                            label="是否可用："
                            help=" "
                            validateStatus="success"
                            style={{marginBottom: 20}}
                            >
                            <RadioGroup {...getFieldProps('resourceenable', { initialValue: this.state.defaultavail })} style={{marginTop: 10}}>
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

ResourceList = Form.create()(ResourceList);

function mapStateToProps(state) {

    return {
        resourceItems: state.resource.resourceItems,
        triggerStateChange: state.resource.triggerStateChange,
        filterText: state.keyword.filterText,
        items: state.menu.items,
        orgItems: state.organization.orgItems
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllResource: bindActionCreators(getAllResource, dispatch),
        resetResourceList: bindActionCreators(resetResourceList, dispatch),
        addResource: bindActionCreators(addResource, dispatch),
        editResource: bindActionCreators(editResource, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
        getAllMenu: bindActionCreators(getAllMenu, dispatch),
        getAllResourceByType: bindActionCreators(getAllResourceByType, dispatch),
        getOrganizationList: bindActionCreators(getOrganizationList, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList)

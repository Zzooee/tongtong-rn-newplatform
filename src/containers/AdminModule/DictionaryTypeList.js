import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input, Form, Modal, Cascader, Popconfirm, message, Icon,Tree} from 'antd'
import {getAllDictionaryType,resetAllDictionaryType,addDictionaryType,editDictionaryType,resetTrigger} from '../../actions/AdminModule/dictionaryType'
import {updateKeyword} from '../../actions/keyword'

import classNames from 'classnames';
const InputGroup = Input.Group;
const FormItem = Form.Item;

var styles = {
    refreshbtn: {
        margin: '20px 0 12px'
    }
}

class DictionaryTypeList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getAllDictionaryType(1,10),
        this.setState({
            editvisible: false,
            addvisible: false,
            currentpage: 1,
            pagesize: 10,
            selectedRows: []
        })
    }

    componentDidUpdate() {
        if (this.props.triggerStateChange == 201) {
            message.error('信息加载失败', 2);
            this.props.resetTrigger();
        } else if (this.props.triggerStateChange == 3000) {
            message.success('添加成功', 2);
            this.props.resetTrigger();
            this.props.getAllDictionaryType(this.state.currentpage,this.state.pagesize,this.props.filterText);
        }else if (this.props.triggerStateChange == 3500) {
            if(this.props.errorMessage){
                message.error(this.props.errorMessage, 2);
            }
            this.props.resetTrigger();
        }else if (this.props.triggerStateChange == 3501) {
            if(this.props.errorMessage){
                message.error(this.props.errorMessage, 2);
            }else{
                message.error("添加失败", 2);
            }
            this.props.resetTrigger();
        }else if (this.props.triggerStateChange == 6500) {
            if(this.props.errorMessage){
                message.error(this.props.errorMessage, 2);
            }else{
                message.error("编辑失败", 2);
            }
            this.props.resetTrigger();
        }else if (this.props.triggerStateChange == 6200) {
            message.success('编辑成功', 2);
            this.props.resetTrigger();
            this.props.getAllDictionaryType(this.state.currentpage,this.state.pagesize,this.props.filterText);
        }
    }

    onSearch (event){
        if(event.keyCode == 27){
            this.props.updateKeyword('')
            this.props.getAllDictionaryType(1,this.state.pagesize)
            this.setState({
                currentpage: 1,
            })
        } else if (event.keyCode == 13){
            this.props.getAllDictionaryType(1,this.state.pagesize, this.props.filterText)
            this.setState({
                currentpage: 1,
            })
        } else if (event.keyCode == 8){
            if (this.props.filterText == ''){
                this.props.updateKeyword('')
                this.props.getAllDictionaryType(1,this.state.pagesize)
                this.setState({
                    currentpage: 1,
                })
            }
        }

    }

    enterKeyword(item) {
        this.props.updateKeyword(item.target.value)
    }

    startSearch(){
        this.props.getAllDictionaryType(1,this.state.pagesize,this.props.filterText)
        this.setState({
            currentpage: 1,
        })
    }

    refreshClickHandler() {
        this.props.updateKeyword('')
        this.props.resetAllDictionaryType()
        this.props.getAllDictionaryType(this.state.currentpage,this.state.pagesize)
    }

    addClickHandler() {
        this.setState({
            addvisible: true
        })
    }

    submitAdd() {
        var dictionaryTypedata = this.props.form.getFieldsValue()
        if (!dictionaryTypedata.key) {
            message.error('请输入key', 2)
            return;
        }else if (!dictionaryTypedata.name) {
            message.error('请输入名称', 2)
            return;
        }else if (!dictionaryTypedata.des) {
            message.error('请输入描述说明', 2)
            return;
        }else{
            this.props.addDictionaryType(dictionaryTypedata.key, dictionaryTypedata.name,dictionaryTypedata.des)
            this.hideAddModal()
        }
    }

    hideAddModal() {
        this.setState({
            addvisible: false
        })
        this.props.form.resetFields()
    }

    editDictionaryType(item) {
        var tmpid = (item.target.id * 1 - 2048)/666
        var tmparr = this.props.listItems.filter(item => item.id == tmpid)
        this.setState({
            edittarget: tmparr[0].id,
            defaultkey: tmparr[0].key,
            defaultname: tmparr[0].name,
            defaultdes: tmparr[0].directions,
            editvisible: true
        })
    }

    submitEdit() {
        var dictionaryTypedata = this.props.form.getFieldsValue()
        if (!dictionaryTypedata.key) {
            message.error('请输入key', 2);
            return;
        }else if (!dictionaryTypedata.name) {
            message.error('请输入名称', 2);
            return;
        }else if (!dictionaryTypedata.des) {
            message.error('请输入描述说明', 2);
            return;
        }else{
            this.props.editDictionaryType(this.state.edittarget,dictionaryTypedata.key,
                                                dictionaryTypedata.name,dictionaryTypedata.des);
            this.hideEditModal();
        }
    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            defaultkey: '',
            defaultname: '',
            defaultdes: ''

        })
        this.props.form.resetFields()
    }

    render() {
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
                that.props.getAllDictionaryType(current,pageSize,that.props.filterText)
            },
            onChange(current) {
                that.setState({
                    currentpage: current
                });
                that.props.getAllDictionaryType(current,that.state.pagesize,that.props.filterText)
            }
        };

        const columns = [{
            title: 'key',
            dataIndex: 'keys',
            key: 'key',
        }, {
            title: '名称',
            dataIndex: 'names',
            key: 'names',
        }, {
            title: '描述',
            dataIndex: 'directions',
            key: 'directions',
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
                        <a href="#" id={record.key * 666 + 2048} onClick={that.editDictionaryType.bind(that)}>编辑</a>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.listItems.length; i++)
        {
            data.push({
                key: this.props.listItems[i].id,
                keys: this.props.listItems[i].key,
                names: this.props.listItems[i].name,
                directions: this.props.listItems[i].directions,
                creater: this.props.listItems[i].createUserName,
                createtime: this.props.listItems[i].createtime,
                lastupdater: this.props.listItems[i].updateUserName,
                updatetime: this.props.listItems[i].updatetime
            })
        }

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const searchProps = getFieldProps('searchkeyword', {});
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultname
        });
        const keyProps = getFieldProps('key', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultkey
        });
        const desProps = getFieldProps('des', {
            rules: [
                { required: true }
            ],
            initialValue: this.state.defaultdes
        });
        const btnCls = classNames({
            'ant-search-btn': true
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <InputGroup className="tj-search-group">
                    <Input {...searchProps} onKeyUp={this.onSearch.bind(this)} value={this.props.filterText}
                                            onChange={this.enterKeyword.bind(this)}
                                            placeholder="搜索key (按Esc键重置,Enter键搜索)"/>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} onClick={this.startSearch.bind(this)}>
                            <Icon type="search" />
                        </Button>
                    </div>
                </InputGroup>
                <Button onClick={this.addClickHandler.bind(this)} type="primary" style={{margin: '8px 12px 0 0'}}><Icon type="plus-circle-o"/>添加</Button>
                <Button style={styles.refreshbtn} onClick={this.refreshClickHandler.bind(this)}>刷新</Button>

                <Table rowSelection={rowSelection} pagination={pagination} columns={columns} dataSource={data} size="middle"/>

                <Modal title="添加字典类型" visible={this.state.addvisible}
                       onOk={this.submitAdd.bind(this)} onCancel={this.hideAddModal.bind(this)}
                       okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="key："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...keyProps} placeholder="请输入key"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="名称："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...nameProps} placeholder="请输入名称"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述说明："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...desProps} placeholder="请输入描述说明"></Input>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="编辑数据字典类型" visible={this.state.editvisible}
                       onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)}
                       okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="key："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...keyProps} placeholder="请输入key"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="名称："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...nameProps} placeholder="请输入名称"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述说明："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...desProps} placeholder="请输入描述说明"></Input>
                        </FormItem>
                    </Form>
                </Modal>

            </div>
        )
    }
}

DictionaryTypeList = Form.create()(DictionaryTypeList);

function mapStateToProps(state) {

    return {
        listItems: state.dictionaryType.listItems,
        roleItems: state.rolelist.roleItems,
        menuItems: state.menu.items,
        triggerStateChange: state.dictionaryType.triggerStateChange,
        errorMessage: state.dictionaryType.errorMessage,
        filterText: state.keyword.filterText,
        totals: state.dictionaryType.totals
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllDictionaryType: bindActionCreators(getAllDictionaryType, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        resetAllDictionaryType: bindActionCreators(resetAllDictionaryType, dispatch),
        addDictionaryType: bindActionCreators(addDictionaryType, dispatch),
        editDictionaryType: bindActionCreators(editDictionaryType, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryTypeList)

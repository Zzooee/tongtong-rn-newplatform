import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input, Form, Modal, Cascader, Popconfirm, message, Icon,Tree,InputNumber} from 'antd'
import {getAllDictionaryType} from '../../actions/AdminModule/dictionaryType'
import {getAllDictionary,resetAllDictionary,addDictionary,editDictionary,resetTrigger} from '../../actions/AdminModule/dictionary'
import {updateKeyword} from '../../actions/keyword'

import classNames from 'classnames';
const InputGroup = Input.Group;
const FormItem = Form.Item;

var styles = {
    refreshbtn: {
        margin: '20px 0 12px'
    }
};

class DictionaryTypeList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getAllDictionary(1,10);
        this.props.getAllDictionaryType(1,500);
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
            this.props.getAllDictionary(this.state.currentpage,this.state.pagesize,this.props.filterText);
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
            this.props.getAllDictionary(this.state.currentpage,this.state.pagesize,this.props.filterText);
        }
    }

    onSearch (event){
        if(event.keyCode == 27){
            this.props.updateKeyword('');
            this.props.getAllDictionary(1,this.state.pagesize);
            this.setState({
                currentpage: 1
            })
        } else if (event.keyCode == 13){
            this.props.getAllDictionary(1,this.state.pagesize, this.props.filterText);
            this.setState({
                currentpage: 1
            })
        } else if (event.keyCode == 8){
            if (this.props.filterText == ''){
                this.props.updateKeyword('');
                this.props.getAllDictionary(1,this.state.pagesize);
                this.setState({
                    currentpage: 1
                })
            }
        }

    }

    enterKeyword(item) {
        this.props.updateKeyword(item.target.value)
    }

    startSearch(){
        this.props.getAllDictionary(1,this.state.pagesize,this.props.filterText);
        this.setState({
            currentpage: 1
        })
    }

    refreshClickHandler() {
        this.props.updateKeyword('');
        this.props.resetAllDictionary();
        this.props.getAllDictionary(this.state.currentpage,this.state.pagesize);
    }

    addClickHandler() {
        this.setState({
            addvisible: true,
            defaultdicType: '',
            defaultdicparentId: ''
        })
    }

    submitAdd() {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            var dictionaryTypedata = values;
            if (!(dictionaryTypedata.sort==0) && !dictionaryTypedata.sort) {
                message.error('请输入排序值', 2)
                return;
            }else{
                this.props.addDictionary(dictionaryTypedata.dicType[0],dictionaryTypedata.parentId[0],
                    dictionaryTypedata.key,dictionaryTypedata.value,dictionaryTypedata.sort);
                this.hideAddModal();
            }
        });
    }

    hideAddModal() {
        this.setState({
            addvisible: false,
        });
        this.props.form.resetFields();
    }

    editClickHandler(item) {
        var tmpid = (item.target.id * 1 - 2048)/666
        var tmparr = this.props.listItems.filter(item => item.id == tmpid);
        this.setState({
            edittarget: tmparr[0].id,
            defaultdicType: tmparr[0].dicTypeId,
            defaultdicparentId: tmparr[0].parentId,
            defaultkey: tmparr[0].key,
            defaultvalue: tmparr[0].value,
            defaultsortNo: tmparr[0].sortNo,
            editvisible: true
        })
    }

    submitEdit() {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            var dictionaryTypedata = values;
            if (!(dictionaryTypedata.sort==0) && !dictionaryTypedata.sort) {
                message.error('请输入排序值', 2)
                return;
            }else{
                this.props.editDictionary(this.state.edittarget,dictionaryTypedata.dicType[0],dictionaryTypedata.parentId[0],
                    dictionaryTypedata.key,dictionaryTypedata.value,dictionaryTypedata.sort);
                this.hideEditModal();
            }
        });
    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            edittarget: '',
            defaultdicType: '',
            defaultdicparentId: '',
            defaultkey: '',
            defaultvalue: '',
            defaultsortNo: '',
            defaultdicType: [],
            defaultdicparentId:[]
        });
        this.props.form.resetFields()
    }

    render() {
        const that = this;
        const data = [];
        const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              that.setState({
                selectedRows: selectedRows
              })
            },
            onSelect(record, selected, selectedRows) {
              console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
              console.log(selected, selectedRows, changeRows);
            }
        };


        var currentpage = this.state.currentpage;
        const pagination = {
            total: this.props.totals,
            current: currentpage,
            showQuickJumper: (this.props.totals > this.state.pagesize),
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                that.setState({
                    currentpage: current,
                    pagesize: pageSize
                });
                that.props.getAllAdmin(current,pageSize,that.props.filterText)
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
                that.props.getAllAdmin(current,that.state.pagesize,that.props.filterText)
            }
        };

        const columns = [
        {
            title: '类型',
            dataIndex: 'dicTypeId',
            key: 'dicTypeId'
        },{
            title: 'key',
            dataIndex: 'keys',
            key: 'keys'
        },  {
            title: '值',
            dataIndex: 'value',
            key: 'value'
        }, {
            title: '排序',
            dataIndex: 'sortNo',
            key: 'sortNo'
        }, {
            title: '创建时间',
            dataIndex: 'createtime',
            key: 'createtime'
        }, {
            title: '更新时间',
            dataIndex: 'updatetime',
            key: 'updatetime'
        }, {
            title: '创建人',
            dataIndex: 'creater',
            key: 'creater'
        }, {
            title: '最后更新人',
            dataIndex: 'lastupdater',
            key: 'lastupdater'
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <span>
                        <a href="#" id={record.key * 666 + 2048} onClick={that.editClickHandler.bind(that)}>编辑</a>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.listItems.length; i++)
        {
            data.push({
                key: this.props.listItems[i].id,
                keys: this.props.listItems[i].key,
                value: this.props.listItems[i].value,
                parentId: this.props.listItems[i].parentId,
                dicTypeId: this.props.listItems[i].dicTypeId,
                sortNo: this.props.listItems[i].sortNo,
                creater: this.props.listItems[i].createUserName,
                createtime: this.props.listItems[i].createtime,
                lastupdater: this.props.listItems[i].updateUserName,
                updatetime: this.props.listItems[i].updatetime
            })
        }

        var optionsType = []
        if(this.props.listTypeItems) {
            for (let i=0; i<this.props.listTypeItems.length; i++)
            {
                optionsType.push({
                    value: this.props.listTypeItems[i].id,
                    label: this.props.listTypeItems[i].name
                })
            }
        }
        var optionsParentId = []
        if(this.props.listItems) {
            for (let i=0; i<this.props.listItems.length; i++)
            {
                optionsParentId.push({
                    value: this.props.listItems[i].id,
                    label: this.props.listItems[i].value
                })
            }
        }
        const defaultoptionsType = optionsType.filter(item => item.value == this.state.defaultdicType)
        const defaultoptionsparentId = optionsType.filter(item => item.value == this.state.defaultdicparentId)
        const {getFieldProps, getFieldError, isFieldValidating,validateFields} = this.props.form;
        const searchProps = getFieldProps('searchkeyword', {});
        const dicType = getFieldProps('dicType', {
            validate: [{
                rules: [
                    { required: true, type: "array" ,message: '请选择字典类型'}
                ],
                trigger: ['onBlur','onChange'],
            }],
            initialValue: [defaultoptionsType[0] ? defaultoptionsType[0].value : '']
        });
        const dicParentId = getFieldProps('parentId', {
            validate: [{
                rules: [
                    { required: false, type: "array",message: '请选择父级'}
                ],
                trigger: ['onBlur','onChange'],
            }],
            initialValue: [defaultoptionsparentId[0] ? defaultoptionsparentId[0].value : '']
        });
        const valueProps = getFieldProps('value', {
            validate: [{
                rules: [
                    { required: true ,message: '请输入值'}
                ],
                trigger: ['onBlur'],
            }],
            initialValue: this.state.defaultvalue
        });
        const keyProps = getFieldProps('key', {
            validate: [{
                rules: [
                    { required: true ,message: '请输入key'}
                ],
                trigger: ['onBlur'],
            }],
            initialValue: this.state.defaultkey
        });
        const sortProps = getFieldProps('sort', {
            initialValue: this.state.defaultsortNo ? this.state.defaultsortNo : 0
        });
        const btnCls = classNames({
            'ant-search-btn': true
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 }
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

                <Modal title="添加数据字典" visible={this.state.addvisible}
                       onOk={this.submitAdd.bind(this)} onCancel={this.hideAddModal.bind(this)}
                       okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout} hasFeedback={true}
                            label="字典类型： ">
                            <Cascader {...dicType} options={optionsType} allowClear={false} placeholder="选择字典类型" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout} hasFeedback={true}
                            label="父级字典： ">
                            <Cascader {...dicParentId} options={optionsParentId} allowClear={false} placeholder="选择父级字典"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout} hasFeedback={true}
                            label="key："
                        >
                            <Input {...keyProps} placeholder="请输入key"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout} hasFeedback={true}
                            label="值："
                        >
                            <Input {...valueProps} placeholder="请输入名称"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout} 
                            label="排序："
                        >
                            <InputNumber {...sortProps} min={0} placeholder="排序值" />
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="编辑数据字典" visible={this.state.editvisible}
                       onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)}
                       okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout} hasFeedback={true}
                                                label="字典类型： ">
                            <Cascader {...dicType} options={optionsType} allowClear={false} placeholder="选择字典类型" />
                        </FormItem>
                        <FormItem
                            {...formItemLayout} hasFeedback={true}
                                                label="父级字典： ">
                            <Cascader {...dicParentId} options={optionsParentId} allowClear={false} placeholder="选择父级字典"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout} hasFeedback={true}
                                                label="key："
                        >
                            <Input {...keyProps} placeholder="请输入key"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout} hasFeedback={true}
                                                label="值："
                        >
                            <Input {...valueProps} placeholder="请输入名称"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout} hasFeedback={true}
                                                label="排序："
                        >
                            <InputNumber {...sortProps} min={0} placeholder="排序值" />
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
        listItems: state.dictionary.listItems,
        listTypeItems: state.dictionaryType.listItems,
        triggerStateChange: state.dictionary.triggerStateChange,
        errorMessage: state.dictionary.errorMessage,
        filterText: state.keyword.filterText,
        totals: state.dictionary.totals
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllDictionary: bindActionCreators(getAllDictionary, dispatch),
        getAllDictionaryType: bindActionCreators(getAllDictionaryType, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        resetAllDictionary: bindActionCreators(resetAllDictionary, dispatch),
        addDictionary: bindActionCreators(addDictionary, dispatch),
        editDictionary: bindActionCreators(editDictionary, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryTypeList)

/**
 * Created by scott on 6/21/16.
 */
import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input, Form, Modal, Cascader, Popconfirm, message, Icon,Tree} from 'antd'
import {
    selectKindergartenClassAll,
    addKindergartenClass,
    editKindergartenClass,
    resetKindergartenClass,
    resetTrigger
} from '../../actions/KindergartenModule/kindergartenClass'

import {updateKeyword} from '../../actions/keyword'

import classNames from 'classnames';
const InputGroup = Input.Group;
const FormItem = Form.Item;


var styles = {
    refreshbtn: {
        margin: '20px 0 12px'
    }
}


class KindergartenClassList extends React.Component {
    constructor(props) {
        super(props)
    }


    componentWillMount() {
        this.props.selectKindergartenClassAll(1, 10),
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
            this.props.selectKindergartenClassAll(this.state.currentpage, this.state.pagesize, this.props.filterText);
        } else if (this.props.triggerStateChange == 3500) {
            if (this.props.errorMessage) {
                message.error(this.props.errorMessage, 2);
            }
            this.props.resetTrigger();
        } else if (this.props.triggerStateChange == 3501) {
            if (this.props.errorMessage) {
                message.error(this.props.errorMessage, 2);
            } else {
                message.error("添加失败", 2);
            }
            this.props.resetTrigger();
        } else if (this.props.triggerStateChange == 6500) {
            if (this.props.errorMessage) {
                message.error(this.props.errorMessage, 2);
            } else {
                message.error("编辑失败", 2);
            }
            this.props.resetTrigger();
        } else if (this.props.triggerStateChange == 6200) {
            message.success('编辑成功', 2);
            this.props.resetTrigger();
            this.props.selectKindergartenClassAll(this.state.currentpage, this.state.pagesize, this.props.filterText);
        }
    }

    onSearch(event) {
        if (event.keyCode == 27) {
            this.props.updateKeyword('')
            this.props.selectKindergartenClassAll(1, this.state.pagesize)
            this.setState({
                currentpage: 1,
            })
        } else if (event.keyCode == 13) {
            this.props.selectKindergartenClassAll(1, this.state.pagesize, this.props.filterText)
            this.setState({
                currentpage: 1,
            })
        } else if (event.keyCode == 8) {
            if (this.props.filterText == '') {
                this.props.updateKeyword('')
                this.props.selectKindergartenClassAll(1, this.state.pagesize)
                this.setState({
                    currentpage: 1,
                })
            }
        }

    }

    enterKeyword(item) {
        this.props.updateKeyword(item.target.value)
    }

    startSearch() {
        this.props.selectKindergartenClassAll(1, this.state.pagesize, this.props.filterText)
        this.setState({
            currentpage: 1,
        })
    }

    refreshClickHandler() {
        this.props.updateKeyword('')
        this.props.resetKindergartenClass()
        this.props.selectKindergartenClassAll(this.state.currentpage, this.state.pagesize)
    }

    addClickHandler() {
        this.setState({
            addvisible: true
        })
    }

    submitAdd() {
        var kindergartenClassdata = this.props.form.getFieldsValue()
        if (!kindergartenClassdata.className) {
            message.error('请输入班级名称', 2)
            return;
        } else if (!kindergartenClassdata.kindergartenId) {
            message.error('请输入幼儿园ID', 2)
            return;
        } else if (!kindergartenClassdata.gradeId) {
            message.error('请输入幼儿园年级ID', 2)
            return;
        } else if (!kindergartenClassdata.sortNo) {
            message.error('请输入排序', 2)
            return;
        } else {
            this.props.addKindergartenClass(kindergartenClassdata.className, kindergartenClassdata.kindergartenId,kindergartenClassdata.gradeId,
                kindergartenClassdata.sortNo)
            this.hideAddModal()
        }
    }

    hideAddModal() {
        this.setState({
            addvisible: false
        })
        this.props.form.resetFields()
    }

    editKindergartenClassInfo(item) {
        var tmpid = (item.target.id * 1 - 2048) / 666
        var tmparr = this.props.listItems.filter(item => item.id == tmpid)
        this.setState({
            edittarget: tmparr[0].id,
            defaultclassName: tmparr[0].className,
            defaultkindergartenId: tmparr[0].kindergartenId,
            defaultgradeId: tmparr[0].gradeId,
            defaultsortNo: tmparr[0].sortNo,
            editvisible: true
        })
    }

    submitEdit() {
        var kindergartenClassdata = this.props.form.getFieldsValue()
        if (!kindergartenClassdata.className) {
            message.error('请输入班级名称', 2)
            return;
        } else if (!kindergartenClassdata.kindergartenId) {
            message.error('请输入幼儿园ID', 2)
            return;
        } else if (!kindergartenClassdata.gradeId) {
            message.error('请输入幼儿园年级ID', 2)
            return;
        } else if (!kindergartenClassdata.sortNo) {
            message.error('请输入排序', 2)
            return;
        }  else {
            this.props.editKindergartenClass(this.state.edittarget,kindergartenClassdata.className, kindergartenClassdata.kindergartenId,kindergartenClassdata.gradeId,
                kindergartenClassdata.sortNo)
            this.hideEditModal()
        }
    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            defaultclassName:'',
            defaultkindergartenId:'',
            defaultgradeId: '',
            defaultsortNo: ''

        })
        this.props.form.resetFields()
    }

    render() {
        const that = this
        const data = []
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
                console.log('Current: ', current, '; PageSize: ', pageSize);
                currentpage = current;
                pagesize = pageSize;
                that.setState({
                    currentpage: current,
                    pagesize: pageSize
                });
                that.props.selectKindergartenClassAll(current, pageSize, that.props.filterText)
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
                that.props.selectKindergartenClassAll(current, that.state.pagesize, that.props.filterText)
            }
        };

        const columns = [{
                title: 'key',
                dataIndex: 'key',
                key: 'key',
        }, {
            title: '班级名称',
            dataIndex: 'className',
            key: 'className',
        }, {
            title: '幼儿园ID',
            dataIndex: 'kindergartenId',
            key: 'kindergartenId',
        }, {
            title: '年级ID',
            dataIndex: 'gradeId',
            key: 'gradeId',
        }, {
            title: '排序编号',
            dataIndex: 'sortNo',
            key: 'sortNo',
        },  {
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
                        <a href="#" id={record.key * 666 + 2048} onClick={that.editKindergartenClassInfo.bind(that)}>编辑</a>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.listItems.length; i++) {
            data.push({
                key: this.props.listItems[i].id,
                className: this.props.listItems[i].className,
                kindergartenId: this.props.listItems[i].kindergartenId,
                gradeId: this.props.listItems[i].gradeId,
                sortNo: this.props.listItems[i].sortNo,
                creater: this.props.listItems[i].createUserName,
                createtime: this.props.listItems[i].createtime,
                lastupdater: this.props.listItems[i].updateUserName,
                updatetime: this.props.listItems[i].updatetime
            })
        }

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const searchProps = getFieldProps('searchkeyword', {});
        const classNameProps = getFieldProps('className', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultclassName
        });
        const kindergartenIdProps = getFieldProps('kindergartenId', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultkindergartenId
        });
        const gradeIdProps = getFieldProps('gradeId', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultgradeId
        });
        const sortNoProps = getFieldProps('sortNo', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultsortNo
        });
        const btnCls = classNames({
            'ant-search-btn': true
        });
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 14},
        };
        return (
            <div>
                <InputGroup className="tj-search-group">
                    <Input {...searchProps} onKeyUp={this.onSearch.bind(this)} value={this.props.filterText}
                                            onChange={this.enterKeyword.bind(this)}
                                            placeholder="搜索key (按Esc键重置,Enter键搜索)"/>
                    <div className="ant-input-group-wrap">
                        <Button className={btnCls} onClick={this.startSearch.bind(this)}>
                            <Icon type="search"/>
                        </Button>
                    </div>
                </InputGroup>
                <Button onClick={this.addClickHandler.bind(this)} type="primary" style={{margin: '8px 12px 0 0'}}><Icon
                    type="plus-circle-o"/>添加</Button>
                <Button style={styles.refreshbtn} onClick={this.refreshClickHandler.bind(this)}>刷新</Button>

                <Table rowSelection={rowSelection} pagination={pagination} columns={columns} dataSource={data}
                       size="middle"/>

                <Modal title="添加幼儿园班级" visible={this.state.addvisible}
                       onOk={this.submitAdd.bind(this)} onCancel={this.hideAddModal.bind(this)}
                       okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="班级名称："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...classNameProps} placeholder="请输入班级名称"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="幼儿园ID："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...kindergartenIdProps} placeholder="请输入幼儿园ID"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="年级ID："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...gradeIdProps} placeholder="请输入年级ID"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="排序编号："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...sortNoProps} placeholder="请输入排序编号"></Input>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="编辑幼儿园" visible={this.state.editvisible}
                       onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)}
                       okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="班级名称："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...classNameProps} placeholder="请输入班级名称"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="幼儿园ID："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...kindergartenIdProps} placeholder="请输入幼儿园ID"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="年级ID："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...gradeIdProps} placeholder="请输入年级ID"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="排序编号："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...sortNoProps} placeholder="请输入排序编号"></Input>
                        </FormItem>
                    </Form>
                </Modal>

            </div>
        )
    }
}

KindergartenClassList = Form.create()(KindergartenClassList);

function mapStateToProps(state) {
    return {
        listItems: state.kindergartenClass.listItems,
        roleItems: state.rolelist.roleItems,
        menuItems: state.menu.items,
        triggerStateChange: state.kindergartenClass.triggerStateChange,
        errorMessage: state.kindergartenClass.errorMessage,
        filterText: state.keyword.filterText,
        totals: state.kindergartenClass.totals
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectKindergartenClassAll: bindActionCreators(selectKindergartenClassAll, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        addKindergartenClass: bindActionCreators(addKindergartenClass, dispatch),
        editKindergartenClass: bindActionCreators(editKindergartenClass, dispatch),
        resetKindergartenClass: bindActionCreators(resetKindergartenClass, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KindergartenClassList)


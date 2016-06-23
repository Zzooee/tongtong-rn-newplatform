/**
 * Created by qujian on 2016/6/20.
 */

import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input, Form, Modal, Cascader, Popconfirm, message, Icon,Tree} from 'antd'
import {
    selectKindergartenAll,
    addKindergarten,
    editKindergarten,
    resetKindergartenAll,
    resetTrigger
} from '../../actions/KindergartenModule/kindergarten'

import {updateKeyword} from '../../actions/keyword'

import classNames from 'classnames';
const InputGroup = Input.Group;
const FormItem = Form.Item;


var styles = {
    refreshbtn: {
        margin: '20px 0 12px'
    }
}


class KindergartenList extends React.Component {
    constructor(props) {
        super(props)
    }


    componentWillMount() {
        this.props.selectKindergartenAll(1, 10),
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
            this.props.selectKindergartenAll(this.state.currentpage, this.state.pagesize, this.props.filterText);
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
            this.props.selectKindergartenAll(this.state.currentpage, this.state.pagesize, this.props.filterText);
        }
    }

    onSearch(event) {
        if (event.keyCode == 27) {
            this.props.updateKeyword('')
            this.props.selectKindergartenAll(1, this.state.pagesize)
            this.setState({
                currentpage: 1,
            })
        } else if (event.keyCode == 13) {
            this.props.selectKindergartenAll(1, this.state.pagesize, this.props.filterText)
            this.setState({
                currentpage: 1,
            })
        } else if (event.keyCode == 8) {
            if (this.props.filterText == '') {
                this.props.updateKeyword('')
                this.props.selectKindergartenAll(1, this.state.pagesize)
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
        this.props.selectKindergartenAll(1, this.state.pagesize, this.props.filterText)
        this.setState({
            currentpage: 1,
        })
    }

    refreshClickHandler() {
        this.props.updateKeyword('')
        this.props.resetKindergartenAll()
        this.props.selectKindergartenAll(this.state.currentpage, this.state.pagesize)
    }

    addClickHandler() {
        this.setState({
            addvisible: true
        })
    }

    submitAdd() {
        var kindergartendata = this.props.form.getFieldsValue()
        if (!kindergartendata.name) {
            message.error('请输入幼儿园名称', 2)
            return;
        } else if (!kindergartendata.pinyin) {
            message.error('请输入幼儿园拼音', 2)
            return;
        } else if (!kindergartendata.level) {
            message.error('请输入幼儿园级别', 2)
            return;
        }
        else if (!kindergartendata.nature) {
            message.error('请输入幼儿园性质', 2)
            return;
        } else if (!kindergartendata.type) {
            message.error('请输入幼儿园类型', 2)
            return;
        } else if (!kindergartendata.phone) {
            message.error('请输入幼儿园电话', 2)
            return;
        } else if (!kindergartendata.street) {
            message.error('请输入幼儿园街道地址', 2)
            return;
        } else if (!kindergartendata.address) {
            message.error('请输入幼儿园详细地址', 2)
            return;
        } else if (!kindergartendata.status) {
            message.error('请输入幼儿园状态', 2)
            return;
        } else if (!kindergartendata.upGradeStep) {
            message.error('请输入幼儿园班级升级步骤', 2)
            return;
        } else {
            this.props.addKindergarten(kindergartendata.name, kindergartendata.pinyin, kindergartendata.level, kindergartendata.nature,
                kindergartendata.type, kindergartendata.phone, kindergartendata.street, kindergartendata.address, kindergartendata.status,
                kindergartendata.upGradeStep)
            this.hideAddModal()
        }
    }

    hideAddModal() {
        this.setState({
            addvisible: false
        })
        this.props.form.resetFields()
    }

    editKindergartenInfo(item) {
        var tmpid = (item.target.id * 1 - 2048) / 666
        var tmparr = this.props.listItems.filter(item => item.id == tmpid)
        this.setState({
            edittarget: tmparr[0].id,
            defaultname: tmparr[0].name,
            defaultpinyin: tmparr[0].pinyin,
            defaultlevel: tmparr[0].level,
            defaultnature: tmparr[0].nature,
            defaulttype: tmparr[0].type,
            defaultphone: tmparr[0].phone,
            defaultstreet: tmparr[0].street,
            defaultaddress: tmparr[0].address,
            defaultstatus: tmparr[0].status,
            defaultupGradeStep: tmparr[0].upGradeStep,
            editvisible: true
        })
    }

    submitEdit() {
        var kindergartendata = this.props.form.getFieldsValue()
        if (!kindergartendata.name) {
            message.error('请输入幼儿园名称', 2)
            return;
        } else if (!kindergartendata.pinyin) {
            message.error('请输入幼儿园拼音', 2)
            return;
        } else if (!kindergartendata.level) {
            message.error('请输入幼儿园级别', 2)
            return;
        }
        else if (!kindergartendata.nature) {
            message.error('请输入幼儿园性质', 2)
            return;
        } else if (!kindergartendata.type) {
            message.error('请输入幼儿园类型', 2)
            return;
        } else if (!kindergartendata.phone) {
            message.error('请输入幼儿园电话', 2)
            return;
        } else if (!kindergartendata.street) {
            message.error('请输入幼儿园街道地址', 2)
            return;
        } else if (!kindergartendata.address) {
            message.error('请输入幼儿园详细地址', 2)
            return;
        } else if (!kindergartendata.status) {
            message.error('请输入幼儿园状态', 2)
            return;
        } else if (!kindergartendata.upGradeStep) {
            message.error('请输入幼儿园班级升级步骤', 2)
            return;
        } else {
            this.props.editKindergarten(this.state.edittarget,kindergartendata.name, kindergartendata.pinyin, kindergartendata.level, kindergartendata.nature,
                kindergartendata.type, kindergartendata.phone, kindergartendata.street, kindergartendata.address, kindergartendata.status,
                kindergartendata.upGradeStep)
            this.hideEditModal()
        }
    }

    hideEditModal() {
        this.setState({
            editvisible: false,
            defaultname: '',
            defaultpinyin: '',
            defaultlevel: '',
            defaultnature: '',
            defaulttype: '',
            defaultphone: '',
            defaultstreet: '',
            defaultaddress: '',
            defaultstatus: '',
            defaultupGradeStep: ''

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
                that.props.getAllAdmin(current, pageSize, that.props.filterText)
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
                that.props.getAllAdmin(current, that.state.pagesize, that.props.filterText)
            }
        };

        const columns = [ {
            title: '名称',
            dataIndex: 'names',
            key: 'names',
        }, {
            title: '拼音',
            dataIndex: 'pinyin',
            key: 'pinyin',
        }, {
            title: '級別',
            dataIndex: 'level',
            key: 'level',
        }, {
            title: '性质',
            dataIndex: 'nature',
            key: 'nature',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '街道地址',
            dataIndex: 'street',
            key: 'street',
        }, {
            title: '详细地址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '班级升级步骤',
            dataIndex: 'upGradeStep',
            key: 'upGradeStep',
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
                        <a href="#" id={record.key * 666 + 2048} onClick={that.editKindergartenInfo.bind(that)}>编辑</a>
                    </span>
                );
            },
        }];

        for (let i = 0; i < this.props.listItems.length; i++) {
            data.push({
                key: this.props.listItems[i].id,
                names: this.props.listItems[i].name,
                pinyin: this.props.listItems[i].pinyin,
                level: this.props.listItems[i].level,
                nature: this.props.listItems[i].nature,
                type: this.props.listItems[i].type,
                phone: this.props.listItems[i].phone,
                street: this.props.listItems[i].street,
                address: this.props.listItems[i].address,
                status: this.props.listItems[i].status,
                upGradeStep: this.props.listItems[i].upGradeStep,
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
                {required: true}
            ],
            initialValue: this.state.defaultname
        });
        const pinyinProps = getFieldProps('pinyin', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultpinyin
        });
        const levelProps = getFieldProps('level', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultlevel
        });
        const natureProps = getFieldProps('nature', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultnature
        });
        const typeProps = getFieldProps('type', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaulttype
        });
        const phoneProps = getFieldProps('phone', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultphone
        });
        const streetProps = getFieldProps('street', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultstreet
        });
        const addressProps = getFieldProps('address', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultaddress
        });
        const statusProps = getFieldProps('status', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultstatus
        });
        const upGradeStepProps = getFieldProps('upGradeStep', {
            rules: [
                {required: true}
            ],
            initialValue: this.state.defaultupGradeStep
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

                <Modal title="添加幼儿园" visible={this.state.addvisible}
                       onOk={this.submitAdd.bind(this)} onCancel={this.hideAddModal.bind(this)}
                       okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
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
                            label="拼音："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...pinyinProps} placeholder="请输入拼音"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="级别："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...levelProps} placeholder="请输入级别"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性质："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...natureProps} placeholder="请输入性质"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="类型："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...typeProps} placeholder="请输入类型"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="电话："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...phoneProps} placeholder="请输入电话"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="街道地址："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...streetProps} placeholder="请输入街道地址"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="详细地址："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...addressProps} placeholder="请输入详细地址"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="状态："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...statusProps} placeholder="请输入状态"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="升级步骤："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...upGradeStepProps} placeholder="请输入升级步骤"></Input>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title="编辑幼儿园" visible={this.state.editvisible}
                       onOk={this.submitEdit.bind(this)} onCancel={this.hideEditModal.bind(this)}
                       okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
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
                            label="拼音："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...pinyinProps} placeholder="请输入拼音"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="级别："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...levelProps} placeholder="请输入级别"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性质："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...natureProps} placeholder="请输入性质"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="类型："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...typeProps} placeholder="请输入类型"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="电话："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...phoneProps} placeholder="请输入电话"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="街道地址："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...streetProps} placeholder="请输入街道地址"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="详细地址："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...addressProps} placeholder="请输入详细地址"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="状态："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...statusProps} placeholder="请输入状态"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="升级步骤："
                            help=" "
                            validateStatus="success"
                        >
                            <Input {...upGradeStepProps} placeholder="请输入升级步骤"></Input>
                        </FormItem>
                    </Form>
                </Modal>

            </div>
        )
    }
}

KindergartenList = Form.create()(KindergartenList);

function mapStateToProps(state) {
    return {
        listItems: state.kindergarten.listItems,
        roleItems: state.rolelist.roleItems,
        menuItems: state.menu.items,
        triggerStateChange: state.kindergarten.triggerStateChange,
        errorMessage: state.kindergarten.errorMessage,
        filterText: state.keyword.filterText,
        totals: state.kindergarten.totals
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectKindergartenAll: bindActionCreators(selectKindergartenAll, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        addKindergarten: bindActionCreators(addKindergarten, dispatch),
        editKindergarten: bindActionCreators(editKindergarten, dispatch),
        resetKindergartenAll: bindActionCreators(resetKindergartenAll, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KindergartenList)


/**
 * Created by scott on 6/20/16.
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {PropTypes} from 'react';
import {updateKeyword} from '../../actions/keyword';
import classNames from 'classnames';
import {Table, Button, Input, Form, Modal, Popconfirm, message, Icon, Radio, Tree, Cascader} from 'antd';
import {getKindergartenList, addKindergarten, resetTrigger, resetKindergartenList} from '../../actions/KindergartenModule/kindergarten';
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

class KindergartenList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getKindergartenList(1,10),
            this.setState({
                editvisible: false,
                addvisible: false,
                permitvisible: false,
                currentpage: 1,
                pagesize: 10,
                defaultkindergarten: '',
                defaultdescription: '',
                defaultenable: true,
                selectedvalue: ['SYSTEM'],
            })
    }

    addClickHandler() {
        this.setState({
            addvisible: true,
            selectedprop: ['SYSTEM']
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
            this.props.getKindergartenList(1,this.state.pagesize)
            this.setState({
                currentpage: 1,
            })
        } else if (event.keyCode == 13){
            this.props.getKindergartenList(1,this.state.pagesize, this.props.filterText)
            this.setState({
                currentpage: 1,
            })
        } else if (event.keyCode == 8){
            if (this.props.filterText == ''){
                this.props.updateKeyword('')
                this.props.getKindergartenList(1,this.state.pagesize)
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

        const {orgItems} = this.props;
        const that = this;
        const data = [];

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

        var currentpage = 1;
        var pagesize = 10;

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
                that.props.getKindergartenList(current, pageSize, that.props.filterText);
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
                that.props.getKindergartenList(current, that.state.pagesize, that.props.filterText)
            }
        };


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
            </div>
        )


    }

}

KindergartenList = Form.create()(KindergartenList);

function mapStateToProps(state) {
    return {
        orgItems: state.kindergarten.orgItems,
        triggerStateChange: state.kindergarten.triggerStateChange,
        filterText: state.keyword.filterText,
        totals: state.kindergarten.totals,
        items: state.menu.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetOrganizationList: bindActionCreators(resetKindergartenList, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        getOrganizationList: bindActionCreators(getKindergartenList, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KindergartenList);
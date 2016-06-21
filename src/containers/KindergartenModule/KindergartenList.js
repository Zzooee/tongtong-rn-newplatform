import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {PropTypes} from 'react';
import {updateKeyword} from '../../actions/keyword';
import {Table, Button, Input, Form, Modal, Popconfirm, message, Icon, Radio, Tree, Cascader} from 'antd';
import {getKindergartenAll, addKindergarten, resetTrigger, resetKindergartenALL} from '../../actions/KindergartenModule/kindergarten';
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
        this.props.getKindergartenAll(1,10),
            this.setState({
                editvisible: false,
                addvisible: false,
                permitvisible: false,
                currentpage: 1,
                pagesize: 10,
                defaultkindergarten: '',
                defaultdescription: '',
                defaultenable: true,
                selectedvalue: []
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
        this.props.getKindergartenAll(this.state.currentpage, this.state.pagesize)
    }

    enterKeyword(item) {
        this.props.updateKeyword(item.target.value)
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

    startSearch(){
        this.props.getKindergartenAll(1,this.state.pagesize,this.props.filterText)
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
                that.props.getKindergartenAll(current, pageSize, that.props.filterText);
            },
            onChange(current) {
                console.log('Current: ', current);
                that.setState({
                    currentpage: current
                });
                that.props.getKindergartenAll(current, that.state.pagesize, that.props.filterText)
            }
        };


        return (
            <div>
                1111
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
        resetKindergartenALL: bindActionCreators(resetKindergartenALL, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch),
        updateKeyword: bindActionCreators(updateKeyword, dispatch),
        getKindergartenAll: bindActionCreators(getKindergartenAll, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KindergartenList);
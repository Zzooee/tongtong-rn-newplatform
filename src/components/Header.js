import React from 'react'
import {Row, Col, Icon, Menu, Dropdown, Modal, Form, Input, message} from 'antd'
import {logout, changePwd, resetTrigger} from '../actions/user'
import authUtils from '../utils/auth';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router';

const SubMenu = Menu.SubMenu;
const createForm = Form.create;
const FormItem = Form.Item;


var styles = {
    item: {
        textAlign: 'center',
        paddingLeft: 16
    },
    banner: {
      lineHeight: '60px',
      fontSize: 18,
      float: 'left',
      paddingLeft: 22,
      color: '#fff'
    },
    ico: {
      margin: '0 12px -11px 0'
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({
            changepwdvisible: false
        })
    }

    componentDidUpdate() {
        if (this.props.triggerStateChange == 1011) {
            message.error('没有找到管理员', 2)
        } else if (this.props.triggerStateChange == 1012) {
            message.error('原密码错误', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 1013) {
            message.error('修改失败', 2)
            this.props.resetTrigger()
        } else if (this.props.triggerStateChange == 103) {
            message.success('修改成功', 2)
            this.props.resetTrigger()
        }
    }

    submitChange() {
        var changepwddata = this.props.form.getFieldsValue()
        if (!changepwddata.oldpassword){
            message.error('请输入原密码', 2)
        } else if (changepwddata.oldpassword.length < 6 || changepwddata.newpassword.length < 6){
            message.error('管理员密码至少为 6 个字符', 2)
        } else if (!changepwddata.confirmpassword){
            message.error('请再次输入管理员密码', 2)
        } else if (changepwddata.newpassword !== changepwddata.confirmpassword){
            message.error('两次输入密码不同', 2)
        } else {
            this.props.changePwd(authUtils.getUid(), changepwddata.oldpassword, changepwddata.confirmpassword)
            this.hideChangeModal()
        }
    }

    hideChangeModal() {
        this.setState({
            changepwdvisible: false
        })
    }

    menuClickHandler(item) {
        if(item.key == 'changepwd'){
            this.setState({
                changepwdvisible: true
            })
        } else if (item.key == 'logout'){
            const {actions} = this.props;
            actions.logout()
        }
    }

    render() {
        const {user,actions} = this.props;
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;

        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 },
        };

        const oldpasswdProps = getFieldProps('oldpassword', {
            rules: [
                { required: true, whitespace: true }
            ],
        });

        const newpasswdProps = getFieldProps('newpassword', {
            rules: [
                { required: true, whitespace: true }
            ],
        });

        const confirmpasswdProps = getFieldProps('confirmpassword', {
            rules: [
                { required: true, whitespace: true }
            ],
        });

        const menu = this.props.items.map((item) => {
            return (
                <SubMenu
                    key={'sub'+item.id}
                    title={<span>{item.name}</span>}
                >
                    {item.childMenus.map((node) => {
                        return (
                            <Menu.Item key={'menu'+node.id}>
                                <Link to={node.routeUrl}>{node.name}</Link>
                            </Menu.Item>
                        )
                    })}
                </SubMenu>
            )
        });

        return (
            <div style={styles.header}>
                <div style={styles.banner}><img src='../imgs/favicon.ico' style={styles.ico}/>普陀区幼儿健康与安全管理平台</div>
                <Menu className="header-menu" mode="horizontal" onClick={this.menuClickHandler.bind(this)}>
                    <SubMenu title={<span><Icon type="user" />{user.user}</span>} >
                        <Menu.Item style={styles.item} key="changepwd">修改密码</Menu.Item>
                        <Menu.Item style={styles.item} key="logout">注销</Menu.Item>
                    </SubMenu>
                    {menu}
                </Menu>
                <Modal title="修改密码" visible={this.state.changepwdvisible} onOk={this.submitChange.bind(this)} onCancel={this.hideChangeModal.bind(this)} okText="提交" cancelText="取消">
                    <Form horizontal form={this.props.form} style={{marginTop: 20}}>
                        <FormItem
                            {...formItemLayout}
                            label="请输入原密码："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...oldpasswdProps} type='password' autoComplete="off" onContextMenu={false}
                            onPaste={false} onCopy={false} onCut={false} placeholder="请输入原密码"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="请输入新密码："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...newpasswdProps} type='password' autoComplete="off" onContextMenu={false}
                            onPaste={false} onCopy={false} onCut={false} placeholder="请输入新密码"></Input>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="请重复新密码："
                            help=" "
                            validateStatus="success"
                            >
                            <Input {...confirmpasswdProps} type='password' autoComplete="off" onContextMenu={false}
                            onPaste={false} onCopy={false} onCut={false} placeholder="请重复新密码"></Input>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

Header = Form.create()(Header);

function mapStateToProps(state) {

    return {
        triggerStateChange: state.user.triggerStateChange,
        items: state.menu.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changePwd: bindActionCreators(changePwd, dispatch),
        resetTrigger: bindActionCreators(resetTrigger, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

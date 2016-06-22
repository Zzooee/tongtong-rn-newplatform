import React, {PropTypes} from 'react'
import {Form, Input, Button, Row, Col, notification, Checkbox} from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {login,logout} from '../actions/user'
import authUtils from '../common/utils/auth';

const FormItem = Form.Item;

const propTypes = {
    user: PropTypes.string,
    loggingIn: PropTypes.bool,
    loginErrors: PropTypes.string
};

const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};


var styles = {
    loginrow: {
        height: '100%',
    },
    loginform: {
        padding: '20px 0 50px 0'
    },
    indexinfo: {
        fontSize: 28,
        textAlign: 'center',
        color: '#fff',
        height: 50,
        fontWeight: 100
    },
    seperator : {
        width: "100%",
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    loginformitem: {
        width: '100%',
        marginBottom: 0

    },
    inputarea: {
        marginBottom: 32,
        borderRadius: 6,
        backgroundColor: '#fff',
        border: '1px solid rgba(0,0,0,0.5)'
    },
    inputbox: {
        borderRadius: 0,
        border: 'none',
        height: 42,
        backgroundColor: 'rgba(0,0,0,0)',
        textIndent: 8,
        fontSize: 16,
        fontWeight: 100
    },
    loginbtn: {
        fontWeight: 100,
        borderColor: '#fff',
        padding: '4px 30px 5px 30px',
        fontSize: 15,
        backgroundColor: '#fff'
    },
    resetbtn: {
        color: '#fff',
        fontWeight: 100,
        padding: '4px 30px 5px 30px',
        fontSize: 15
    },
    loginbtnarea: {
        textAlign: 'center'
    },
    banner: {
        color: '#fff',
        position: 'absolute',
        fontSize: 18,
        fontWeight: 200,
        letterSpacing: 1,
        top: 12,
        left: 24
    },
    footer: {
        textAlign: 'center',
        color: '#fff',
        position: 'absolute',
        width: '100%',
        bottom: '24px',
        fontWeight: 100
    }
}

function noop() {
    return false;
}

class Login extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount(){
        var isLoggedIn = authUtils.getToken()
        console.log('isLoggedIn=='+isLoggedIn+typeof(isLoggedIn))
        if(isLoggedIn == null){
            return
        } else {
            this.props.logout(),
            localStorage.clear(),
            window.location.reload()
        }
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.loginErrors;
        const isLoggingIn = nextProps.loggingIn;
        const user = nextProps.user

        if (error != this.props.loginErrors && error) {
            notification.error({
                message: '登录失败',
                description: error,
                duration: 2
            });
        }

        if (!isLoggingIn && !error && user) {
            notification.success({
                message: '登录成功',
                description: '欢迎 ' + user,
                duration: 2
            });

        }

        if (user) {
            this.context.router.replace('/home');
        }
    }

    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError(field)) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.props.form.getFieldsValue();
        this.props.login(data.user, data.password);
    }

    render() {

        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const {loggingIn} = this.props

        const nameProps = getFieldProps('user', {
            rules: [
                { required: true, min: 5, message: '用户名至少为 5 个字符' },
            ],
        });

        const passwdProps = getFieldProps('password', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' }
            ],
        });

        const formItemLayout = {
            wrapperCol: { span: 24 },
        };

        return (
            <div>
                <div style={styles.banner}>童桌科技</div>
                <Row className="loginpage" style={styles.loginrow} type="flex" justify="space-around" align="middle">
                    <Col span="7">
                        <div style={styles.indexinfo}>童桌用户中心管理系统</div>
                        <Form horizontal form={this.props.form}  onSubmit={this.handleSubmit.bind(this)} style={styles.loginform}>
                            <div style={styles.inputarea}>
                                <FormItem
                                    style={styles.loginformitem}
                                    {...formItemLayout}
                                    hasFeedback
                                    >
                                    <Input {...nameProps} style={styles.inputbox} placeholder="帐户"/>
                                </FormItem>
                                <div style={styles.seperator}></div>
                                <FormItem
                                    {...formItemLayout}
                                    style={styles.loginformitem}
                                    hasFeedback>
                                    <Input {...passwdProps} type='password' autoComplete="off" onContextMenu={noop}
                                            style={styles.inputbox} onPaste={noop} onCopy={noop} onCut={noop} placeholder='密码'/>
                                </FormItem>
                            </div>
                            <FormItem style={styles.loginbtnarea}>
                                <Button type="ghost"  className="loginbtn" style={styles.loginbtn} htmlType='submit' loading={loggingIn}>登录</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="ghost" className="resetbtn" style={styles.resetbtn} onClick={this.handleReset.bind(this)}>重置</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
                <div style={styles.footer}>上海童桌信息科技有限公司 @ 2015-2020</div>
            </div>
        )
    }
}

Login.contextTypes = contextTypes;
Login.propTypes = propTypes;

Login = Form.create()(Login);

function mapStateToProps(state) {
    const {user} = state;
    if (user.user) {
        return {user: user.user, loggingIn: user.loggingIn, loginErrors: ''};
    }

    return {user: null, loggingIn: user.loggingIn, loginErrors: user.loginErrors};
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch),
        logout: bindActionCreators(logout, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

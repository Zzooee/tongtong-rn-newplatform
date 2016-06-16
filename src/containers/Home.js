import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import ECharts from 'react-echarts';
import Simditor from 'simditor';
import $ from 'jquery';
import superagent from 'superagent';

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

import {fetchProfile, logout} from '../actions/user';
import {getAllMenu} from '../actions/menu'


class Home extends React.Component {
    constructor() {
        super()
    }

    showparams(params){
        console.log(params)
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.fetchProfile();
        actions.getAllMenu();
    }

    componentDidUpdate() {
        if(menuErrors) {
            this.context.router.replace('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        const isLoggingOut = nextProps.user.loggingOut
        const user = nextProps.user.user

        if (!isLoggingOut && !user) {
            notification.success({
                message: '您已注销',
                duration: 2
            });
            this.context.router.replace('/login');
        }
    }

    componentDidMount() {
        var textbox = ReactDOM.findDOMNode(this.refs.textarea);
        var editor = new Simditor({
            textarea: $(textbox),
            upload: {
              url : 'http://139.196.21.6:8080/web/peersArticle/uploadimgurlQiniu.tj', //文件上传的接口地址
              params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
              fileKey: 'imgurl', //服务器端获取文件数据的参数名
              connectionCount: 3,
              leaveConfirm: '正在上传文件'
            }
        });
    }

    render() {

        const {user, actions, location, items} = this.props;

        var styles = {
            antlayoutaside: {
                position: 'relative',
                minHeight: '100%',
                backgroundColor: '#fff'
            },
            antlayoutmain: {
                minHeight: document.body.offsetHeight - 88
            },
            antlayoutcontainer: {
                paddingBottom: 80,
                margin: '24px 16px 0 16px'
            },
            antlayoutcontent: {
                backgroundColor: '#fff',
                padding: '24px'
            }
        }

        return (
            <div style={styles.antlayoutaside}>
                <Header user={user} actions={actions}/>
                <div className='moz-layout home' style={styles.antlayoutmain}>
                    <div style={styles.antlayoutcontainer}>
                        <div style={styles.antlayoutcontent}>
                            <div>
                                <textarea ref='textarea' />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    user: PropTypes.object,
};

Home.contextTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const {user} = state;
    return {
        user: user ? user : null,
        items: state.menu.items,
        menuErrors: state.menu.menuErrors
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({fetchProfile, logout, getAllMenu}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix, Row, Col,notification} from 'antd';

import NavPath from '../components/NavPath'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {fetchProfile, logout} from '../actions/user';
import {getAllMenu, updateNavPath} from '../actions/menu'

import 'antd/dist/antd.less';
import 'simditor/styles/simditor.css';
import '../views/main.less';

class Blank extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {actions, menuErrors} = this.props;
        actions.fetchProfile();
        actions.getAllMenu();
        if (menuErrors !== null){
            console.log('menuErrors2==='+menuErrors)
            this.context.router.replace('/login');

            notification.error({
                message: '加载遇到问题',
                description: menuErrors
            });
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

    componentDidUpdate() {
        const {actions} = this.props;
        var tmparr = this.props.items.map((item) => {
            return (
                item.childMenus.map((node) => {
                    return (
                        {routeUrl: node.routeUrl, menupath: 'menu'+node.id, subpath: 'sub'+item.id}
                    )
                })
            )
        })

        var cleanarr = []
        for(let i=0 ; i < tmparr.length ; i++){
            for (let j=0 ; j < tmparr[i].length; j++){
                cleanarr.push(tmparr[i][j])
            }
        }

        var tmppath = cleanarr.filter(item => item.routeUrl == this.props.location.pathname)
        if(tmppath[0]){
            actions.updateNavPath([tmppath[0].menupath,tmppath[0].subpath], tmppath[0].menupath);
        }

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
                <div className='moz-layout blank' style={styles.antlayoutmain}>
                    <NavPath />
                    <div style={styles.antlayoutcontainer}>
                        <div style={styles.antlayoutcontent}>
                            {this.props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

Blank.propTypes = {
    user: PropTypes.object,
    children: PropTypes.node.isRequired,
};

Blank.contextTypes = {
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
    return {actions: bindActionCreators({fetchProfile, logout, getAllMenu, updateNavPath}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(Blank);

import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix, Row, Col,notification} from 'antd';

import NavPath from '../components/NavPath'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import {fetchProfile, logout} from '../actions/user';
import {getAllMenu, updateNavPath, resetNavPath} from '../actions/menu'

import 'antd/dist/antd.less';
import 'simditor/styles/simditor.css';
import '../views/main.less';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.fetchProfile();
        actions.getAllMenu();
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
        const {actions, menuErrors} = this.props;
        if (menuErrors !== null){
            this.context.router.replace('/login');

            notification.error({
                message: '加载遇到问题',
                description: menuErrors
            });
        }
        var tmparr = this.props.items.map((item) => {
            return (
                item.childMenus.map((node) => {
                    return (
                        node.childMenus.map((third) => {
                            if (third.childMenus.length > 0) {
                                return (
                                    third.childMenus.map((fourth) => {
                                      return (
                                          {routeUrl: fourth.routeUrl, menupath: 'menu'+node.id, subpath: 'sub'+item.id, thirdpath: 'thd'+third.id, fourthpath: 'frh'+fourth.id}
                                      )
                                    })
                                )
                            } else {
                                return (
                                    {routeUrl: third.routeUrl, menupath: 'menu'+node.id, subpath: 'sub'+item.id, thirdpath: 'thd'+third.id}
                                )
                            }
                        })
                    )
                })
            )
        })

        var cleanarr = []
        for(let i=0 ; i < tmparr.length ; i++){
            for (let j=0 ; j < tmparr[i].length; j++){
                for (let k=0 ; k < tmparr[i][j].length; k++) {
                        cleanarr.push(tmparr[i][j][k])
                }
            }
        }

        var tmppath = cleanarr.filter(item => item.routeUrl == this.props.location.pathname)
        if (tmppath[0]){
            actions.updateNavPath([tmppath[0].thirdpath,tmppath[0].menupath,tmppath[0].subpath], tmppath[0].thirdpath);
        } else {
            var cleanerarr = []
            for (let i=0; i < cleanarr.length; i++) {
                for (let j=0; j< cleanarr[i].length; j++) {
                    cleanerarr.push(cleanarr[i][j])
                }
            }
            var tmppath2 = cleanerarr.filter(item => item.routeUrl == this.props.location.pathname)
            if (tmppath2[0]) {
                actions.updateNavPath([tmppath2[0].fourthpath,tmppath2[0].thirdpath,tmppath2[0].menupath,tmppath2[0].subpath], tmppath2[0].fourthpath);
            }
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
                marginLeft: 200,
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
                <Sidebar location={location} items={items}/>
                <div className='moz-layout' style={styles.antlayoutmain}>
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

App.propTypes = {
    user: PropTypes.object,
    children: PropTypes.node.isRequired,
};

App.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

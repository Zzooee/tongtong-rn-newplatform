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
import '../main.less';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {actions} = this.props;
        actions.fetchProfile();
        actions.getAllMenu()
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
        items: state.menu.items
    };
};

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators({fetchProfile, logout, getAllMenu}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

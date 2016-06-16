import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Menu, Icon, notification} from 'antd'
import {updateNavPath} from '../actions/menu'
import {Link} from 'react-router';

const SubMenu = Menu.SubMenu

var styles = {
    sider: {
        width: 200,
        backgroundColor: '#394555',
        position: 'absolute',
        overflow: 'auto',
        marginBottom: '-61px',
        height: '100%',
        paddingTop: 16
    }
}

const defaultProps = {
    items: [],
    currentIndex: 0
}

const propTypes = {
    items: PropTypes.array,
    currentIndex: PropTypes.number
}

const contextTypes = {
    router: PropTypes.object
};


class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        const {menuErrors} = this.props;
        if (menuErrors !== null){
            console.log('menuErrors2==='+menuErrors)
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
            this.props.updateNavPath([tmppath[0].menupath,tmppath[0].subpath], tmppath[0].menupath);
        }

    }

    componentWillMount() {
        const {menuErrors, items} = this.props;
        if (menuErrors !== null){
            console.log('menuErrors2==='+menuErrors)
            this.context.router.replace('/login');

            notification.error({
                message: '加载遇到问题',
                description: menuErrors
            });
        }
    }

    menuClickHandle(item) {
        this.props.updateNavPath(item.keyPath, item.key);
    }

    render() {
        const {items} = this.props
        var menupath = ''
        var subpath = ''

        if(this.props.location.pathname === "/AdminList"){
            subpath = 'sub1',
            menupath = 'menu3'
        } else if (this.props.location.pathname === "/ResourceList"){
            subpath = 'sub1',
            menupath = 'menu4'
        } else if (this.props.location.pathname === "/RoleList"){
            subpath = 'sub1',
            menupath = 'menu5'
        } else if (this.props.location.pathname === "/bizAllChildList"){
            subpath = 'sub45',
            menupath = 'menu46'
        } else if (this.props.location.pathname === "/bizServerList"){
            subpath = 'sub45',
            menupath = 'menu47'
        } else if (this.props.location.pathname === "/ArticleList"){
            subpath = 'sub2',
            menupath = 'menu14'
        } else if (this.props.location.pathname === "/WineusList"){
            subpath = 'sub2',
            menupath = 'menu15'
        } else if (this.props.location.pathname === "/UserList"){
            subpath = 'sub16',
            menupath = 'menu18'
        } else if (this.props.location.pathname === "/BoundedChild"){
            subpath = 'sub16',
            menupath = 'menu48'
        } else if (this.props.location.pathname === "/PointsUserList"){
            subpath = 'sub40',
            menupath = 'menu42'
        } else if (this.props.location.pathname === "/PointsTypeList"){
            subpath = 'sub40',
            menupath = 'menu43'
        } else if (this.props.location.pathname === "/bizAllTeacherList"){
            subpath = 'sub45',
            menupath = 'menu50'
        } else if (this.props.location.pathname === "/StatList"){
            subpath = 'sub51',
            menupath = 'menu52'
        } else if (this.props.location.pathname === "/OrganizationList"){
            subpath = 'sub1',
            menupath = 'menu59'
        }

        // var availItems = [];
        // for (var i=0;i<items.length;i++)
        // {
        //     if(items[i].available) {
        //         availItems.push(items[i])
        //     }
        // }

        const menu = this.props.items.map((item) => {
            return (
                <SubMenu
                    key={'sub'+item.id}
                    title={<span><Icon type={item.iconType} />{item.name}</span>}
                >
                    {item.childMenus.map((node) => {
                        return (
                            <Menu.Item key={'menu'+node.id}>
                                <Link to={node.routeUrl}><Icon type={node.iconType} />{node.name}</Link>
                            </Menu.Item>
                        )
                    })}
                </SubMenu>
            )
        });

        return (
            <aside style={styles.sider} className="side-bar">
                <Menu
                    mode="inline" theme="dark"
                    onClick={this.menuClickHandle.bind(this)}
                    defaultSelectedKeys={[menupath]}
                    defaultOpenKeys={[subpath]}
                >
                    {menu}
                </Menu>
            </aside>
        )
    }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
Sidebar.contextTypes = contextTypes;

function mapStateToProps(state) {

    return {
        menuErrors: state.menu.menuErrors,
        currentIndex: state.menu.currentIndex,
        items: state.menu.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateNavPath: bindActionCreators(updateNavPath, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

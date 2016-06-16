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

    componentDidUpdate() {

    }

    menuClickHandle(item) {
        this.props.updateNavPath(item.keyPath, item.key);
    }

    render() {
        const {items} = this.props
        var menupath = ''
        var subpath = ''
        var menuhead = ''

        if (this.props.location.pathname === "/level2/level4"){
            subpath = 'thd62',
            menupath = 'frh63',
            menuhead = 60
        } else if (this.props.location.pathname === "/level22/level3"){
            subpath = 'thd232',
            menupath = '',
            menuhead = 187
        } else if (this.props.location.pathname === "/level2/level32"){
            subpath = 'thd233',
            menupath = '',
            menuhead = 60
        }

        // var availItems = [];
        // for (var i=0;i<items.length;i++)
        // {
        //     if(items[i].available) {
        //         availItems.push(items[i])
        //     }
        // }

        var menuset =[]
        for (let i=0; i<this.props.items.length; i++) {
            var tmparrrr = this.props.items[i].childMenus.filter(node => node.id == menuhead)
            menuset.push(tmparrrr[0])
            var menu = menuset[0].childMenus.map((node) => {
                if (node.childMenus.length == 0) {
                    return (
                        <Menu.Item key={'thd'+node.id}>
                            <Link to={node.routeUrl}><Icon type={node.iconType} />{node.name}</Link>
                        </Menu.Item>
                    )
                } else {
                    return (
                        <SubMenu
                            key={'thd'+node.id}
                            title={<span><Icon type={node.iconType} />{node.name}</span>}
                        >
                            {node.childMenus.map((edon) => {
                                return (
                                    <Menu.Item key={'frh'+edon.id}>
                                        <Link to={edon.routeUrl}><Icon type={edon.iconType} />{edon.name}</Link>
                                    </Menu.Item>
                                )
                            })}
                        </SubMenu>
                    )
                }
            })
        }

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

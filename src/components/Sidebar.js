import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Menu, Icon, notification} from 'antd'
import {updateNavPath,getAllMenu} from '../actions/menu'
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
        this.props.getAllMenu()
        this.setState({
            subpath : [''],
            menupath : [''],
            menuhead : 0,
            location: this.props.location.pathname,
            count: 0
        })
    }

    componentDidUpdate() {
        if(this.state.location != this.props.location.pathname || this.state.count == 0) {
            var tmparr = this.props.items.map((item) => {
                return (
                    item.childMenus.map((node) => {
                        return (
                            node.childMenus.map((third) => {
                                if (third.childMenus.length > 0) {
                                    return (
                                        third.childMenus.map((fourth) => {
                                          return (
                                              {routeUrl: fourth.routeUrl, menupath: node.id, subpath: 'sub'+item.id, thirdpath: 'thd'+third.id, fourthpath: 'frh'+fourth.id}
                                          )
                                        })
                                    )
                                } else {
                                    return (
                                        {routeUrl: third.routeUrl, menupath: node.id, subpath: 'sub'+item.id, thirdpath: 'thd'+third.id}
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
                this.setState({
                    subpath : [tmppath[0].thirdpath],
                    menupath : [tmppath[0].thirdpath],
                    menuhead : tmppath[0].menupath,
                    location: this.props.location.pathname,
                    count: 1
                })
            } else {
                var cleanerarr = []
                for (let i=0; i < cleanarr.length; i++) {
                    for (let j=0; j< cleanarr[i].length; j++) {
                        cleanerarr.push(cleanarr[i][j])
                    }
                }
                var tmppath2 = cleanerarr.filter(item => item.routeUrl == this.props.location.pathname)
                if (tmppath2[0]) {
                    this.setState({
                        subpath : [tmppath2[0].thirdpath],
                        menupath : [tmppath2[0].fourthpath],
                        menuhead : tmppath2[0].menupath,
                        location: this.props.location.pathname,
                        count: 1
                    })
                }
            }
            console.log(tmppath[0] ? JSON.stringify(tmppath[0]) : JSON.stringify(tmppath2[0]));
        }
    }

    menuClickHandle(item) {
        this.props.updateNavPath(item.keyPath, item.key);
        this.setState({
              subpath: [item.keyPath[0]],
              menupath: [item.key]
        })
    }

    titleClickHandle(eventKey, domEvent) {
        console.log(eventKey.key);
        this.setState({
              subpath: [eventKey.key]
        })
    }

    render() {
        const {items} = this.props
        var menupath = ''
        var subpath = ''
        var menuhead = ''

        // var availItems = [];
        // for (var i=0;i<items.length;i++)
        // {
        //     if(items[i].available) {
        //         availItems.push(items[i])
        //     }
        // }

        var menuset =[]
        for (let i=0; i<this.props.items.length; i++) {
            var tmparrrr = this.props.items[i].childMenus.filter(node => node.id == this.state.menuhead)
            menuset.push(tmparrrr[0])
            if(menuset[0]){
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
                                onTitleClick={this.titleClickHandle.bind(this)}
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
        }

        return (
            <aside style={styles.sider} className="side-bar">
                <Menu
                    mode="inline" theme="dark"
                    onClick={this.menuClickHandle.bind(this)}
                    selectedKeys={this.state.menupath}
                    openKeys={this.state.subpath}
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
        currentIndex: state.menu.currentIndex,
        items: state.menu.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateNavPath: bindActionCreators(updateNavPath, dispatch),
        getAllMenu: bindActionCreators(getAllMenu, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

import React, {PropTypes} from 'react'
import {Breadcrumb} from 'antd'
import {connect} from 'react-redux'

var styles={
    margin: '28px 24px -17px'
}

class NavPath extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {navpath} = this.props
        const bread = navpath.map((item)=> {
            return (
                <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
            )
        })
        return (
            <div style={styles}>
                <Breadcrumb >
                    <Breadcrumb.Item key='bc-0'>
                        <a href="/home" >首页</a>
                    </Breadcrumb.Item>
                    {bread}
                </Breadcrumb>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        navpath: state.menu.navpath
    }
}

export default connect(mapStateToProps)(NavPath)

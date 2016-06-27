import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames';
import {Form} from 'antd'
const FormItem = Form.Item;

class KinderStatsHealth extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                KinderStatsHealth
            </div>
        )
    }
}

KinderStatsHealth = Form.create()(KinderStatsHealth);

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KinderStatsHealth)

import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames';
import {Form} from 'antd'
const FormItem = Form.Item;

class KinderMgtDept extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                KinderMgtDept
            </div>
        )
    }
}

KinderMgtDept = Form.create()(KinderMgtDept);

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KinderMgtDept)

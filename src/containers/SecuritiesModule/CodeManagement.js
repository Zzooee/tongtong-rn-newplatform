import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames';
import {Form} from 'antd'
const FormItem = Form.Item;

class SecuritiesCodeManagement extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                SecuritiesCodeManagement
            </div>
        )
    }
}

SecuritiesCodeManagement = Form.create()(SecuritiesCodeManagement);

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecuritiesCodeManagement)

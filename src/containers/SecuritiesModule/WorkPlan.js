import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames';
import {Form} from 'antd'
const FormItem = Form.Item;

class SecuritiesWorkPlan extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                SecuritiesWorkPlan
            </div>
        )
    }
}

SecuritiesWorkPlan = Form.create()(SecuritiesWorkPlan);

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecuritiesWorkPlan)

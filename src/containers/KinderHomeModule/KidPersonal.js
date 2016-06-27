import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames';
import {Form} from 'antd'
const FormItem = Form.Item;

class KidPersonal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                KidPersonal
            </div>
        )
    }
}

KidPersonal = Form.create()(KidPersonal);

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(KidPersonal)

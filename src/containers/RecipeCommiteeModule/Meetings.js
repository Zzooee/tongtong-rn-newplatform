import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames';
import {Form} from 'antd'
const FormItem = Form.Item;

class RecipeCommiteeMeetings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                RecipeCommiteeMeetings
            </div>
        )
    }
}

RecipeCommiteeMeetings = Form.create()(RecipeCommiteeMeetings);

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCommiteeMeetings)

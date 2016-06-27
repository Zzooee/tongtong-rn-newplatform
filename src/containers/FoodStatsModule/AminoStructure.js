import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classNames from 'classnames';
import {Form} from 'antd'
const FormItem = Form.Item;

class FoodStatsAmino extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                FoodStatsAmino
            </div>
        )
    }
}

FoodStatsAmino = Form.create()(FoodStatsAmino);

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodStatsAmino)

import React from 'react'


var styles = {
    panelbox: {
        marginBottom: 20
    },
    ant_collapse_header: {
        padding: '10px'
    }
}

export default class PanelBox extends React.Component {
    constructor() {
        super()
    }

    render() {

        return (
            <div className="ant-collapse" style={styles.panelbox}>
                <div>
                    <div style={styles.ant_collapse_header}>
                        <span>{this.props.title}</span>
                    </div>
                    <div className="ant-collapse-content ant-collapse-content-active">
                        <div className="ant-collapse-content-box">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

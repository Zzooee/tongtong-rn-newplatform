import React from 'react'

var styles = {
    height: 52,
    lineHeight: '52px',
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    backgroundColor: '#fff',
    width: document.body.offsetWidth - 240,
    position: 'absolute',
    bottom: 0
}

export default class Footer extends React.Component {
    constructor() {
        super()
    }

    render() {

        return (
            <div style={styles} className='footer'>
                上海童桌信息科技有限公司 @ 2015-2020
            </div>
        )
    }
}

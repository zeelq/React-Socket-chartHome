import React ,{Component} from 'react'


import '../../style/common/reset.stylus'
import '../../style/common/common.stylus'
import '../../style/common/icon.stylus'
import '../../style/common/animation.stylus'

import {writeEmojiStyle} from '../../libs/utils/funny'


export default class App extends Component {
    constructor(props) {
        super(props);
        this.__init();
    }

    __init() {
        writeEmojiStyle();
    }

    componentDidMount(){

    }

    render() {
        const {}=this.props;
        return (<div>
            {this.props.children}
        </div>)
    }
}
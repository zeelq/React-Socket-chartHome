import React ,{Component} from 'react'
import {Link} from 'react-router'

import Header from '../Header'
import Chat from '../Chat'
import Comment from '../Comment'

export default class Index extends Component {
    constructor() {
        super()
    }

    render() {
        const {}=this.props;
        return (
            <div className="layout-wrap">
                <Header/>
                <Chat/>
                <Comment/>
            </div>
        )
    }
}
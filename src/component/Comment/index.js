import React ,{Component} from 'react'

import Header from '../Header'

import './comment.stylus'

export default class Comment extends Component {
    constructor() {
        super()
    }

    render() {
        const {}=this.props;
        return (
            <div className="chat-comment-body">
                <form className="sendMessage" action="javascript:;">
                    <input type="text" required maxlength="100" placeholder="@ to mention, Enter to reply"
                           autoComplete="off"/>
                    <button type="submit" title="Send Your Message">Send</button>
                </form>
            </div>
        )
    }
}
import React ,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/chat.view.action'

import './Chat.stylus'
import ChartClient from '../../libs/client'

const mapStateToProps = state=> {
    return state.ChatView.toJS();
};

const mapDispatchToProps = dispatch=> {
    return {
        actions: bindActionCreators(Object.assign(actions), dispatch)
    }
};

@connect(mapStateToProps, mapDispatchToProps)

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    static PropTypes = {
        chatList: PropTypes.array.isRequired
    };

    componentDidMount() {
        const {actions}=this.props;
        const Chat = ChartClient(actions);
        const ChatInstance = new Chat();
    }

    render() {
        const {chatList}=this.props;
        return (
            <div className="chat">
                <ul className="chat-list">
                    {chatList.map((item, i)=>
                        <li className={`chat-list-item chat-${item.chatSenderType} animation fadeIn clearfix`} key={i}>
                        <span className="chat-avatar">
                        <img className="chat-avatar-img" src={item.userInfo.userAvatar}
                             alt="User Avatar"/>
                        </span>
                            <div className="chat-body clearfix">
                                <div className="chat-header">
                                    <strong className="chat-name">{item.userInfo.userName}</strong>
                                    <small className="chat-time">
                                        <i className="fa fa-clock-o" data-time={item.time.date}></i>
                                        {item.time.dataFormat}
                                    </small>
                                </div>
                                <p className="chat-detail">{item.detail}</p>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
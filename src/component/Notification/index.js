'use strict';
import React ,{Component,PropTypes }from 'react'
import ReactDOM from 'react-dom'

import './Notification.stylus'

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static PropTypes = {
        type: PropTypes.string.isRequired,
        msg: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        callBack: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {

    }

    render() {
        const {type,msg}=this.props;
        return (
            <div className="notification-wrapper">
                <span>
                     <div className="notification-body slideInDown animation">
                         <i className={`icon icon-${type} notification-icon`}></i>
                         <div className="notification-content">
                             <p className="notification-title">{msg.title}</p>
                             <div className="notification-detail">{msg.detail}</div>
                         </div>
                     </div>
                </span>
            </div>
        )
    }
}

Notification.show = (type, msg, cb, duration)=> {
    duration = duration || 1500;
    const props = {type, msg, cb, duration};
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<Notification {...props} />, div);

    setTimeout(()=> {

        div.addEventListener('animationend', ()=> {
            div.parentNode.removeChild(div);
            ReactDOM.unmountComponentAtNode(div);
            props.cb && props.cb();
        }, false);

        div.querySelector('.notification-body').classList.add('slideOutDown');

        props.callback && props.callback();
    }, props.duration);

};

export default {
    info(msg, cb, duration){
        let title=msg.title;
        let detail =msg.detail;
        if(typeof msg !== "object"){
           detail=msg;
            title="Information";
        }

        return Notification.show("info", {title,detail}, cb, duration);
    },
    success(msg, cb, duration){
        let title=msg.title;
        let detail =msg.detail;
        if(typeof msg !== "object"){
            detail=msg;
            title="Success";
        }
        return Notification.show("success", {title,detail}, cb, duration);
    },
    err(msg, cb, duration){
        let title=msg.title;
        let detail =msg.detail;
        if(typeof msg !== "object"){
            detail=msg;
            title="Error";
        }
        return Notification.show("error", {title,detail}, cb, duration);
    }
};
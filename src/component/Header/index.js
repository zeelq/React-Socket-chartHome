import React ,{Component,PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/header.action'
import './header.stylus'

const mapStateToProps = state=> {
    return state.Header.toJS();
};

const mapDispatchToProps = dispatch=> {
    return {
        actions: bindActionCreators(Object.assign(actions), dispatch)
    }
};

@connect(mapStateToProps, mapDispatchToProps)


export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    static PropTypes = {
        user:PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {user}=this.props;
        //<span>{`当前在线人数:${user.online}`}</span>
        //&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //<span>{`游客:${user.tourist}`}</span>
        return (
            <header className="App_header">
                <nav className="App_header_container">
                    <div className="App_header_body container">
                        <section className="App_nav_description" data-page="Socket Chat Home"></section>
                    </div>
                </nav>
            </header>
        )
    }
}

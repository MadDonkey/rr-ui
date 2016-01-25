"use strict";
var React = require('react'),
    connect = require('react-redux').connect,

    TimerButton = require('../../component/timerbutton/timerbutton.jsx'),

    userActions = require('../../action/user.js');


var Application = React.createClass({
    displayName: "Application",
    render: function(){
        var {user,userLogin,userLogout} = this.props;
        return (
            <div className="application">
                <TimerButton countDownFrom="30"><span data-countdown></span>S</TimerButton>
            </div>
        );
    }
});

module.exports = connect(state=>state,userActions)(Application);

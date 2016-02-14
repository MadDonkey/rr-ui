"use strict";
var React = require('react'),
    connect = require('react-redux').connect,

    TimerButton = require('../../component/timerbutton/timerbutton.jsx'),
    Grid = require('../../component/grid/grid.jsx'),

    userActions = require('../../action/user.js');


var Application = React.createClass({
    displayName: "Application",
    render: function(){
        var {user,userLogin,userLogout} = this.props;
        return (
            <div className="application">
                <TimerButton countDownFrom={30} stateText="点击获取验证码" countDownText="请等待 " unitText=" 秒后重试" autoStart={true} />
                <Grid
                gridColumn={[{name:'name',text:'Name',isActive:true},{name:'star',text:'Star',isActive:true}]}
                gridList={[{id:1,name:'react',star: 9999,type:'javascript'},{id:2,name:'django',star:4956,type:'javascript'},{id:3,name:'rrui',star:12,type:'javascript'}]}
                sortBy='star|ASC'
                filterBy={(row)=>row.star > 10}
                />
            </div>
        );
    }
});

module.exports = connect(state=>state,userActions)(Application);

"use strict";
var _ = require('lodash'),
    React = require('react'),
    connect = require('react-redux').connect,

    TimerButton = require('../../component/timerbutton/timerbutton.jsx'),
    Grid = require('../../component/grid/grid.jsx'),

    actions = _.assign({},require('../../action/user.js'),require('../../action/project.js'));

var Application = React.createClass({
    displayName: "Application",
    render: function(){
        console.log(this.props);
        var {project} = this.props;
        return (
            <div className="application">
                <TimerButton countDownFrom={30} stateText="点击获取验证码" countDownText="请等待 " unitText=" 秒后重试" autoStart={false} />
                <Grid gridColumn={project.column} gridList={project.list} sortBy={project.sortBy} filterBy={(row)=>row.star > 12} />
                <button onClick={(evt)=>this.props.doProjectSort('star|ASC')}>Sort</button>
            </div>
        );
    }
});

module.exports = connect(state=>state,actions)(Application);

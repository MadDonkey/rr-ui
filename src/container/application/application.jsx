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
                <h2>TimerButton</h2>
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s6">
                      <input placeholder="请输入验证码" type="text" className="validate"  />
                    </div>
                    <div className="input-field col s6">
                      <a className="waves-effect waves-light btn">
                        <TimerButton countDownFrom={30} style={{background:'none',border:'none'}} stateText="点击获取验证码" countDownText="请等待 " unitText=" 秒后重试" autoStart={false} />
                        <i className="material-icons right"></i>
                      </a>
                    </div>
                  </div>
                </form>
                <h2>Grid  + Dropdown Selector </h2>
                <Grid className="bordered highlight" gridColumn={project.column} gridList={project.list} sortBy={project.sortBy} filterBy={(row)=>row.star > 10} />
                <button onClick={(evt)=>this.props.doProjectSort('star|ASC')}>Sort</button>
            </div>
        );
    }
});

module.exports = connect(state=>state,actions)(Application);

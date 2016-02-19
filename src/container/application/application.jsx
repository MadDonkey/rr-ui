"use strict";
var _ = require('lodash'),
    React = require('react'),
    connect = require('react-redux').connect,

    TimerButton = require('../../component/timerbutton/timerbutton.jsx'),
    Grid = require('../../component/grid/grid.jsx'),
    Dropdown = require('../../component/selector/dropdown.jsx'),
    Selector = require('../../component/selector/selector.jsx'),

    actions = _.assign({},require('../../action/user.js'),require('../../action/project.js'));

var Application = React.createClass({
    displayName: "Application",
    render: function(){
        var {project,doProjectSort,doProjectColumnActive} = this.props;
        return (
            <div className="application">
                <h2>TimerButton</h2>
                <div className="card">
                    <div className="card-content">
                        <form>
                          <div className="row">
                            <div className="input-field col s6">
                              <input placeholder="请输入验证码" type="text" className="validate"  />
                            </div>
                            <div className="input-field col s6">
                              <TimerButton className="waves-effect waves-light btn" countDownFrom={30} stateText="点击获取验证码" countDownText="请等待 " unitText=" 秒后重试" autoStart={false} />
                            </div>
                          </div>
                        </form>
                    </div>
                </div>
                <h2>Grid  + Dropdown Selector </h2>
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <div className="col s4">
                                <label htmlFor="">SortBy: </label>
                                <Dropdown className="dropdown" selections={project.column} activeField="sort" labelField="label" selectionClickHandle={doProjectSort} />
                            </div>
                            <div className="col s8">
                                <label htmlFor="">Column: </label>
                                <Selector className="selector" selections={project.column} activeField="isActive" labelField="label" selectionClickHandle={doProjectColumnActive} />
                            </div>
                        </div>
                        <Grid className="grid bordered highlight" gridColumn={project.column} gridList={project.list} sortBy={project.sortBy} filterBy={(row)=>row.star > 10} headClickHandle={doProjectSort} headRightClickHandle={doProjectColumnActive} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = connect(state=>state,actions)(Application);

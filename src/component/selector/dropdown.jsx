var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
    displayName: 'Dropdown',
    PropTypes: {
        selections: React.PropTypes.array.isRequired,
        activeField: React.PropTypes.string,
        labelField: React.PropTypes.string,
        selectionChangeHandle: React.PropTypes.func
    },
    getDefaultProps: function () {
        return {
            activeField: 'active',
            labelField: 'label'
        };
    },
    getInitialState: function(){
        return {
            drop:false
        };
    },
    _onLabelClick: function(evt){
        this.setState({drop:!this.state.drop});
    },
    _bindItemClickHandle: function(selection) {
        var {selectionChangeHandle} = this.props;

        if (selectionChangeHandle) {
            return evt=>selectionChangeHandle(selection);
        }else {
            return evt=>false;
        }
    },
    _buildLabel: function (selections,activeField,labelField) {
        var activeItem = _.find(selections,(selection)=>selection[activeField]);

        return (
            <a className="label" onClick={this._onLabelClick}>{activeItem[labelField]}</a>
        );

    },
    _buildSelectionList: function(selections, activeField, labelField) {
        return selections.map((selection)=>{
            return (
                <a key={selection[labelField]} className={classnames({'selection':true, ['active-' + selection[activeField]]:selection[activeField]})} onClick={this._bindItemClickHandle(selection)} >{selection[labelField]}</a>
            );
        });
    },
    render: function(){
        var {selections,activeField,labelField,...originProps} = this.props;
        var {drop} = this.state;
        var labelEle = this._buildLabel(selections, activeField, labelField);
        var dropELe = drop? <div className="drop">{this._buildSelectionList(selections,activeField,labelField)}</div> : false;
        return (
            <div style={{position:'relative'}} {...originProps}>
                {labelEle}
                {dropELe}
            </div>
        );
    }
});

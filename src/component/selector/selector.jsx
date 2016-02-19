var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
    displayName: 'Selector',
    PropTypes: {
        selections: React.PropTypes.array.isRequired,
        activeField: React.PropTypes.string,
        labelField: React.PropTypes.string,

    },
    getDefaultProps: function () {
        return {
            activeField: 'active',
            labelField: 'label'
        };
    },
    _bindItemClickHandle: function(selection) {
        var {selectionClickHandle} = this.props;

        if (selectionClickHandle) {
            return evt=>selectionClickHandle(selection);
        }else {
            return evt=>false;
        }
    },
    render: function() {
        let {selections, activeField, labelField, ...originProps} = this.props;


        return (
            <div className="selector">
                {selections.map(selection=>{
                    return (
                        <a key={selection[labelField]} className={classnames({ active: selection[activeField] })} onClick={this._bindItemClickHandle(selection)}>{ selection[labelField] }</a>
                        );
                    }
                )}
            </div>)
        ;
    }
});

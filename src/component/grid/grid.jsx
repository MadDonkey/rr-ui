var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
    propTypes: {
        gridList: React.propTypes.array.isRequired,
        gridColumn: React.propTypes.array,
        headClickHandle: React.propTypes.func,
        headDBClickHandle: React.propTypes.func,
    },
    displayName: 'Grid',
    _buildHeads: function(gridColumn,gridList){
        gridColumn = gridColumn || Object.keys(gridList[0]);

        return gridColumn.map((head)=>{
            if(typeof(head) === 'object')
                return (<th className={classnames({['sort-${head.sort}']: head.sort })} onClick={this.onClick} onDoubleClick={this.onDoubleClick}>{head.isActive? head : ""}</th>);
            else
                return (<th  onClick={this.onClick} onDoubleClick={this.onDoubleClick}>head</th>);
        });

    },
    _buildBody: function(gridList){

    },
    render: function(){
        var {gridList, gridColumn, ...originProps} = this.props;
        var theads = this._buildHeads(gridColumn,gridList);
        return (
                <table {...originProps}>
                    <thead>{theads}</thead>
                    <tbody></tbody>
                    <tfoot></tfoot>
                </table>
        );
    }
});

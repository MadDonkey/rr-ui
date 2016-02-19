var _ = require('lodash');
var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
    propTypes: {
        gridList: React.PropTypes.array.isRequired,
        gridColumn: React.PropTypes.array,
        filterBy: React.PropTypes.func,
        range: React.PropTypes.array,
        headClickHandle: React.PropTypes.func,
        headRightClickHandle: React.PropTypes.func,
    },
    displayName: 'Grid',
    componentDidMount: function(){

    },
    _bindHeadClickHandle: function(column){
        var {headClickHandle} = this.props;
        return headClickHandle? evt=>headClickHandle(column,evt) : evt=>false;
    },
    _bindHeadRightClickHandle: function(column){
        var {headRightClickHandle} = this.props;
        return headRightClickHandle? evt=>{evt.preventDefault();return headRightClickHandle(column,evt)} : evt=>false;
    },
    _buildHeads: function(gridColumn,gridList){
        gridColumn = this._ensureColumn(gridColumn,gridList);
        return gridColumn.map((column)=>{
            return (<th key={column.key? column.key : column.dataIdx} className={classnames({['sort-' + column.sort]: column.sort, active: column.isActive })}>{column.isActive? <a onClick={this._bindHeadClickHandle(column)} onContextMenu={this._bindHeadRightClickHandle(column)}>{column.label}</a> : ""}</th>);
        });

    },
    _buildRows: function(gridColumn,gridList,filterBy,range){
        gridColumn = this._ensureColumn(gridColumn,gridList);
        gridList = gridList.slice(); // Make the sort and filter on a copy of original grid list.
        // do sorting from here
        var sortByColumn = _.find(gridColumn,(column)=>column.sort);
        if (sortByColumn) {
            var sortByFunciton = typeof(sortByColumn.sort) === 'function'? sortByColumn.sort : (a,b)=>{
                var {sort,dataIdx} = sortByColumn;
                if (sort === 'ASC') {
                    if (a[dataIdx] > b[dataIdx]) {
                        return 1;
                    }else if (a[dataIdx] > b[dataIdx]) {
                        return 0;
                    }else{
                        return -1;
                    }
                }else {
                    if (a[dataIdx] > b[dataIdx]) {
                        return -1;
                    }else if (a[dataIdx] > b[dataIdx]) {
                        return 0;
                    }else{
                        return 1;
                    }
                }
            };

            gridList.sort(sortByFunciton);
        }

        // do filter from here
        if (filterBy) {
            gridList = gridList.filter(filterBy);
        }

        // do pagenation
        if (range) {
            gridList = gridList.slice(range[0],range[1]);
        }

        //build final react elements from here
        return gridList.map((row)=>{
            return(
                <tr key={row.key? row.key: row.id}>
                    {gridColumn.map(column=>(<td key={column.dataIdx} className={classnames({active: column.isActive})}>{column.isActive? row[column.dataIdx] : ''}</td>))}
                </tr>
            );
        });
    },
    _ensureColumn: function(gridColumn,gridList){
         return gridColumn || Object.keys(gridList[0]).map(column=>({dataIdx:column, label:column.replace(/(\w)(.*)/,(x,y,z)=>y.toUpperCase() + z), isActive:true}));
    },
    render: function(){
        var {gridList, gridColumn, filterBy, range, ...originProps} = this.props;
        var theads = this._buildHeads(gridColumn,gridList);
        var trows = this._buildRows(gridColumn,gridList,filterBy,range);
        return (
                <table {...originProps}>
                    <thead><tr>{theads}</tr></thead>
                    <tbody>{trows}</tbody>
                    <tfoot></tfoot>
                </table>
        );
    }
});

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
        headDBClickHandle: React.PropTypes.func,
    },
    displayName: 'Grid',
    componentDidMount: function(){

    },
    _bindHeadClickHandle: function(column){
        var {headClickHandle} = this.props;
        return headClickHandle? evt=>headClickHandle(column,evt) : evt=>false;
    },
    _bindHeadDBClickHandle: function(column){
        var {headDBClickHandle} = this.props;
        return headDBClickHandle? evt=>headDBClickHandle(column,evt) : evt=>false;
    },
    _buildHeads: function(gridColumn,gridList){
        gridColumn = gridColumn || Object.keys(gridList[0]);
        return gridColumn.map((column)=>{
            if(typeof(column) === 'object')
                return (<th key={column.name} className={classnames({['sort-' + column.sort]: column.sort, active: column.isActive })}>{column.isActive? <a onClick={this._bindHeadClickHandle(column)} onDoubleClick={this._bindHeadDBClickHandle(column)}>{column.text}</a> : ""}</th>);
            else
                return (<th key={column}><a onClick={this._bindHeadClickHandle(column)} onDoubleClick={this._bindHeadDBClickHandle(column)}>{column.text}</a></th>);
        });

    },
    _buildRows: function(gridColumn,gridList,filterBy,range){
        gridColumn = gridColumn || Object.keys(gridList[0]);
        gridList = gridList.slice(); // Make the sort and filter on a copy of original grid list.
        // do sorting from here
        var sortByColumn = _.find(gridColumn,(column)=>column.sort);
        if (sortByColumn) {
            var sortByFunciton = typeof(sortByColumn.sort) === 'function'? sortByColumn.sort : (a,b)=>{
                var {sort,name} = sortByColumn;
                if (sort === 'ASC') {
                    if (a[name] > b[name]) {
                        return 1;
                    }else if (a[name] > b[name]) {
                        return 0;
                    }else{
                        return -1;
                    }
                }else {
                    if (a[name] > b[name]) {
                        return -1;
                    }else if (a[name] > b[name]) {
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
            var encRow;

            if (typeof(gridColumn[0]) === 'object') {
                encRow = gridColumn.map((column)=>(<td key={column.name} className={classnames({active: column.isActive})}>{row[column.name]}</td>));
            }else{
                encRow = gridColumn.map((column)=>(<td key={column} >{row[column]}</td>));
            }
            return(<tr key={row.id}>{encRow}</tr>);
        });
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

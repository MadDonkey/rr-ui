var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
    propTypes: {
        gridList: React.PropTypes.array.isRequired,
        gridColumn: React.PropTypes.array,
        sortBy: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.func]),
        filterBy: React.PropTypes.func,
        headClickHandle: React.PropTypes.func,
        headDBClickHandle: React.PropTypes.func,
    },
    displayName: 'Grid',
    _buildHeads: function(gridColumn,gridList){
        gridColumn = gridColumn || Object.keys(gridList[0]);
        return gridColumn.map((head)=>{
            if(typeof(head) === 'object')
                return (<th key={head.name} className={classnames({['sort-${head.sort}']: head.sort, active: head.isActive })} onClick={this.onClick} onDoubleClick={this.onDoubleClick}>{head.isActive? head.text : ""}</th>);
            else
                return (<th key={head} onClick={this.onClick} onDoubleClick={this.onDoubleClick}>{head}</th>);
        });

    },
    _buildRows: function(gridColumn,gridList){
        var {sortBy,filterBy} = this.props,sortByFunciton;
        gridColumn = gridColumn || Object.keys(gridList[0]);
        gridList = gridList.slice(); // Make the sort and filter on a copy of original grid list.
        // do sorting from here
        if (sortBy) {
            sortByFunciton = typeof(sortBy) === 'function'? sortBy : (a,b)=>{
                var sort = sortBy.split('|');
                if (sort[1] === 'ASC') {
                    if (a[sort[0]] > b[sort[0]]) {
                        return 1;
                    }else if (a[sort[0]] == b[sort[0]]) {
                        return 0;
                    }else{
                        return -1;
                    }
                }
            };

            gridList.sort(sortByFunciton);
        }
        // do filter from here
        if (filterBy) {
            gridList = gridList.filter(filterBy);
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
        var {gridList, gridColumn, ...originProps} = this.props;
        var theads = this._buildHeads(gridColumn,gridList);
        var trows = this._buildRows(gridColumn,gridList);
        return (
                <table {...originProps}>
                    <thead><tr>{theads}</tr></thead>
                    <tbody>{trows}</tbody>
                    <tfoot></tfoot>
                </table>
        );
    }
});

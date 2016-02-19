var _ = require('lodash');

var fakeList = [
    {id:1,name:'react',star: 9999,type:'javascript'},
    {id:2,name:'django',star:4956,type:'python'},
    {id:3,name:'rrui',star:12,type:'javascript'}
], fakeColumn = [
    {dataIdx:'id',label:'ID',isActive:true,sort:'ASC'},
    {dataIdx:'name',label:'Name',isActive:true},
    {dataIdx:'star',label:'Star',isActive:true},
    {dataIdx:'type',label:'Type',isActive:true}
];
module.exports  = function(state = {list: fakeList, column: fakeColumn, filterBy: undefined, range: undefined}, action){
    let {type,payload,error} = action;
    const {column} = state;

    switch (type) {
        case "PROJECT_SORT":
            payload.sort = payload.sort === 'ASC'? 'DESC' : 'ASC';
            var newcolumn = column.map((col)=>{
                return col.dataIdx === payload.dataIdx? payload : (col.sort = undefined) || col;
            });
            return _.assign({},state,{column:newcolumn});
        case "PROJECT_COLUMN_ACTIVE":
            payload.isActive = !payload.isActive;
            var newcolumn = column.map((col)=>{
                return col.dataIdx === payload.dataIdx? payload : col;
            });
            return _.assign({},state,{column:newcolumn});
        default:
            return state;

    }
};

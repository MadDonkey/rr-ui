var _ = require('lodash');

var fakeList = [
    {id:1,name:'react',star: 9999,type:'javascript'},
    {id:2,name:'django',star:4956,type:'python'},
    {id:3,name:'rrui',star:12,type:'javascript'}
], fakeColumn = [
    {name:'id',text:'ID',isActive:true,sort:'ASC'},
    {name:'name',text:'Name',isActive:true},
    {name:'star',text:'Star',isActive:true},
    {name:'type',text:'Type',isActive:true}
];
module.exports  = function(state = {list: fakeList, column: fakeColumn, filterBy: undefined, range: undefined}, action){
    let {type,payload,error} = action;
    const {column} = state;

    switch (type) {
        case "PROJECT_SORT":
            payload.sort = payload.sort === 'ASC'? 'DESC' : 'ASC';
            var newcolumn = column.map((col)=>{
                return col.name === payload.name? payload : (col.sort = undefined) || col;
            });

            return _.assign({},state,{column:newcolumn});

        default:
            return state;

    }
};

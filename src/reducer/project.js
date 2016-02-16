var _ = require('lodash');

var fakeList = [
    {id:1,name:'react',star: 9999,type:'javascript'},
    {id:2,name:'django',star:4956,type:'javascript'},
    {id:3,name:'rrui',star:12,type:'javascript'}
], fakeColumn = [
    {name:'name',text:'Name',isActive:true},
    {name:'star',text:'Star',isActive:true},
    {name:'type',text:'Type',isActive:true}
];
module.exports  = function(state = {list: fakeList, column: fakeColumn, sortBy: undefined, filterBy: undefined, range: undefined}, action){
    const {type,payload,error} = action;

    switch (type) {
        case "PROJECT_SORT":
            return _.assign({}, state, {sortBy:payload});
        default:
            return state;

    }
};

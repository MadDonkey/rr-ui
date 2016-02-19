var createAction = require('redux-actions').createAction;

exports.doProjectSort = createAction("PROJECT_SORT",sortByColumn=>sortByColumn);
exports.doProjectColumnActive = createAction("PROJECT_COLUMN_ACTIVE",activeColumn=>activeColumn);

var createAction = require('redux-actions').createAction;

exports.doProjectSort = createAction("PROJECT_SORT",sortBy=>sortBy);

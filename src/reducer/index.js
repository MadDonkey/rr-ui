var combinReducers = require('redux').combineReducers,
    userReducer = require('./user.js'),
    projectReducer = require('./project.js');


module.exports = combinReducers({
    user: userReducer,
    project: projectReducer
});

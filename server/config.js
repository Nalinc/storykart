'use strict';
var env;
var env_config;

env = process.env.NODE_ENV || 'development';

if(env == 'development'){
	env_config = "webpack.config";
}
else if(env == 'production'){
	env_config = "webpack.prod.config";
}
/*
 * Fallback to development environment if not valid environment is specified!
 */
else{
	env_config = "webpack.config";
}

module.exports = require('../' + env_config);
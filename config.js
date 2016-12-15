var dbuser = process.env.dbuser;
var dbpass = process.env.dbpass;

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://' + dbuser + ':' + dbpass + '@ds133398.mlab.com:33398/capstone-weapon-database' :
                            'mongodb://localhost/weapons-dev');
exports.PORT = process.env.PORT || 8080;
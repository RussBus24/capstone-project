exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://localhost/weapons' :
                            'mongodb://localhost/weapons-dev');
exports.PORT = process.env.PORT || 8080;
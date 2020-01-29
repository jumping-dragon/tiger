const knex = require('knex');
 
module.exports = knex({
    client: 'mysql', // pg, mssql, etc
 
    connection: {
        database:    'tiger',
        host:        'mysql-development',
        password:    '12345678',
        user:        'root',
        dateStrings: true
    }
});
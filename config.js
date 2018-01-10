//var connectionString = process.env.OPENSHIFT_POSTGRESQL_DB_URL || 'postgres://postgres:postgres@localhost:5432';
var connectionString = process.env.OPENSHIFT_POSTGRESQL_DB_URL || 'postgres://cnemgyqk:zMEFO99GLHsb1cDAUpXHOoTEmfNiLQhX@horton.elephantsql.com:5432';
connectionString+='/cnemgyqk';
module.exports = connectionString;
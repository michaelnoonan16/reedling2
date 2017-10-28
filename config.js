var connectionString = process.env.OPENSHIFT_POSTGRESQL_DB_URL || 'postgres://postgres:postgres@localhost:5432';
connectionString+='/yabe';
module.exports = connectionString;
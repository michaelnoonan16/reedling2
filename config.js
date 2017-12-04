var connectionString = process.env.OPENSHIFT_POSTGRESQL_DB_URL || 'postgres://yabe:yabePassword@10.131.34.154:5432';
connectionString+='/yabe';
module.exports = connectionString;
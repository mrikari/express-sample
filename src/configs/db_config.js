
let database = process.env.DB_NAME;
let username = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST || 'localhost';
let port = process.env.DB_PORT || '5432';

module.exports = {
  development: {
    database: database,
    username: username,
    password: password,
    host: host,
    port: port,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
  },
  test: {
    database: database,
    username: username,
    password: password,
    host: host,
    port: port,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
  },
  production: {
    database: database,
    username: username,
    password: password,
    host: host,
    port: port,
    dialect: 'postgres',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
  },
}

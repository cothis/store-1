const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'mysql',
  host: isProduction ? 'db' : 'localhost',
  port: 3306,
  username: 'woowa',
  password: 'woowa',
  database: 'store',
  entities: [`dist/**/*.entity{.ts,.js}`],
  synchronize: false,
  logging: true,
};

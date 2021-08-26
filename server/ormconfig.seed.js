const naming = require('typeorm-naming-strategies');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  namingStrategy: new naming.SnakeNamingStrategy(),
  type: 'mysql',
  host: isProduction ? 'db' : 'localhost',
  port: 3306,
  username: 'woowa',
  password: 'woowa',
  database: 'store',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  seeds: ['dist/seed/seeder/*.seed{.ts,.js}'],
};

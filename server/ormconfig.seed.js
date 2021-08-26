const naming = require('typeorm-naming-strategies');

module.exports = {
  namingStrategy: new naming.SnakeNamingStrategy(),
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'woowa',
  password: 'woowa',
  database: 'store',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  seeds: ['seed/seeder/*.seed{.ts,.js}'],
};

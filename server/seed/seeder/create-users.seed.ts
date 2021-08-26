import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '@models/users/entities/user.entity';

import bcrypt from 'bcrypt';
import password from '../data/password.json';

export default class CreateUsers implements Seeder {
  async run(_: Factory, connection: Connection): Promise<void> {
    const hashedPasword = await bcrypt.hash(password as string, 10);

    const count = await connection.createQueryBuilder().select('user').from(User, 'user').getCount();
    if (count !== 0) {
      return;
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          loginId: 'admin',
          isAdmin: true,
          password: hashedPasword,
          email: 'admin@example.com',
          realName: '관리자',
          zipcode: '05544',
          address: '서울특별시 송파구 위례성대로 2 장은빌딩',
          addressDetail: '',
        },
        {
          loginId: 'demo',
          password: await bcrypt.hash('demo', 10),
          email: 'demo@example.com',
          realName: '데모유저',
          zipcode: '05544',
          address: '서울특별시 송파구 위례성대로 2 장은빌딩',
          addressDetail: '',
        },
      ])
      .execute();
  }
}

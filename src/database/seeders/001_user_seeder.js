const { hashPassword, uuid, TABLES } = require('../../utils');

exports.seed = async (knex) => {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex(TABLES.USER).truncate();
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

  const passwordHash = await hashPassword('Qwerty@11');

  const data = [];
  for (let i = 0; i < 10; i++) {
    const num = i + 1;

    data.push({
      id: uuid(),
      name: `User ${num}`,
      email: `user${num}@mail.com`,
      password: passwordHash,
    });
  }

  await knex(TABLES.USER).insert(data);
}

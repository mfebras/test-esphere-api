const { parseObjVal, TABLES, USER_ROLES } = require('../../utils')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.USER, function (table) {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('email', 100).notNullable()
    table.string('image').nullable()
    table.string('password').notNullable()
    table.string('role', 20)
      .notNullable()
      .defaultTo(USER_ROLES.CUSTOMER)
      .comment(parseObjVal(USER_ROLES))
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now())
    table.timestamp('deleted_at').nullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.USER)
}

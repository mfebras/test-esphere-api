const { TABLES } = require('../../utils')

exports.up = function(knex) {
  return knex.schema.createTable(TABLES.PRODUCT, function (table) {
    table.increments('id')
    table.string('name').notNullable()
    table.integer('price').notNullable()
    table.integer('stock').notNullable()

    table.timestamp('created_at').nullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable(TABLES.PRODUCT)
}

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestobjSchema extends Schema {
  up () {
    this.create('testobjs', (table) => {
      table.increments()
      table.string('title', 225),
      table.integer('user_id').unsigned().references('id').inTable('users'),
      table.string('content'),
      table.timestamps()
    })
  }

  down () {
    this.drop('testobjs')
  }
}

module.exports = TestobjSchema

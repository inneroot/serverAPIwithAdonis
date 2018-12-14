'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Quiz extends Model {
  testobj() {
    return this.belongsTo('App/Models/Testobj');
  }
}

module.exports = Quiz

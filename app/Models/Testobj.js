'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Testobj extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }
  quizzes () {
    return this.hasMany('App/Models/Quiz')
  }
}

module.exports = Testobj

const { Model } = require('objection');
const knex = require('../db/knex')

Model.knex(knex)

class Notifications extends Model{
    static get tableName(){
        return 'notifications';
    }
}

module.exports = Notifications;
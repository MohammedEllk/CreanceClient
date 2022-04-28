const { Model } = require('objection');
const knex = require('../db/knex')

Model.knex(knex)

class Clients extends Model{
    static get tableName(){
        return 'clients';
    }
}

module.exports = Clients;
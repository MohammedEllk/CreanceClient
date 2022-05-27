/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("notifications", (table) => {
        table.increments();
        table.text("infos");
        table.integer('client_id').references('id').inTable('clients');
        table.boolean('consultation').notNullable();
        table.timestamps(true,true);
    });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

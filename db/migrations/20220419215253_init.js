/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("clients", (table) => {
      table.increments();
      table.string("prenom").notNullable();
      table.string("nom").notNullable();
      table.integer("montant").notNullable();
      table.integer("delai_paiement");
      table.date("date_echeance").notNullable();
      table.string("action");
      table.string("mode_reglement").notNullable();
      table.integer("retard_paiement");
      table.date("date_second_relance");
      table.integer("penalite");
      table.text("commentaire");
      table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

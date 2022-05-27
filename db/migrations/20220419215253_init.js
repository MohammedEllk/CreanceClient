/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("clients", (table) => {
      table.increments();
      table.string("nom").notNullable();
      table.string("addresse").notNullable();
      table.integer("numero_telephon").notNullable();
      table.string("email").notNullable();
      table.string("numero_facture").notNullable();
      table.integer("montant_ht").notNullable();
      table.date('date_facture');
      table.integer("versement_client");
      table.integer("tauxTva")
      table.integer("delai_paiement");
      table.boolean("status");
      table.date("date_echeance").notNullable();
      table.string("action");
      table.string("mode_reglement").notNullable();
      table.integer("retard_paiement");
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

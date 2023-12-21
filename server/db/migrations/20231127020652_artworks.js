/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('artworks', function(table){
    table.increments('id')
    table.string('name')
    table.string('description')
    table.string('medium')
    table.string('imageUrl')
    table.string('owner')
    table.string('alt')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('artworks')
}

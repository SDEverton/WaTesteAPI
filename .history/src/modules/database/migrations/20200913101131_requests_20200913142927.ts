// import * as Knex from 'knex';
const Knex = require('knex');

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Requests', table => {
    table.increments('id').primary();
    table.string('description', 150).notNullable();
    table.integer('quantity').nullable();
    table.float('price').notNullable();

    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Requests');
}

import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('professionals_services', table => {
        table.increments('id').primary();
        
        table.integer('professional_id')
            .notNullable()
            .references('id')
            .inTable('professionals');

        table.integer('service_id')
            .notNullable()
            .references('id')
            .inTable('services');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('professionals');
}
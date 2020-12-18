import Knex from 'knex';

export async function seed(knex:Knex) {
    await knex('services').insert([
        { title: 'Limpeza', image: 'limpeza.png' },
        { title: 'Elétrica', image: 'eletrica.png' },
        { title: 'Montador', image: 'montador.png' },
        { title: 'Encanador', image: 'encanador.png' },
        { title: 'Pintor', image: 'pintor.png' },
        { title: 'Outros', image: 'outros.png' },
    ]);
}
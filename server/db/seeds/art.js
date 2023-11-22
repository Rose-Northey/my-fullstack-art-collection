/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('art').del()
  await knex('art').insert([
    {
      id: 1,
      name: 'The Wave',
      description:
        'I did this collage at my parents house. The bird on the boat was an accident at first but I love him',
      medium: 'collage',
      imageUrl: '/wave.jpeg',
      owner: 'rose',
    },
    {
      id: 2,
      name: 'Youth',
      description:
        'A basset hound dog walked into my house half way through making this piece of art. Gaby was crafting with me at the time.',
      medium: 'collage',
      imageUrl: '/Klint.jpeg',
      owner: 'rose',
    },
    {
      id: 3,
      name: 'Cass',
      description:
        'I made this based on a request from dad. It was when I began to take it more seriously.',
      medium: 'collage',
      imageUrl: '/angus.jpeg',
      owner: 'rose',
    },
  ])
}

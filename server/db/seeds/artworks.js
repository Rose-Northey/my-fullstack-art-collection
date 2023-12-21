/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('artworks').del()
  await knex('artworks').insert([
    {
      id: 1,
      name: 'The Wave',
      description:
        'I did this collage at my parents house. The bird on the boat was an accident at first but I love him',
      medium: 'collage',
      imageUrl: '/wave.jpeg',
      owner: 'rose',
      alt: 'a coloured paper collage based on the famouse japonism painting, the wave.',
    },
    {
      id: 2,
      name: 'Youth',
      description:
        'A basset hound dog walked into my house half way through making this piece of art. Gaby was crafting with me at the time.',
      medium: 'collage',
      imageUrl: '/Klint.jpeg',
      owner: 'rose',
      alt:'a collage of swirling orange with bubbles of colours cut from different colour papers',
    },
    {
      id: 3,
      name: 'Cass',
      description:
        'I made this based on a request from dad. It was when I began to take it more seriously.',
      medium: 'collage',
      imageUrl: '/angus.jpeg',
      owner: 'rose',
      alt: 'A coloured paper collage based on a rita angus work.',
    },
  ])
}

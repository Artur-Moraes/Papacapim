const tweets = [
  {
    id: 't0',
    user: {
      id: 'u1',
      username: 'ArturMoraes',
      name: 'Artur',
      image:
        'https://img.freepik.com/free-vector/new-twitter-x-logo-with-drop-shadow_1017-45419.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724025600&semt=ais_hybrid',
    },
    createdAt: '2020-08-27T12:00:00.000Z',
    content: 'Teste',
    image:
      'https://img.freepik.com/fotos-premium/macaco-fundo-hd-8k-papel-de-parede-banco-de-imagem-fotografica_853645-57371.jpg',
    numberOfComments: 123,
    numberOfRetweets: 11,
    numberOfLikes: 10,
  },
  {
    id: '333333333',
    createdAt: '2023-04-26T12:00:00.000Z',
    user: {
      id: '123456789',
      name: 'Jane Smith',
      username: 'janesmith',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/6.png',
    },
    content:
      'Teste 2',
    numberOfComments: 5,
    numberOfRetweets: 10,
    numberOfLikes: 50,
    impressions: 1000,
  },
];

export default tweets;

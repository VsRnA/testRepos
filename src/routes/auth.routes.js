export default [
  {
    path: '/auth/register',
    verb: 'post',
    handler: () => {},
    authedOnly: false,
  },
  {
    path: '/auth/login',
    verb: 'post',
    handler: () => {},
    authedOnly: false,
  },
  {
    path: '/auth/profile',
    verb: 'get',
    handler: () => {},
    authedOnly: true,
  }
];

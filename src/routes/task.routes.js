import rList from '#controllers/tasks/list.js'

export default [
  {
    path: '/task/list',
    verb: 'get',
    handler: rList,
    authedOnly: false,
  },
];

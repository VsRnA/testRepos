import rList from '#controllers/tasks/list.js'
import rUpdate from '#controllers/tasks/update.js'

export default [
  {
    path: '/task/list',
    verb: 'get',
    handler: rList,
    authedOnly: false,
  },
  {
    path: '/task/update',
    verb: 'post',
    handler: rUpdate,
    authedOnly: false,
  }
];

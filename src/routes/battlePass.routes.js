import rGetBattelPass from '#controllers/battelPass/get.js'

export default [
  {
    path: '/battelPass/get',
    verb: 'get',
    handler: rGetBattelPass,
    authedOnly: false,
  },
];

import rPartnerRegistration from '#controllers/auth/registerPartner.js'
import rCreatePartnerTask from '#controllers/tasks/createPartnerTask.js';

export default [
  {
    path: '/partner/register',
    verb: 'post',
    handler: rPartnerRegistration,
    authedOnly: false,
  },
  {
    path: '/partner/createTask',
    verb: 'post',
    handler: rCreatePartnerTask,
    authedOnly: false,
  },
];

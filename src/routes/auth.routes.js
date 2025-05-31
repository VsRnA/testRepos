import rRegistration from '#controllers/auth/registration.js';
import rLogin from '#controllers/auth/login.js';

export default [
  {
    path: '/auth/register',
    verb: 'post',
    handler: rRegistration,
    authedOnly: false,
  },
  {
    path: '/auth/login',
    verb: 'post',
    handler: rLogin,
    authedOnly: false,
  },
];

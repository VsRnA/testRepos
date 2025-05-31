import express from 'express';
import { authMiddleware } from '#infrastructure/middlewares/auth.js';
import { uploadPartnerLogo } from '#infrastructure/middlewares/multer.js';
import allRoutesPromise from '#routes';

export default async function createExpressGateways() {
  const router = express.Router();
  const allRoutes = await allRoutesPromise;

  allRoutes.forEach((route) => {
    const middlewares = [];

    if (route.authedOnly) {
      middlewares.push(authMiddleware);
    }

    if (route.uploadLogo) {
      middlewares.push(uploadPartnerLogo);
    }

    router[route.verb](
      `/api${route.path}`,
      ...middlewares,
      route.handler
    );
  });

  return router;
}

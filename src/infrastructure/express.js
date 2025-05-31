import express from 'express';
import allRoutesPromise from '#routes';
import { authMiddleware } from '#infrastructure/middlewares/auth.js';

export default async function createExpressGateways() {
  const router = express.Router();
  const allRoutes = await allRoutesPromise;
  allRoutes.forEach((route) => {
    const middlewares = [];
    if (route.authedOnly) middlewares.push(authMiddleware);
    router[route.verb](`/api${route.path}`, ...middlewares, route.handler);
  });
  return router;
}

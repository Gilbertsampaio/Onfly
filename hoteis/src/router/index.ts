import type {
  RouteRecordRaw
} from 'vue-router';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router';

import routes from './routes';
const myRoutes: RouteRecordRaw[] = routes;

export default () => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: myRoutes,
    history: createHistory(
      process.env.VUE_ROUTER_BASE
    ),
  });

  return Router;
};
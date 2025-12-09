import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';
import type { ComponentType } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  component: ComponentType;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Fault Diagnoser',
    path: '/',
    component: Dashboard,
    visible: true
  },
  {
    name: 'Revenue Analyzer',
    path: '/analyzer',
    component: Analyzer,
    visible: true
  }
];

export default routes;

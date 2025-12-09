import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Fault Diagnoser',
    path: '/',
    element: <Dashboard />,
    visible: true
  },
  {
    name: 'Revenue Analyzer',
    path: '/analyzer',
    element: <Analyzer />,
    visible: true
  }
];

export default routes;

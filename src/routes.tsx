import DashboardHome from './pages/DashboardHome';
import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';
import Help from './pages/Help';
import About from './pages/About';
import type { ComponentType } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  component: ComponentType;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Dashboard Home',
    path: '/',
    component: DashboardHome,
    visible: true
  },
  {
    name: 'Fault Diagnosis',
    path: '/fault-diagnosis',
    component: Dashboard,
    visible: true
  },
  {
    name: 'Cost Analysis',
    path: '/cost-analysis',
    component: Dashboard,
    visible: true
  },
  {
    name: 'Predictive Failure',
    path: '/predictive',
    component: Dashboard,
    visible: true
  },
  {
    name: 'Performance Analytics',
    path: '/performance-analytics',
    component: Analyzer,
    visible: true
  },
  {
    name: 'Help',
    path: '/help',
    component: Help,
    visible: false
  },
  {
    name: 'About',
    path: '/about',
    component: About,
    visible: false
  }
];

export default routes;

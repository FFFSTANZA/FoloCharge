import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Activity, BarChart3 } from 'lucide-react';

import routes from './routes';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">FoloCharge</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                size="sm"
              >
                <Activity className="mr-2 h-4 w-4" />
                Fault Diagnoser
              </Button>
            </Link>
            <Link to="/analyzer">
              <Button 
                variant={location.pathname === '/analyzer' ? 'default' : 'ghost'}
                size="sm"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Revenue Analyzer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          <Routes>
          {routes.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={<Component />}
              />
            );
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;

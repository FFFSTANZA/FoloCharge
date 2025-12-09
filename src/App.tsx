import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/layout/Sidebar';
import { DataProvider } from '@/context/DataContext';
import routes from './routes';

const App: React.FC = () => {
  return (
    <DataProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 bg-background">
          <div className="mx-auto max-w-7xl">
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
          </div>
        </main>
        <Toaster />
      </div>
    </DataProvider>
  );
};

export default App;

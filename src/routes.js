import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import DashboardView from './views/reports/DashboardView';
import SettingsView from './views/settings/SettingsView';

const routes = (isAuthenticated) => [
  {
    path: 'app',
    element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !isAuthenticated ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;

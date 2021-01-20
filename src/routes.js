import React from 'react';
import { Navigate } from 'react-router-dom';
import AccountView from 'src/views/account/AccountView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import CategoryView from 'src/views/category&categoryDetails';

const routes = (currentUser) => [
  {
    path: 'app',
    //element: currentUser ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'category', element: <CategoryView/>},
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    //element: !currentUser ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
]


export default routes;

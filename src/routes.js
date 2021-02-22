import React from 'react';
import { Navigate } from 'react-router-dom';
import AccountView from 'src/views/account/AccountView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import ActivateUserView from 'src/views/auth/ActivateUserView';
import ForgetPasswordView from 'src/views/auth/ForgetPasswordView';
import ResetPasswordView from 'src/views/auth/ResetPasswordView';
import SettingsView from 'src/views/settings/SettingsView';
import CategoryView from 'src/views/category';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import Users from './views/user';

const standardUserPaths = [
  { path: 'account', element: <AccountView /> },
  { path: 'dashboard', element: <DashboardView /> },
  { path: 'category', element: <CategoryView /> },
  { path: 'settings', element: <SettingsView /> },
  { path: '*', element: <Navigate to="/404" /> }
]

const adminPaths = [
  { path: 'account', element: <AccountView /> },
  { path: 'users', element: <Users /> },
  { path: 'dashboard', element: <DashboardView /> },
  { path: 'category', element: <CategoryView /> },
  { path: 'settings', element: <SettingsView /> },
  { path: '*', element: <Navigate to="/404" /> }
]

const loggedOutPaths = [
  { path: 'login', element: <LoginView /> },
  { path: 'register', element: <RegisterView /> },
  { path: 'activate-user', element: <ActivateUserView /> },
  { path: 'forget-password', element: <ForgetPasswordView /> },
  { path: 'reset-password', element: <ResetPasswordView /> },
  { path: '404', element: <NotFoundView /> },
  { path: '/', element: <Navigate to="/app/dashboard" /> },
  { path: '*', element: <Navigate to="/404" /> }
]

const routes = (currentUser, role) => [
  {
    path: 'app',
    element: currentUser ? <DashboardLayout /> : <Navigate to="/login" />,
    children: role && role === 'A' ? adminPaths : standardUserPaths
  },
  {
    path: '/',
    element: !currentUser ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: loggedOutPaths
  }
]
export default routes;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoginPage from './routes/LoginPage';
import RegistrationPage from './routes/RegistrationPage';
import CategoriesPage from './routes/CategoriesPage';
import NotFound from './routes/NotFoundPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import DashboardPage from './routes/DashboardPage';
import LogoutPage from './routes/LogoutPage';
import ProfileSettingsPage from './routes/ProfileSettingsPage';
import QuestionsPage from './routes/QuestionsPage';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/questions",
        element: <QuestionsPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/categories/:category_id",
        element: <CategoriesPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
      {
        path: "/profile-settings",
        element: <ProfileSettingsPage />,
      },

      {
        path: "*",
        element: <NotFound />,
      }, 
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root') as Element | DocumentFragment).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)

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
        path: "/categories",
        element: <CategoriesPage />,
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

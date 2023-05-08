import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoginPage from './routes/LoginPage';
import RegistrationPage from './routes/RegistrationPage';
import ResponsePage from './routes/ResponsePage';
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
import FilteredQuestionPage from './routes/FilteredQuestionPage';
import QuestionsPage from './routes/QuestionsPage';
import CategoryPage from './routes/CategoryPage';

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
        loader: async () => {
          const response = await fetch('http://localhost:8000/api/v1/questions')
          return await response.json()
        },
        children: [
          {
            path: ":catid",
            element: <FilteredQuestionPage />,
            // loader: async ({params}) => {
            //   const response = await fetch(`http://localhost:8000/api/v1/questions?catid=${params.catid}`)
            //   return await response.json()
            // },
          },
        ],
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
        loader: async ({params}) => {
          console.log(params)
          const response = await fetch('http://localhost:8000/api/v1/categories')
          const data = await response.json()
          return data
        },
        children: [
          {
            path: "*",
            element: <NotFound />,
          }
        ],
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
        path: "/response",
        element: <ResponsePage />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root') as Element | DocumentFragment).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)

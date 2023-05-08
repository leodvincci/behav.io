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
import CategoryPage from './routes/CategoryPage';
import QuestionPage from './QuestionPage';

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
          const data = await response.json()
          console.log(`Questions: ${data}`)
          return data
        },
        children: [
          {
            path: ":catid",
            element: <QuestionPage />,
            loader: async ({params}) => {
              const { question_id } = params
              const response = await fetch(`http://localhost:8000/api/v1/questions/`)
              const data = await response.json()
              console.log(data)
    
              return data
            },
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
          console.log(data)

          return data
        },
        children: [
          {
            path: ":category_id",
            element: <CategoryPage />,
          },
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

import React, { Children } from 'react'
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
import QuestionsPage from './routes/QuestionsPage';
import QuestionPage from './routes/QuestionPage';
import LoaderPage from './routes/LoaderPage';
import ResponsesPage from './routes/ResponsesPage';

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
        path: "/responses",
        element: <ResponsesPage />,
        loader: async () => {
          const response = await fetch('http://127.0.0.1:8000/api/v1/responses/', {
            credentials: 'include',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          return await response.json()
        }

      },
      {
        path: "/questions",
        element: <QuestionsPage />,
        loader: async () => {
          const response = await fetch('http://localhost:8000/api/v1/questions', {
            credentials: 'include',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': `${localStorage.getItem('csrftoken')}`
            },
          })
          return await response.json()
        }
      },
      {
        path: "questions/:category_txt",
        element: <QuestionPage />,
        loader: async ({params}) => {
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/questions/${params.category_txt}/`, {
              credentials: 'include',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            return await response.json()
          } catch (error) {
            console.log(error)
          }
        },
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
        loader: async ({params}) => {
          const response = await fetch('http://127.0.0.1:8000/api/v1/categories/', {
            credentials: 'include',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': `${localStorage.getItem('csrftoken')}`,
            },
          })
          return await response.json()
        },
        children: [
          {
            path: ":catid",
            element: <QuestionPage />,
            loader: async ({params}) => {
              try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/categories/${params.catid}`, {
                  credentials: 'include',
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                const data = await response.json()
                console.log(data)
              } catch (error) {
                console.log(error)
              }
            },
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
        path: "/loading",
        element: <LoaderPage />,
      },
      {
        path: "/profile-settings",
        element: <ProfileSettingsPage />,
      },
      {
        path: "/response",
        errorElement: <NotFound />,
        children: [
          {
            path: ":question_id",
            element: <ResponsePage />,
            loader: async ({params}) => {
              console.log(params)
              const { question_id } = params

              const returndata = {
                question: {},
                responses: [],
              }

              try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/questions/${question_id}/`, {
                  credentials: 'include',
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                const data = await response.json()
                console.log(data.questions[0])
                returndata.question = data.questions[0]

                return returndata
              } catch (error) {
                console.log(error)
              }
            },
          },
        ],
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

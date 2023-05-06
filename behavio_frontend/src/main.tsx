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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "login",
    element: <LoginPage />,
    errorElement: <NotFound />,
  },
  {
    path: "registration",
    element: <RegistrationPage />,
    errorElement: <NotFound />,
  },
  {
    path: "categories",
    element: <CategoriesPage />,
    errorElement: <NotFound />,
    
    //* Use a loader to get data from the server: 
    // loader: async () =>  {
    //   const data = await fetch('http://127.0.0.1:8000/api/v1/categories')
    //   console.log(data)
    //   return await data.message.json()
    // },   
  },
  
]);


ReactDOM.createRoot(document.getElementById('root') as Element | DocumentFragment).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)

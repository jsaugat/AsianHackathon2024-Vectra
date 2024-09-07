import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx"
import ErrorPage from "./error.page.jsx";
import Layout from "./Layout";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Environment from "./routes/Environment";
import Quiz from "./routes/Quiz";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Use Layout as the wrapper
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'environment',
        element: <Environment />,
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)

import { createBrowserRouter, Route, Router, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import SignUn from './pages/SignUp';
import SignIn from './pages/SignIn';
import OtpActivation from './pages/OtpActivation';
import Portal from './pages/Portal';
import Dashboard from './components/Dashboard/Dashboard';
import PersonalAccount from './components/PersonalAccount/PersonalAccount';
import CreatePersonalAccount from './components/CreatePersonalAccount/CreatePersonalAccount';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "sign-up",
      element: <SignUn />
    },
    {
      path: "sign-in",
      element: <SignIn/>
    },
    {
      path: "activate/:email",
      element: <OtpActivation />
    },
    {
      path: '/portal/:userId',
      element: <Portal />,
      children: [
        {
          index: true,
          element: <Dashboard />
        },

        {
          path: "/portal/:userId/dashboard",
          element: <Dashboard />
        },

        {
          path: "/portal/:userId/personal-account",
          element: <PersonalAccount />
        },

        {
          path: "/portal/:userId/personal-account/create",
          element: <CreatePersonalAccount />
        }
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

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
import ViewPersonalAccount from './pages/ViewPersonalAccount';
import LockAccount from './pages/LockAccount';
import Deposit from './pages/Deposit';

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
          path: "transection-history",
          element: <PersonalAccount />,
        },

        {
          path: "deposit/:accountId",
          element: <Deposit />
        },

        {
          path: "personal-account",
          element: <PersonalAccount />,
        },

        {
          path: "personal-account/create",
          element: <CreatePersonalAccount />
        },

        {
          path: "personal-account/:accountId",
          element: <ViewPersonalAccount />
        },

        {
          path: "personal-account/:accountId/lock-account",
          element: <LockAccount />
        },

        {
          path: "personal-account/:accountId/deposit",
          element: <Deposit />
        },
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

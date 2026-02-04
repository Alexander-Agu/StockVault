import { createBrowserRouter, Route, Router, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import SignUn from './pages/SignUp';
import SignIn from './pages/SignIn';
import OtpActivation from './pages/OtpActivation';
import Portal from './pages/Portal';

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
      element: <Portal />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

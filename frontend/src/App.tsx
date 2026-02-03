import { createBrowserRouter, Route, Router, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import SignUn from './pages/SignUp';
import SignIn from './pages/SignIn';

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
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

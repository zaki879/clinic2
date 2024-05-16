import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";


const router =createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
 
  
])

export default function App() {
 

  return (
    <div className='wholecontainer'>
          <RouterProvider router={router}></RouterProvider>

    </div>
  );
}

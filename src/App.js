import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import RegisterReactBoots from './components/RegisterReactBoots';
import Main from './Main/Main';
 
 const router = createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children: [
      {
        path:'/',
        element: <RegisterReactBoots></RegisterReactBoots>
      },
      {
        path:'/register',
        element:<RegisterReactBoots></RegisterReactBoots>
      },
      {
        path:'/login',
        element:<Login></Login>
      }
    ]
  }


 ])

 

 
function App() {
  return (
    <div className="">
      
     <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

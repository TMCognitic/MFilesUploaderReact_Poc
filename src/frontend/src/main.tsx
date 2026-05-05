import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeLayout, Home, MultiFiles } from './pages';
import 'devextreme/dist/css/dx.light.css';

const router = createBrowserRouter(
  [
    { 
      path:'/', 
      element: <HomeLayout />, 
      children: [
        { index:true, element: <Home /> },
        { path: "/multifiles", element: <MultiFiles /> },
      ]
    }
  ]
);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { StorePage } from './pages/StorePage';
import { RetrievePage } from './pages/RetrievePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'store', element: <StorePage /> },
      { path: 'retrieve', element: <RetrievePage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

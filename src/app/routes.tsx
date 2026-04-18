import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';
import Awareness from './pages/Awareness';
import Billy from './pages/Billy';
import Report from './pages/Report';
import Resources from './pages/Resources';
import SHIELD from './pages/SHIELD';
import Research from './pages/Research';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'awareness',
        element: <Awareness />,
      },
      {
        path: 'billy',
        element: <Billy />,
      },
      {
        path: 'report',
        element: <Report />, 
      },
      {
        path: 'resources',
        element: <Resources />,
      },
      {
        path: 'shield',
        element: <SHIELD />,
      },
      {
        path: 'research',
        element: <Research />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
// import logo from './logo.svg';
import { CssBaseline } from '@mui/material';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import ErrorPage from './components/Common/ErrorPage';
import Videos from './components/Videos/Videos';
import videoLoader from './components/Videos/loader';
import Musicians from './components/Musicians/Musicians';
import musicianLoader from './components/Musicians/loader';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'videos',
        element: <Videos />,
        loader: videoLoader
      },
      {
        path: 'texts'
      },
      {
        path: 'musicians',
        element: <Musicians />,
        loader: musicianLoader
      },
      {
        path: 'events'
      },
    ]
  },
]);

function App() {
  return (
    <CssBaseline>
      <RouterProvider router={router} />
    </CssBaseline>
  );
}

export default App;

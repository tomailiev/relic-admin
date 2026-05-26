// import logo from './logo.svg';
import { CssBaseline } from '@mui/material';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { ReactElement } from 'react';
import UserContext from './context/UserContext';
import router from './utils/react-router/router';
import { useCurrentUser } from './hooks/useCurrentUser';



const App = (): ReactElement => {


  const { authUser, setAuthUser, profile } = useCurrentUser();


  return (
    <CssBaseline>
      <UserContext.Provider value={{ currentUser: authUser, setCurrentUser: setAuthUser, profile: profile }} >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </CssBaseline>
  );
}

export default App;

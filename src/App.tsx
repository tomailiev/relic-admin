// import logo from './logo.svg';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { ReactElement } from 'react';
import UserContext from './context/UserContext';
import router from './utils/react-router/router';
import { useCurrentUser } from './hooks/useCurrentUser';



const App = (): ReactElement => {


  const { authUser, setAuthUser, profile } = useCurrentUser();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#09455a',
      },
      secondary: {
        main: '#efd498',
        dark: '#cfaa55',
        light: '#f9ebb3'
      },
    },
  })

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ currentUser: authUser, setCurrentUser: setAuthUser, profile: profile }} >
          <RouterProvider router={router} />
        </UserContext.Provider>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;

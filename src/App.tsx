// import logo from './logo.svg';
import { CssBaseline } from '@mui/material';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { ReactElement, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './utils/firebase/firebase-init';
import UserContext from './context/UserContext';
import router from './utils/react-router/router';
import LocationContext from './context/LocationContext';



const App = (): ReactElement => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  })


  return (
    <CssBaseline>
      <UserContext.Provider value={{ currentUser, setCurrentUser }} >
        <LocationContext.Provider value={{ location, setLocation }}>
          <RouterProvider router={router} />
        </LocationContext.Provider>
      </UserContext.Provider>
    </CssBaseline>
  );
}

export default App;

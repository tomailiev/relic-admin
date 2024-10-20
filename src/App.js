// import logo from './logo.svg';
import { CssBaseline } from '@mui/material';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase/firebase-init';
import UserContext from './context/UserContext';
import router from './utils/react-router/router';
import SubmissionContext from './context/SubmissionContext';



function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [submission, setSubmission] = useState({});

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
        <SubmissionContext.Provider value={{ submission, setSubmission }} >
          <RouterProvider router={router} />
        </SubmissionContext.Provider>
      </UserContext.Provider>
    </CssBaseline>
  );
}

export default App;

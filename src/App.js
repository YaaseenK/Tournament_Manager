import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/topbar";
import Dashboard from "./scenes/dashboard";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/sidebar";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AuthGoogle from "./AuthGoogle";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


function App() {
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAHv_ZLtRmyJOCQuUfEOfb7s_R4dI5CIWw",
    authDomain: "tournamentauth.firebaseapp.com",
    projectId: "tournamentauth",
    storageBucket: "tournamentauth.appspot.com",
    messagingSenderId: "353264466720",
    appId: "1:353264466720:web:8177ac5ff3f4e96b70b545",
    measurementId: "G-3JXTWVB7NS"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <AuthGoogle auth={firebase.auth()}/>
            {/* <Sidebar isSidebar={isSidebar}/> */}
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
          
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

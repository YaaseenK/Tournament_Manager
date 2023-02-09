import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/topbar";
import Dashboard from "./scenes/dashboard";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/sidebar";


function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
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

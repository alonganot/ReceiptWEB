import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import CreateSessionPage from "./pages/CreateSessionPage.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Navbar from "./components/Navbar.tsx";
import { SessionPageWrapper } from "./pages/SessionPage.tsx";
import JoinSessionPage from "./pages/JoinSessionPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";

function App() {
  const myRoutes = [
    {
      path: "/",
      element: 
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/create",
      element: 
      <ProtectedRoute>
        <CreateSessionPage />
      </ProtectedRoute>,
    },
    {
      path: "/join",
      element:
      <ProtectedRoute>
        <JoinSessionPage />
      </ProtectedRoute>,
    },
    {
      path: "/session/:id",
      element:
      <ProtectedRoute>
        <SessionPageWrapper />
      </ProtectedRoute>,
    },
  ]

  const theme = createTheme({
    palette: {
      primary: {
        main: '#62dbc4',
      },
      secondary: {
        main: '#dbbc62',
      },
    },
  });

  return (
    <Box sx={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <GoogleOAuthProvider clientId="560910471669-uhp4sjqvm08cktgvgcq275hm2bgn57hv.apps.googleusercontent.com">
        <BrowserRouter>
          <UserProvider>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                <Navbar />
                  <Routes>
                    { myRoutes.map((route, index) => <Route key={index} path={route.path}
                    element={route.element} errorElement={<NotFoundPage />} />)}    
                  </Routes>
                </ThemeProvider>
            </AuthProvider>
          </UserProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Box>
  )
}

export default App

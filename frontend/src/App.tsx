import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Box, createTheme, ThemeProvider } from "@mui/material";

import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import CreateSessionPage from "./pages/CreateSessionPage.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Navbar from "./components/Navbar.tsx";
import { SessionPageWrapper } from "./pages/SessionPage.tsx";
import JoinSessionPage from "./pages/JoinSessionPage.tsx";

function App() {

  const queryClient = new QueryClient()

  const myRoutes = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/create",
      element: <CreateSessionPage />,
    },
    {
      path: "/join",
      element: <JoinSessionPage />,
    },
    {
      path: "/session/:id",
      element: <SessionPageWrapper />,
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
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
            <Navbar />
              <Routes>
                { myRoutes.map((route, index) => <Route key={index} path={route.path}
                element={route.element} errorElement={<NotFoundPage />} />)}    
              </Routes>
            </ThemeProvider>
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
      </BrowserRouter>
    </Box>
  )
}

export default App

import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./components/theming/themeprovider";
import { Toaster } from "./components/ui/toaster";
import { Login } from "./pages/login";
import { LoginLoadingPage } from "./pages/login_loading";
import { Main } from "./pages/main";
import { fetchToken } from "./statemanagement/authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "./statemanagement/store";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    token: state.authentication.token,
  }));
  let navigate = useNavigate();
  const isLoading = useMemo(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (isAuthenticated === null) {
      return true;
    }
    return false;
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    dispatch(fetchToken());
    console.log(isAuthenticated);
    if (isAuthenticated === true && token) {
      const decodedToken = jwtDecode(token);

      let expiry = (decodedToken.exp ?? 0) * 1000 - Date.now();
      if (expiry < 0) {
        navigate("/login");
      }
      expiry = expiry - 20000;
      console.log(expiry);
      setTimeout(() => {
        dispatch(fetchToken());
      }, expiry);
    }
  }, [isAuthenticated, token, dispatch]);
  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <div className="bg-background dark:bg-background">
          <div className="flex flex-col min-h-screen">
            {isLoading && <LoginLoadingPage />}
            {!isLoading && (
              <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/*" Component={Main} />
              </Routes>
            )}
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;

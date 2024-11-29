import { useEffect, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./components/theming/themeprovider";
import { Login } from "./pages/login";
import { LoginLoadingPage } from "./pages/login_loading";
import { Main } from "./pages/main";
import { fetchToken } from "./statemanagement/authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "./statemanagement/store";

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated
  );
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
  console.log(isLoading);
  useEffect(() => {
    const callToken = () => {
      setTimeout(() => {
        console.log("fetching token");
        dispatch(fetchToken()).then((res) => {
          console.log(res);
          callToken();
        });
      }, 1000);
    };
    dispatch(fetchToken());
    callToken();
  }, []);
  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <div className="bg-background">
          <div className="flex flex-col min-h-screen">
            {isLoading && <LoginLoadingPage />}
            {!isLoading && (
              <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/" Component={Main} />
              </Routes>
            )}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;

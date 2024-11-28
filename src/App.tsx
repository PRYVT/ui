import { useEffect } from "react";
import { ThemeProvider } from "./components/theming/themeprovider";
import { Main } from "./pages/main";
import { fetchToken } from "./statemanagement/authentication/authenticationSlice";
import { useAppDispatch } from "./statemanagement/store";

function App() {
  const dispatch = useAppDispatch();
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
            <Main />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;

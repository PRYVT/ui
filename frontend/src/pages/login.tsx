import { login } from "@/statemanagement/authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "@/statemanagement/store";
import { LoginRequest } from "@/types/login.type";
import { LoginForm } from "../components/login/login-form";

export const Login = () => {
  const { isAuthenticated, isLoginError } = useAppSelector((state) => ({
    isAuthenticated: state.authentication.isAuthenticated,
    isLoginError: state.authentication.loginError,
  }));
  const dispatch = useAppDispatch();
  const loginWrapper = (request: LoginRequest) => {
    return dispatch(login(request));
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm
        login={loginWrapper}
        isAuthenticated={!!isAuthenticated}
        isLoginError={!!isLoginError}
      />
    </div>
  );
};

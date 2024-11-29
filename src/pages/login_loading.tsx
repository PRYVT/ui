import { LoginFormSkeleton } from "../components/login/login-form-skeleton";

export const LoginLoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginFormSkeleton />
    </div>
  );
};

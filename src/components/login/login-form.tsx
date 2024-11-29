import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginRequest } from "@/types/login.type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  login,
  isAuthenticated,
  isLoginError,
}: {
  login: (r: LoginRequest) => Promise<any>;
  isAuthenticated: boolean;
  isLoginError: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    await login({ username, password });
    setIsLoading(false);
  };

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {isLoginError && (
              <div className="text-red-500">
                Invalid username or password. Please try again.
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                disabled={isLoading}
                id="username"
                name="username"
                placeholder="Enter your username"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                disabled={isLoading}
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

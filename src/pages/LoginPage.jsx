import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MOCK_CREDENTIALS } from "../constants/auth";
import { useAuthContext } from "../context/auth.provider";

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/calendar");
    }
  }, [isAuthenticated,navigate]);

  const handleInputChange = (e) => {
    if (errorMessage || loginError) {
      setErrorMessage({});
      setLoginError("");
    }
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      email: !formData.email ? "Email is required" : "",
      password: !formData.password ? "Password is required" : "",
    };

    if (errors.email || errors.password) {
      setErrorMessage(errors);
      return;
    }

    if (
      formData.email === MOCK_CREDENTIALS.email &&
      formData.password === MOCK_CREDENTIALS.password
    ) {
      login();
      navigate("/calender");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden p-2">
      <div className="flex flex-col w-full max-w-md p-12 space-y-6 text-center bg-gray-50 text-gray-900 mx-auto mt-40 rounded-2xl shadow-xl h-110 ">
        <h1 className="text-3xl font-semibold">Sign in to your account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-sky-600 focus:border-sky-600 bg-white text-gray-800"
              onChange={handleInputChange}
            />
            {errorMessage.email && <p className="text-red-600 text-sm">{errorMessage.email}</p>}
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-sky-600 focus:border-sky-600 bg-white text-gray-800"
              onChange={handleInputChange}
            />
            {errorMessage.password && (
              <p className="text-red-600 text-sm">{errorMessage.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 font-semibold rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ">
            Sign in
          </button>
        </form>
        {loginError && <p className="text-red-600">{loginError}</p>}
      </div>
    </div>
  );
};

export default LoginPage;

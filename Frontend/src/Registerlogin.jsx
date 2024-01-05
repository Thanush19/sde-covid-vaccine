import axios from "axios";
import { useState } from "react";

const Registerlogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      console.log("Success", response);

      window.location.href = "/vaccines";
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed", error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl mb-6">Vaccine Booking System</h1>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-x-8">
        <div className="card p-4 bg-gray-800 w-full md:w-96">
          <h2 className="text-center mb-4">Login</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-input w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-input w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="btn bg-blue-500 text-white hover:bg-blue-700"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>

        <div className="card p-4 bg-gray-800 w-full md:w-96">
          <h2 className="text-center mb-4">Register</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-input w-full"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-input w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="btn bg-green-500 text-white hover:bg-green-700"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerlogin;

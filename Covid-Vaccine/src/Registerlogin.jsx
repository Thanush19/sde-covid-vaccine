import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });

      console.log('Success', response);

      // Redirect to another page upon successful login
      window.location.href = '/vaccines';
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3001/register', { username, password });
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed', error.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Vaccine Booking System</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Register</h2>
              <div className="text-center">
                
                <button className="btn btn-success" onClick={handleRegister}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


import { Routes, Route } from 'react-router-dom';
import Login from './Registerlogin.jsx';
import Booking from './BookingPage.jsx';

import './index.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/vaccines" element={<Booking/>} />
    </Routes>
  );
};

export default App;

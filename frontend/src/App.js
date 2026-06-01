import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MealLog from './pages/MealLog';
import Goal from './pages/Goal';
import Progress from './pages/Progress';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/meallog" element={<PrivateRoute><MealLog /></PrivateRoute>} />
        <Route path="/goal" element={<PrivateRoute><Goal /></PrivateRoute>} />
        <Route path="/progress" element={<PrivateRoute><Progress /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
<Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

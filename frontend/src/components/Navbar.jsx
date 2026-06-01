import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold">🥗 DietTracker</Link>
      {token ? (
        <div className="flex gap-4">
          <Link to="/dashboard" className="hover:text-green-200">Dashboard</Link>
          <Link to="/meallog" className="hover:text-green-200">Meal Log</Link>
          <Link to="/progress" className="hover:text-green-200">Progress</Link>
          <Link to="/goal" className="hover:text-green-200">Set Goal</Link>
	<Link to="/admin" className="hover:text-green-200">Admin</Link>
          <Link to="/profile" className="hover:text-green-200">Profile</Link>
          <button onClick={handleLogout} className="hover:text-green-200">Logout</button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="hover:text-green-200">Login</Link>
          <Link to="/register" className="hover:text-green-200">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function Admin() {
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
    fetchMeals();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMeals = async () => {
    try {
      const res = await axiosInstance.get('/api/admin/meals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeals(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axiosInstance.delete(`/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Admin Panel</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
          Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('meals')}
          className={`px-4 py-2 rounded ${activeTab === 'meals' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
          All Meals ({meals.length})
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'meals' && (
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Meal</th>
                <th className="p-3 text-left">Calories</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {meals.map(meal => (
                <tr key={meal._id} className="border-b">
                  <td className="p-3">{meal.userId?.name || 'Unknown'}</td>
                  <td className="p-3">{meal.name}</td>
                  <td className="p-3">{meal.calories}</td>
                  <td className="p-3">{meal.mealType}</td>
                  <td className="p-3">{new Date(meal.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;

import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function Goal() {
  const [form, setForm] = useState({
    dailyCalories: '', dailyProtein: '', dailyCarbs: '', dailyFat: ''
  });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await axiosInstance.get('/api/goals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForm({
          dailyCalories: res.data.dailyCalories,
          dailyProtein: res.data.dailyProtein,
          dailyCarbs: res.data.dailyCarbs,
          dailyFat: res.data.dailyFat
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchGoal();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/goals', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Goal saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Set Diet Goal</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Daily Calories (kcal)</label>
            <input className="border p-2 rounded w-full" type="number"
              value={form.dailyCalories}
              onChange={e => setForm({...form, dailyCalories: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Daily Protein (g)</label>
            <input className="border p-2 rounded w-full" type="number"
              value={form.dailyProtein}
              onChange={e => setForm({...form, dailyProtein: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Daily Carbs (g)</label>
            <input className="border p-2 rounded w-full" type="number"
              value={form.dailyCarbs}
              onChange={e => setForm({...form, dailyCarbs: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Daily Fat (g)</label>
            <input className="border p-2 rounded w-full" type="number"
              value={form.dailyFat}
              onChange={e => setForm({...form, dailyFat: e.target.value})} />
          </div>
        </div>
        <button type="submit"
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Save Goal
        </button>
      </form>
    </div>
  );
}

export default Goal;

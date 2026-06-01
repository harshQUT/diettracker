import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function MealLog() {
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({
    name: '', calories: '', protein: '', carbs: '', fat: '', mealType: 'breakfast'
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchMeals = async () => {
    try {
      const res = await axiosInstance.get('/api/meals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeals(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/meals', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ name: '', calories: '', protein: '', carbs: '', fat: '', mealType: 'breakfast' });
      fetchMeals();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/meals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMeals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Meal Log</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Log a Meal</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Meal Name" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Calories" type="number" value={form.calories}
            onChange={e => setForm({...form, calories: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Protein (g)" type="number" value={form.protein}
            onChange={e => setForm({...form, protein: e.target.value})} />
          <input className="border p-2 rounded" placeholder="Carbs (g)" type="number" value={form.carbs}
            onChange={e => setForm({...form, carbs: e.target.value})} />
          <input className="border p-2 rounded" placeholder="Fat (g)" type="number" value={form.fat}
            onChange={e => setForm({...form, fat: e.target.value})} />
          <select className="border p-2 rounded" value={form.mealType}
            onChange={e => setForm({...form, mealType: e.target.value})}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Log Meal
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-3">All Meals</h2>
      {meals.length === 0 ? (
        <p className="text-gray-500">No meals logged yet.</p>
      ) : (
        meals.map(meal => (
          <div key={meal._id} className="bg-white p-4 rounded-lg shadow mb-3 flex justify-between">
            <div>
              <h3 className="font-semibold">{meal.name}</h3>
              <p className="text-sm text-gray-500">{meal.mealType} • {meal.calories} kcal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g</p>
              <p className="text-xs text-gray-400">{new Date(meal.date).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleDelete(meal._id)}
              className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MealLog;
// Meal tracking feature complete

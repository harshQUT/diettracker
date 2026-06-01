import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [goal, setGoal] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealRes = await axiosInstance.get('/api/meals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMeals(mealRes.data);
        try {
          const goalRes = await axiosInstance.get('/api/goals', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setGoal(goalRes.data);
        } catch (e) {
          console.log('No goal set yet');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);

  const todayMeals = meals.filter(meal =>
    new Date(meal.date).toDateString() === new Date().toDateString()
  );

  const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = todayMeals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = todayMeals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = todayMeals.reduce((sum, meal) => sum + meal.fat, 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Calories Today</h2>
          <p className="text-3xl font-bold text-green-600">{totalCalories}</p>
          {goal && <p className="text-sm text-gray-500">Goal: {goal.dailyCalories}</p>}
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Protein Today</h2>
          <p className="text-3xl font-bold text-blue-600">{totalProtein}g</p>
          {goal && <p className="text-sm text-gray-500">Goal: {goal.dailyProtein}g</p>}
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Carbs Today</h2>
          <p className="text-3xl font-bold text-yellow-600">{totalCarbs}g</p>
          {goal && <p className="text-sm text-gray-500">Goal: {goal.dailyCarbs}g</p>}
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Fat Today</h2>
          <p className="text-3xl font-bold text-red-600">{totalFat}g</p>
          {goal && <p className="text-sm text-gray-500">Goal: {goal.dailyFat}g</p>}
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-3">Today's Meals</h2>
      {todayMeals.length === 0 ? (
        <p className="text-gray-500">No meals logged today.</p>
      ) : (
        todayMeals.map(meal => (
          <div key={meal._id} className="bg-white p-4 rounded-lg shadow mb-3">
            <h3 className="font-semibold">{meal.name}</h3>
            <p className="text-sm text-gray-500">{meal.mealType} • {meal.calories} kcal</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;

import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

function Progress() {
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

  const getPercentage = (current, target) => {
    if (!target) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const ProgressBar = ({ label, current, target, color }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-gray-500">{current} / {target || '?'}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${color}`}
          style={{ width: `${getPercentage(current, target)}%` }}>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{getPercentage(current, target)}% of goal</p>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Progress</h1>
      {!goal ? (
        <p className="text-gray-500">Please set a goal first to see your progress.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
          <ProgressBar label="Calories" current={totalCalories}
            target={goal.dailyCalories} color="bg-green-500" />
          <ProgressBar label="Protein (g)" current={totalProtein}
            target={goal.dailyProtein} color="bg-blue-500" />
          <ProgressBar label="Carbs (g)" current={totalCarbs}
            target={goal.dailyCarbs} color="bg-yellow-500" />
          <ProgressBar label="Fat (g)" current={totalFat}
            target={goal.dailyFat} color="bg-red-500" />
        </div>
      )}
    </div>
  );
}

export default Progress;
// Progress tracking feature

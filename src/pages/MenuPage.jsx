import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Plus, Trash2, Edit2, Copy, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const FOOD_GROUPS = [
  "Tinh bột",
  "Đạm",
  "Rau củ",
  "Trái cây",
  "Sữa",
  "Chất béo",
  "Đồ uống"
];

const MEALS = [
  { id: "breakfast", name: "Ăn sáng" },
  { id: "morning_snack", name: "Ăn phụ buổi sáng" },
  { id: "lunch", name: "Ăn trưa" },
  { id: "afternoon_snack", name: "Ăn xế" }
];

export default function MenuPage() {
  const [viewMode, setViewMode] = useState("week"); // "week" or "day"
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingMeal, setEditingMeal] = useState(null);
  const [menuData, setMenuData] = useState({});

  // Lấy ngày trong tuần
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      days.push(currentDay);
    }
    return days;
  };

  const weekDays = getWeekDays(selectedWeek);
  const displayDate = viewMode === "week" ? selectedWeek : selectedDate;
  const dateKey = viewMode === "week" 
    ? `${selectedWeek.getFullYear()}-W${getWeekNumber(selectedWeek)}`
    : selectedDate.toISOString().split('T')[0];

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  const getMenuForDate = (date) => {
    const key = date.toISOString().split('T')[0];
    return menuData[key] || {};
  };

  const addDish = (date, mealId, dish) => {
    const key = date.toISOString().split('T')[0];
    setMenuData((prev) => {
      const newData = { ...prev };
      if (!newData[key]) newData[key] = {};
      if (!newData[key][mealId]) newData[key][mealId] = [];
      newData[key][mealId] = [...newData[key][mealId], dish];
      return newData;
    });
    setEditingMeal(null);
  };

  const deleteDish = (date, mealId, dishIndex) => {
    const key = date.toISOString().split('T')[0];
    setMenuData((prev) => {
      const newData = { ...prev };
      if (newData[key] && newData[key][mealId]) {
        newData[key][mealId] = newData[key][mealId].filter((_, i) => i !== dishIndex);
      }
      return newData;
    });
  };

  const copyMenuFromPreviousWeek = () => {
    const previousWeek = new Date(selectedWeek);
    previousWeek.setDate(previousWeek.getDate() - 7);
    const prevKey = `${previousWeek.getFullYear()}-W${getWeekNumber(previousWeek)}`;
    const currentKey = `${selectedWeek.getFullYear()}-W${getWeekNumber(selectedWeek)}`;
    
    // Copy data from previous week days to current week days
    const prevWeekDays = getWeekDays(previousWeek);
    const newData = { ...menuData };
    
    weekDays.forEach((currentDay, index) => {
      const prevDay = prevWeekDays[index];
      const prevKey_date = prevDay.toISOString().split('T')[0];
      const currentKey_date = currentDay.toISOString().split('T')[0];
      if (menuData[prevKey_date]) {
        newData[currentKey_date] = JSON.parse(JSON.stringify(menuData[prevKey_date]));
      }
    });
    
    setMenuData(newData);
    alert("Đã sao chép thực đơn từ tuần trước!");
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold" style={{ color: '#19C1B6' }}>
              Quản lý Thực đơn
            </h1>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === "week"
                      ? "bg-white text-teal-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Tuần
                </button>
                <button
                  onClick={() => setViewMode("day")}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === "day"
                      ? "bg-white text-teal-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  Ngày
                </button>
              </div>

              {/* Copy from previous week button */}
              {viewMode === "week" && (
                <button
                  onClick={copyMenuFromPreviousWeek}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Sao chép tuần trước
                </button>
              )}
            </div>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => viewMode === "week" ? navigateWeek('prev') : navigateDay('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {viewMode === "week" 
                  ? `Tuần ${getWeekNumber(selectedWeek)} - ${selectedWeek.getFullYear()}`
                  : formatDate(selectedDate)
                }
              </h2>
            </div>
            
            <button
              onClick={() => viewMode === "week" ? navigateWeek('next') : navigateDay('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Menu Display */}
        {viewMode === "week" ? (
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {weekDays.map((day, dayIndex) => (
              <DayMenuCard
                key={dayIndex}
                date={day}
                menu={getMenuForDate(day)}
                onAddDish={addDish}
                onDeleteDish={deleteDish}
                editingMeal={editingMeal}
                setEditingMeal={setEditingMeal}
              />
            ))}
          </div>
        ) : (
          <DayMenuCard
            date={selectedDate}
            menu={getMenuForDate(selectedDate)}
            onAddDish={addDish}
            onDeleteDish={deleteDish}
            editingMeal={editingMeal}
            setEditingMeal={setEditingMeal}
            fullWidth
          />
        )}
      </div>

      <Footer />
      
      {/* Add Dish Modal */}
      {editingMeal && (
        <AddDishModal
          meal={editingMeal}
          onSave={addDish}
          onClose={() => setEditingMeal(null)}
        />
      )}
    </div>
  );
}

function DayMenuCard({ date, menu, onAddDish, onDeleteDish, editingMeal, setEditingMeal, fullWidth = false }) {
  const formatDayHeader = (date) => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayName = days[date.getDay()];
    const dayNum = date.getDate();
    const month = date.getMonth() + 1;
    return `${dayName}, ${dayNum}/${month}`;
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 ${fullWidth ? 'w-full' : ''}`}>
      <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">
        {fullWidth ? formatDate(date) : formatDayHeader(date)}
      </h3>

      <div className="space-y-4">
        {MEALS.map((meal) => (
          <div key={meal.id} className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-700">{meal.name}</h4>
              <button
                onClick={() => setEditingMeal({ date, mealId: meal.id })}
                className="p-1 text-teal-500 hover:bg-teal-50 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {menu[meal.id] && menu[meal.id].length > 0 ? (
                menu[meal.id].map((dish, index) => (
                  <DishItem
                    key={index}
                    dish={dish}
                    onDelete={() => onDeleteDish(date, meal.id, index)}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">Chưa có món ăn</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DishItem({ dish, onDelete }) {
  return (
    <div className="bg-gray-50 rounded p-2 flex items-start justify-between">
      <div className="flex-1">
        <p className="font-medium text-gray-800">{dish.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
            {dish.foodGroup}
          </span>
          {dish.allergyNote && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
              ⚠ {dish.allergyNote}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={onDelete}
        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors ml-2"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

function AddDishModal({ meal, onSave, onClose }) {
  const [dish, setDish] = useState({
    name: "",
    foodGroup: "",
    allergyNote: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dish.name || !dish.foodGroup) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    onSave(meal.date, meal.mealId, dish);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Thêm món ăn</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên món ăn *
            </label>
            <input
              type="text"
              value={dish.name}
              onChange={(e) => setDish({ ...dish, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ví dụ: Cơm trắng, Thịt kho..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhóm thực phẩm *
            </label>
            <select
              value={dish.foodGroup}
              onChange={(e) => setDish({ ...dish, foodGroup: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            >
              <option value="">Chọn nhóm thực phẩm</option>
              {FOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú dị ứng (tùy chọn)
            </label>
            <input
              type="text"
              value={dish.allergyNote}
              onChange={(e) => setDish({ ...dish, allergyNote: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ví dụ: Có đậu phộng, chứa gluten..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
            >
              Thêm món
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function formatDate(date) {
  return date.toLocaleDateString('vi-VN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}


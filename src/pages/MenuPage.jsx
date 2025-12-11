import React, { useState, useEffect } from "react";
import axios from "axios"; // Nhớ cài đặt: npm install axios
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { X, Calendar, ChevronLeft, ChevronRight, Utensils, AlertTriangle, Loader2 } from "lucide-react";


const API_BASE_URL = "https://bk-kindergarten.fly.dev/api/v1/menus";

const MEALS = [
  { id: "breakfast", name: "Ăn sáng" },
  { id: "morning_snack", name: "Ăn phụ buổi sáng" },
  { id: "lunch", name: "Ăn trưa" },
  { id: "afternoon_snack", name: "Ăn xế" }
];

const DAY_NAMES = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];


function formatDate(date) {
  return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function getDateKey(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

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

// --- SUB COMPONENTS (READ ONLY) ---

function DishItemReadOnly({ dish }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 flex items-start justify-between border border-gray-100 mb-2 hover:bg-teal-50 transition-colors">
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-base">{dish.name}</p>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          {/* Mapping: Nutrients -> FoodGroup */}
          <span className="text-xs font-medium bg-white text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
            {dish.foodGroup}
          </span>
          {/* Mapping: Allergy -> AllergyNote */}
          {dish.allergyNote && (
            <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3"/> {dish.allergyNote}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// === CARD HIỂN THỊ THỰC ĐƠN ===
function MenuDayCardReadOnly({ menu }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MEALS.map((meal) => (
          <div key={meal.id} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm h-full">
            <h4 className="font-bold text-teal-700 mb-4 flex items-center gap-2 text-lg uppercase tracking-wide border-b border-gray-100 pb-2">
                  <Utensils className="w-5 h-5"/>
                  {meal.name}
            </h4>
            
            <div className="flex flex-col gap-2">
              {menu && menu[meal.id] && menu[meal.id].length > 0 ? (
                menu[meal.id].map((dish, index) => (
                  <DishItemReadOnly key={index} dish={dish} />
                ))
              ) : (
                <p className="text-sm text-gray-400 italic pl-2 py-2">Chưa có món ăn</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MODAL CHI TIẾT NGÀY ---
function MealViewModal({ date, menu, onClose }) {
  const dayName = DAY_NAMES[date.getDay()];
  const dateStr = formatDate(date);

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-all animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-teal-600 text-black">
          <div>
            <p className="text-teal-100 text-sm font-medium mb-1">Chi tiết thực đơn</p>
            <h3 className="text-2xl font-bold flex items-center gap-2 text-black">
              {dayName}, {dateStr}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
          <MenuDayCardReadOnly menu={menu} />
        </div>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---

export default function MenuParentPage() {
  const [selectedWeek, setSelectedWeek] = useState(new Date()); 
  const [selectedViewDate, setSelectedViewDate] = useState(new Date()); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State chứa dữ liệu API
  const [menuData, setMenuData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const weekDays = getWeekDays(selectedWeek);

  // --- API FETCHING ---
  const fetchMenuData = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(API_BASE_URL);
        const rawData = response.data; // List<MenuGroupResponse>
        
        const newMenuData = {};

        rawData.forEach(group => {
            const dateKey = group.menuDay; // "08/12/2025" (DD/MM/YYYY)
            if (!newMenuData[dateKey]) newMenuData[dateKey] = {};

            group.menus.forEach(menuItem => {
                let mealKey = menuItem.meal.toLowerCase();
                if (menuItem.meal === "Breakfast") mealKey = "breakfast";
                else if (menuItem.meal === "Lunch") mealKey = "lunch";
                else if (menuItem.meal === "Afternoon Snack") mealKey = "afternoon_snack";
                else if (menuItem.meal === "Morning Snack") mealKey = "morning_snack";

                // Map Dishes
                const mappedDishes = menuItem.dishes.map(d => ({
                    id: d.id,
                    name: d.name,        
                    foodGroup: d.nutrients || "Khác", 
                    allergyNote: d.allergy || ""      
                }));

                newMenuData[dateKey][mealKey] = mappedDishes;
            });
        });

        setMenuData(newMenuData);
    } catch (error) {
        console.error("Lỗi khi tải thực đơn:", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  // Lấy menu của một ngày cụ thể từ State
  const getMenuForDate = (date) => {
    const key = getDateKey(date); // DD/MM/YYYY
    return menuData[key] || {};
  };

  const todayMenu = getMenuForDate(new Date());

  const handleDayClick = (date) => {
    setSelectedViewDate(date);
    setIsModalOpen(true);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(newDate);
  };
  
  const isToday = (date) => date.toDateString() === new Date().toDateString();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* CSS Styles nội bộ */}
      <style>{`
        .custom-calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1rem; width: 100%; }
        .day-box { height: 160px; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 1rem; border: 2px solid transparent; transition: all 0.2s ease; cursor: pointer; position: relative; }
        .day-box-normal { background-color: white; border-color: #e5e7eb; color: #4b5563; }
        .day-box-normal:hover { border-color: #2dd4bf; background-color: #f0fdfa; transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); z-index: 10; }
        .day-box-today { background-color: #0d9488; border-color: #0d9488; color: white; box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3); transform: scale(1.05); z-index: 20; }
        .day-box-today:hover { background-color: #0f766e; }
      `}</style>

      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          
          {/* HEADER KHU VỰC LỊCH */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-7 h-7 text-teal-500" />
                Thực đơn Tuần {getWeekNumber(selectedWeek)}
              </h1>
              <p className="text-gray-500 text-sm mt-1 ml-9">
                {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
              </p>
            </div>

            {/* THANH ĐIỀU HƯỚNG */}
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl w-fit border border-gray-100 self-start md:self-auto">
              <button onClick={() => navigateWeek('prev')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-600 transition-all hover:text-teal-600">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="w-px h-6 bg-gray-200"></div>
              <button onClick={() => navigateWeek('next')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-gray-600 transition-all hover:text-teal-600">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* LỊCH 7 NGÀY */}
          <div className="w-full overflow-x-auto p-4 pb-8 overflow-y-visible">
            <div className="custom-calendar-grid min-w-[700px] md:min-w-0">
              {weekDays.map((day, index) => {
                const dayName = DAY_NAMES[day.getDay()];
                const isCurrentDay = isToday(day);
                
                return (
                  <div
                    key={index}
                    onClick={() => handleDayClick(day)}
                    className={`day-box ${isCurrentDay ? 'day-box-today' : 'day-box-normal'}`}
                  >
                    <span className={`text-sm font-bold uppercase mb-2 ${isCurrentDay ? 'text-teal-100' : 'text-gray-400'}`}>
                      {dayName.replace("Chủ Nhật", "CN")}
                    </span>
                    <span className="text-5xl font-extrabold tracking-tighter">
                      {day.getDate()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* NỘI DUNG HÔM NAY */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1.5 h-10 bg-teal-500 rounded-full shadow-sm"></div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Thực đơn hôm nay</h2>
              <p className="text-gray-500 text-base font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4"/>
                {DAY_NAMES[new Date().getDay()]}, {formatDate(new Date())}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 min-h-[200px]">
             {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full py-10 text-gray-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-2 text-teal-500"/>
                    <p>Đang tải thực đơn...</p>
                </div>
             ) : (
                <MenuDayCardReadOnly menu={todayMenu} />
             )}
          </div>
        </div>
      </div>

      <Footer />
      
      {isModalOpen && (
        <MealViewModal
          date={selectedViewDate}
          menu={getMenuForDate(selectedViewDate)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
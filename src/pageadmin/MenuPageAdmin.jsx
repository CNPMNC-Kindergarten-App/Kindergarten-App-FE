import React, { useState, useEffect } from "react";
import { Header } from "../components/Headeradmin";
import { Footer } from "../components/Footer";
import { 
  X, Calendar, ChevronLeft, ChevronRight, Utensils, 
  AlertTriangle, Plus, Trash2, Edit2, Save, ChefHat 
} from "lucide-react";

// --- DỮ LIỆU CỐ ĐỊNH ---
const FOOD_GROUPS = [
  "Tinh bột", "Đạm", "Rau củ", "Trái cây", "Sữa", "Chất béo", "Đồ uống"
];

const MEALS = [
  { id: "breakfast", name: "Ăn sáng" },
  { id: "morning_snack", name: "Ăn phụ buổi sáng" },
  { id: "lunch", name: "Ăn trưa" },
  { id: "afternoon_snack", name: "Ăn xế" }
];

const DAY_NAMES = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

// --- MOCK DATA BAN ĐẦU ---
const INITIAL_MENU_DATA = {
  "2025-12-08": { 
    "breakfast": [{ id: 1, name: "Bún Bò Huế", foodGroup: "Đạm", allergyNote: "" }],
    "lunch": [
      { id: 2, name: "Cơm Gà", foodGroup: "Đạm", allergyNote: "" },
      { id: 3, name: "Canh Chua", foodGroup: "Rau củ", allergyNote: "" }
    ],
  },
};

// --- HELPER FUNCTIONS ---
function formatDate(date) {
  return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
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

function DishFormModal({ isOpen, onClose, onSave, initialData, mealName }) {
  const [formData, setFormData] = useState({
    name: "",
    foodGroup: FOOD_GROUPS[0],
    allergyNote: ""
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({ name: "", foodGroup: FOOD_GROUPS[0], allergyNote: "" });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên món ăn");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden transform scale-100 transition-all" 
      style={{
        width : '500px',
        borderRadius : '24px',
        border : '3px solid black'
      }}>
        
        {/* Header*/} 
        <div className="bg-white p-8 pb-4 border-b border-gray-100 flex justify-between items-start">
          <div>
            <span className="block text-gray-500 font-bold uppercase tracking-wider text-sm mb-1">
              {initialData ? "Chỉnh sửa" : "Thêm mới"}
            </span>
            <h3 className="text-3xl font-black text-gray-800">
              {mealName || "Món ăn"}
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Tên món ăn */}
          <div className="space-y-3">
            <label className="block text-lg font-bold text-gray-700">
              Tên món ăn <span className="text-red-500 text-xl">*</span>
            </label>
            <input 
              type="text"
              className="w-full bg-white border-2 border-gray-200 text-gray-900 text-lg rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 block w-full p-4 transition-all outline-none font-medium placeholder:text-gray-400"
              placeholder="Nhập tên món ăn..."
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              autoFocus
            />
          </div>

          {/* Nhóm thực phẩm */}
          <div className="space-y-3">
            <label className="block text-lg font-bold text-gray-700">
              Nhóm thực phẩm
            </label>
            <div className="relative">
              <select
                className="w-full bg-white border-2 border-gray-200 text-gray-900 text-lg rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 block w-full p-4 appearance-none transition-all outline-none font-medium cursor-pointer"
                value={formData.foodGroup}
                onChange={(e) => setFormData({...formData, foodGroup: e.target.value})}
              >
                {FOOD_GROUPS.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ghi chú dị ứng */}
          <div className="space-y-3">
            <label className="block text-lg font-bold text-gray-700 flex justify-between">
              Ghi chú dị ứng
              <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-md">Không bắt buộc</span>
            </label>
            <input 
              type="text"
              className="w-full bg-white border-2 border-gray-200 text-gray-900 text-lg rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 block w-full p-4 transition-all outline-none font-medium placeholder:text-gray-400"
              placeholder="Ví dụ: Hải sản, Đậu phộng..."
              value={formData.allergyNote}
              onChange={(e) => setFormData({...formData, allergyNote: e.target.value})}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-4 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl text-lg font-bold transition-all"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              className="flex-1 py-4 text-white bg-blue-600 hover:bg-teal-700 rounded-xl text-lg font-bold shadow-lg shadow-teal-200 transition-all transform active:scale-95"
            >
              {initialData ? "Cập nhật" : "Thêm món"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS (EDITABLE) ---

function DishItemEditable({ dish, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg p-3 flex items-start justify-between border border-gray-200 hover:border-teal-300 hover:shadow-sm transition-all group">
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-base">{dish.name}</p>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <span className="text-xs font-medium bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-100">
            {dish.foodGroup}
          </span>
          {dish.allergyNote && (
            <span className="text-xs font-medium bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full border border-orange-100 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3"/> {dish.allergyNote}
            </span>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-1">
        <button 
          onClick={onEdit}
          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
          title="Sửa món"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button 
          onClick={onDelete}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
          title="Xóa món"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function MenuDayCardEditable({ menu, onAddDish, onEditDish, onDeleteDish }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MEALS.map((meal) => (
          <div key={meal.id} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col h-full">
            
            {/* Header Bữa ăn */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <h4 className="font-bold text-teal-700 flex items-center gap-2 text-sm uppercase tracking-wide">
                  <div className="p-1.5 bg-teal-100 rounded-full">
                    <Utensils className="w-4 h-4 text-teal-600"/>
                  </div>
                  {meal.name}
              </h4>
            </div>
            
            {/* Danh sách món */}
            <div className="flex flex-col gap-2 flex-1">
              {menu[meal.id] && menu[meal.id].length > 0 ? (
                menu[meal.id].map((dish, index) => (
                  <DishItemEditable 
                    key={index} 
                    dish={dish} 
                    onEdit={() => onEditDish(meal.id, index, dish)}
                    onDelete={() => onDeleteDish(meal.id, index)}
                  />
                ))
              ) : null}

              {/* NÚT THÊM MÓN ĂN */}
              <button 
                onClick={() => onAddDish(meal.id)}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:text-teal-600 hover:border-teal-400 hover:bg-teal-50 transition-all flex items-center justify-center gap-2 group mt-auto"
              >
                <div className="bg-gray-100 text-gray-400 group-hover:bg-teal-100 group-hover:text-teal-600 rounded-full p-1 transition-colors">
                    <Plus className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Thêm món ăn</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---

export default function MenuTeacher() {
  const [selectedWeek, setSelectedWeek] = useState(new Date()); 
  const [selectedViewDate, setSelectedViewDate] = useState(new Date()); 
  
  // State quản lý dữ liệu thực đơn
  const [menuData, setMenuData] = useState(INITIAL_MENU_DATA);

  // State cho Modal Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null); 
  const [activeMealId, setActiveMealId] = useState(null); 

  const weekDays = getWeekDays(selectedWeek);

  // --- LOGIC XỬ LÝ DỮ LIỆU ---

  const getMenuForDate = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset*60*1000));
    const key = localDate.toISOString().split('T')[0];
    return { key, data: menuData[key] || {} };
  };

  const currentMenu = getMenuForDate(selectedViewDate);

  // Mở form thêm mới
  const handleAddDishClick = (mealId) => {
    setActiveMealId(mealId);
    setCurrentEdit(null);
    setIsFormOpen(true);
  };

  // Mở form chỉnh sửa
  const handleEditDishClick = (mealId, index, dish) => {
    setActiveMealId(mealId);
    setCurrentEdit({ index, data: dish });
    setIsFormOpen(true);
  };

  // Xóa món ăn
  const handleDeleteDish = (mealId, index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa món này?")) {
      const { key } = currentMenu;
      const newMenuData = { ...menuData };
      
      const updatedMealList = [...(newMenuData[key]?.[mealId] || [])];
      updatedMealList.splice(index, 1);

      newMenuData[key] = {
        ...newMenuData[key],
        [mealId]: updatedMealList
      };
      
      setMenuData(newMenuData);
    }
  };

  // Lưu món ăn
  const handleSaveDish = (dishData) => {
    const { key } = currentMenu;
    const newMenuData = { ...menuData };
    
    if (!newMenuData[key]) newMenuData[key] = {};
    
    const currentMealList = newMenuData[key][activeMealId] || [];
    let updatedMealList = [...currentMealList];

    if (currentEdit) {
      updatedMealList[currentEdit.index] = { ...dishData, id: currentEdit.data.id || Date.now() };
    } else {
      updatedMealList.push({ ...dishData, id: Date.now() });
    }

    newMenuData[key] = {
      ...newMenuData[key],
      [activeMealId]: updatedMealList
    };

    setMenuData(newMenuData);
  };

  // --- NAVIGATION ---
  const handleDayClick = (date) => {
    setSelectedViewDate(date);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(newDate);
  };
  
  const isToday = (date) => date.toDateString() === new Date().toDateString();
  const isSelected = (date) => date.toDateString() === selectedViewDate.toDateString();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <style>{`
        .custom-calendar-grid {
          display: grid; grid-template-columns: repeat(7, 1fr); gap: 1rem; width: 100%;
        }
        .day-box {
          height: 160px; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
          border-radius: 1rem; border: 2px solid transparent; transition: all 0.2s ease; cursor: pointer; position: relative;
        }
        .day-box-normal { background-color: white; border-color: #e5e7eb; color: #4b5563; }
        .day-box-normal:hover { border-color: #2dd4bf; background-color: #f0fdfa; transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); z-index: 10; }
        
        .day-box-today { background-color: #0d9488; border-color: #0d9488; color: white; box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3); transform: scale(1.05); z-index: 20; }
        
        .day-box-selected { border-color: #0d9488; background-color: #ccfbf1; color: #115e59; transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
      `}</style>

      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          
          {/* HEADER KHU VỰC LỊCH */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-7 h-7 text-teal-500" />
                  Quản lý Thực đơn Tuần {getWeekNumber(selectedWeek)}
                </h1>
                <p className="text-gray-500 text-sm mt-1 ml-9">
                  {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
                </p>
              </div>
            </div>

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
                const isSelectedDay = isSelected(day);
                
                let boxClass = 'day-box-normal';
                if (isCurrentDay) boxClass = 'day-box-today';
                else if (isSelectedDay) boxClass = 'day-box-selected';

                return (
                  <div
                    key={index}
                    onClick={() => handleDayClick(day)}
                    className={`day-box ${boxClass}`}
                  >
                    <span className={`text-sm font-bold uppercase mb-2 ${isCurrentDay ? 'text-teal-100' : 'text-inherit'}`}>
                      {dayName.replace("Chủ Nhật", "CN")}
                    </span>
                    <span className="text-5xl font-extrabold tracking-tighter">
                      {day.getDate()}
                    </span>
                    {!isCurrentDay && isSelectedDay && (
                      <div className="absolute bottom-3 w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* NỘI DUNG CHÍNH - KHU VỰC CHỈNH SỬA */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-teal-500 rounded-full shadow-sm"></div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Thực đơn: {DAY_NAMES[selectedViewDate.getDay()]}
                </h2>
                <p className="text-gray-500 text-base font-medium">
                  {formatDate(selectedViewDate)}
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium border border-blue-100 flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Chế độ chỉnh sửa
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
             <MenuDayCardEditable 
                menu={currentMenu.data} 
                onAddDish={handleAddDishClick}
                onEditDish={handleEditDishClick}
                onDeleteDish={handleDeleteDish}
             />
          </div>
        </div>
      </div>

      <Footer />

      {/* MODAL FORM */}
      <DishFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveDish}
        initialData={currentEdit?.data}
        mealName={activeMealId ? MEALS.find(m => m.id === activeMealId)?.name : ""}
      />
    </div>
  );
}
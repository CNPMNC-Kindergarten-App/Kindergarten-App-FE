// src/mocks/absenceMock.js

const STORAGE_KEY = "absenceStore";

let absenceStore = [];

// ===================== internal helpers =====================

function loadAbsenceStore() {
  if (typeof window === "undefined") return;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      absenceStore = [];
      return;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      absenceStore = parsed;
    } else {
      absenceStore = [];
    }
  } catch (error) {
    console.error("Failed to load absence store:", error);
    absenceStore = [];
  }
}

function saveAbsenceStore() {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(absenceStore));
  } catch (error) {
    console.error("Failed to save absence store:", error);
  }
}

function generateId() {
  // Đủ cho môi trường mock trên trình duyệt
  return `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}

// ===================== public API =====================

/**
 * Khởi tạo store từ localStorage.
 * Gọi một lần ở cấp page (vd. trong useEffect của AttendancePage / AbsenceFormPage).
 */
export function initAbsenceStore() {
  if (absenceStore.length === 0) {
    loadAbsenceStore();
  }
}

/**
 * Tạo đơn nghỉ mới.
 *
 * payload cần có tối thiểu:
 * - childId: number | string
 * - childName: string
 * - startDate: "YYYY-MM-DD"
 * - endDate: "YYYY-MM-DD"
 * - reasonType: "illness" | "family" | "travel" | "other"
 * Có thể kèm:
 * - className?: string
 * - reasonDetail?: string
 * - note?: string
 * - attachmentName?: string
 */
export function createAbsenceRequest(payload) {
  const now = new Date().toISOString();

  const newItem = {
    id: generateId(),
    childId: payload.childId,
    childName: payload.childName,
    className: payload.className || null,
    startDate: payload.startDate,
    endDate: payload.endDate,
    reasonType: payload.reasonType,
    reasonDetail: payload.reasonDetail || "",
    note: payload.note || null,
    attachmentName: payload.attachmentName || null,
    status: "PENDING", // PENDING | APPROVED | REJECTED
    createdAt: now,
    updatedAt: now,
  };

  absenceStore = [newItem, ...absenceStore];
  saveAbsenceStore();

  return newItem;
}

/**
 * Lấy danh sách đơn nghỉ theo childId.
 */
export function getAbsencesByChildId(childId) {
  return absenceStore
    .filter((item) => String(item.childId) === String(childId))
    .sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
}

/**
 * Lấy toàn bộ đơn nghỉ (dùng cho debug hoặc trang giáo viên).
 */
export function getAllAbsences() {
  return [...absenceStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Lấy các đơn đang chờ duyệt.
 */
export function getPendingAbsences() {
  return absenceStore
    .filter((item) => item.status === "PENDING")
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * Lấy các đơn đã duyệt.
 */
export function getApprovedAbsences() {
  return absenceStore
    .filter((item) => item.status === "APPROVED")
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * Cập nhật trạng thái đơn nghỉ.
 * status hợp lệ: "PENDING" | "APPROVED" | "REJECTED"
 * extra dùng để lưu thêm thông tin duyệt (vd. teacherName, approvedAt).
 */
export function updateAbsenceStatus(id, status, extra = {}) {
  const allowed = ["PENDING", "APPROVED", "REJECTED"];
  if (!allowed.includes(status)) {
    throw new Error(`Invalid absence status: ${status}`);
  }

  const now = new Date().toISOString();

  let found = false;
  absenceStore = absenceStore.map((item) => {
    if (item.id !== id) return item;

    found = true;
    return {
      ...item,
      status,
      updatedAt: now,
      ...extra,
    };
  });

  if (found) {
    saveAbsenceStore();
  }

  return found;
}

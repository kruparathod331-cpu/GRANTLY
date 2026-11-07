/**
 * GRANTLY LocalStorage Service
 * Safe persistence layer with fallback and structured initial seed.
 * Created by Krupa Rathod.
 */

const STORAGE_KEYS = {
  PROFILE: 'grantly_student_profile',
  SAVED_SCHOLARSHIPS: 'grantly_saved_scholarships',
  APPLICATIONS: 'grantly_applications',
  DOCUMENTS: 'grantly_documents',
  SAVED_VIDEOS: 'grantly_saved_videos',
  ONBOARDED: 'grantly_is_onboarded',
};

export const getStorageItem = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing ${key} to localStorage:`, err);
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`Error removing ${key} from localStorage:`, err);
  }
};

export { STORAGE_KEYS };

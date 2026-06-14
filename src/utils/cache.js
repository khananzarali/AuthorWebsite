/**
 * Saves data to localStorage with an expiration time.
 * @param {string} key - The localStorage key
 * @param {any} data - The data to store
 * @param {number} ttlMinutes - Time to live in minutes
 */
export const setCache = (key, data, ttlMinutes = 60) => {
  try {
    const now = new Date();
    const item = {
      data: data,
      expiry: now.getTime() + ttlMinutes * 60000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error("Error setting cache:", e);
  }
};

/**
 * Retrieves data from localStorage if it hasn't expired.
 * @param {string} key - The localStorage key
 * @returns {any|null} The cached data, or null if expired/not found
 */
export const getCache = (key) => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.data;
  } catch (e) {
    console.error("Error getting cache:", e);
    return null;
  }
};

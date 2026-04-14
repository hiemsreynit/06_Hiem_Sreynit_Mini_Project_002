// services/category.service.js
const BASE_URL = process.env.API_BASE_URL; // 👈 replace with your actual base URL

export async function getAllCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`); // 👈 adjust endpoint path
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    return data.payload; // 👈 adjust if your response shape differs
  } catch (error) {
    console.error("Category service error:", error);
    return [];
  }
}

export function buildCategoryMap(categories) {
  const map = {};
  categories.forEach((cat) => {
    map[cat.categoryId] = cat.name; // 👈 adjust field names to match your API
  });
  return map;
}
import { API_BASE_URL } from "./auth";

export type DashboardStats = {
  totalMenus: number;
  totalViews: number;
  mostViewedMenu: {
    id: string;
    name: string;
    views: number;
  } | null;
  totalCategories: number;
  totalItems: number;
  avgViewsPerMenu: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/stats/dashboard`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch dashboard statistics");
  }

  return res.json();
}
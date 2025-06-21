import { API_BASE_URL } from "./auth";

export async function getProfile() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch profile");
  }

  return res.json();
}

export async function updateProfile(data: {
  restaurantName: string;
  email: string;
  phoneNumber: string;
  password?: string;
}) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update profile");
  }

  return res.json();
}
const API_BASE_URL = import.meta.env.VITE_API_URL as string;

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL is not defined");
}

export const api = {
  async healthCheck() {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) {
      throw new Error("Health check failed");
    }
    return res.json();
  },
};

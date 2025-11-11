import api from "../apiClient";

export const getFeatures = async () => {
  try {
    const response = await api.get("/feature-tabs", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ getBanners API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


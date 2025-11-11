import api from "../apiClient";

export const getBanners = async () => {
  try {
    const response = await api.get("/banner", {
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
export const getBannerById = async (id) => {
  try {
    const response = await api.get(`/banner/${id}`, {
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

export const createBanner = async (data: any) => {
  try {
    const response = await api.post("/banner/create-banner", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log("✅ createBanner API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ createBanner API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateBanner = async (id: number, data: any) => {
  try {
    const response = await api.post(`/banner/update-banner/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log("✅ createBanner API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ createBanner API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteBannerById = async (id) => {
  try {
    const response = await api.get(`/banner/delete/${id}`, {
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

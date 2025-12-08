import api from "../apiClient";

export const getAbout = async () => {
  try {
    const response = await api.get("/about", {
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

export const updateAbout = async (data: any) => {
  try {
    const response = await api.post("/about/update", data, {
      headers: {
        "Content-Type": "application/json",
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
export const uploadAboutImage = async (data: any) => {
  try {
    const response = await api.post("/about/upload-image", data, {
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
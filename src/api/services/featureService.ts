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

export const getShowcaseFeatures = async () => {
  try {
    const response = await api.get("/feature-showcase/active", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "❌ getShowcaseFeatures API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const updateShowcaseFeatures = async (id, data) => {
  try {
    const response = await api.put(`/feature-showcase/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "❌ getShowcaseFeatures API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

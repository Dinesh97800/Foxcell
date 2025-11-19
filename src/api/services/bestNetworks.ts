import api from '../apiClient';

export const getBestNetworks = async () => {
  try {
    const response = await api.get('/best-network', {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      '❌ getBanners API error:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createBestNetwork = async (data: any) => {
  try {
    const response = await api.post('/best-network', data, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    console.log('✅ createBanner API response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      '❌ createBanner API error:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateBestNetwork = async (id: any, data: any) => {
  try {
    const response = await api.put(`/best-network/${id}`, data, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    console.log('✅ createBanner API response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      '❌ createBanner API error:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBestNetworkById = async (id) => {
  try {
    const response = await api.get(`/best-network/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      '❌ getBanners API error:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteBestNetworkById = async (id) => {
  try {
    const response = await api.delete(`/best-network/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      '❌ getBanners API error:',
      error.response?.data || error.message
    );
    throw error;
  }
};

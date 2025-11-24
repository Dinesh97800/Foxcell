import api from '../apiClient';

export const submitContactForm = async (data) => {
  try {
    const response = await api.post('/contact', data);
    return response.data;
  } catch (err: any) {
    console.error('❌ contactForm error:', err.response?.data || err.message);
    throw err;
  }
};

export const getContacts = () => api.get('/contact/all');
export const getContact = (id: string) => api.get(`/contact/${id}`);
export const replyContact = (id: string, reply: string) =>
  api.post(`/contact/reply/${id}`, { reply });

export const getmetaValues = async (data) => {
  try {
    const response = await api.post('/contact/meta/all', data);
    return response.data;
  } catch (err: any) {
    console.error('❌ contactForm error:', err.response?.data || err.message);
    throw err;
  }
};
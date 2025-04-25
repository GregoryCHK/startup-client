// Developement Setup
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  CONFIRMATIONS: `${API_BASE_URL}/api/confirmations/`,
  ACTIONPLANS: `${API_BASE_URL}/api/action-plans/`,
  DELETEACTIONPLAN: `${API_BASE_URL}/api/action-plans/by-confirmation/`,
  ACCOMMODATION: `${API_BASE_URL}/api/accommodation/`,
  DELETEACCOMMODATION: `${API_BASE_URL}/api/accommodation/by-confirmation/`,
};

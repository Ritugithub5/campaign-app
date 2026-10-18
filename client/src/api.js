const API = '/api';

const handle = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

export const getCampaigns = () =>
  fetch(`${API}/campaigns`).then(handle);

export const getCampaign = (id) =>
  fetch(`${API}/campaigns/${id}`).then(handle);

export const createCampaign = (body) =>
  fetch(`${API}/campaigns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(handle);

export const contribute = (id, amount) =>
  fetch(`${API}/campaigns/${id}/contribute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  }).then(handle);

// 👇 NEW: Specific admin endpoints 👇
export const getPendingCampaigns = () =>
  fetch(`${API}/campaigns?status=pending`).then(handle);

export const getRejectedCampaigns = () =>
  fetch(`${API}/campaigns?status=rejected`).then(handle);

export const getAllCampaigns = () =>
  fetch(`${API}/campaigns?all=1`).then(handle);

// UPDATED: Accepts the full review object
export const reviewCampaign = (id, reviewData) =>
  fetch(`${API}/campaigns/${id}/review`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  }).then(handle);
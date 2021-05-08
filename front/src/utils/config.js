export const baseUrl =
  !window.location.host.includes('localhost') || true
    ? 'https://noccco.in/api'
    : 'http://localhost:8000';

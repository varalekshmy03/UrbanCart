import '@testing-library/jest-dom';

window.alert = jest.fn();

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  (window.alert as jest.Mock).mockClear();
});

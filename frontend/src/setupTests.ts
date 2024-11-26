import '@testing-library/jest-dom';

window.scrollTo = jest.fn();

jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('focus-trap', () => ({
  createFocusTrap: () => ({
    activate: jest.fn(),
    deactivate: jest.fn(),
  }),
}));

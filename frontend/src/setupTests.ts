import '@testing-library/jest-dom';

window.scrollTo = jest.fn();

jest.spyOn(console, 'error').mockImplementation(() => {});

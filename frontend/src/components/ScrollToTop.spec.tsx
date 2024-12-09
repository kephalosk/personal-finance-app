import ScrollToTop from './ScrollToTop';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ReactFutureFlags } from '../constants/ReactFutureFlags';

window.scrollTo = jest.fn();

describe('ScrollToTop', () => {
  it('scrolls to top of page when the pathname changes', async () => {
    render(
      <MemoryRouter future={ReactFutureFlags} initialEntries={['/initial']}>
        <ScrollToTop />
        <Routes>
          <Route path="/initial" element={<div>Initial Page</div>} />
          <Route path="/next" element={<div>Next Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const nextRoute = '/next';
    window.history.pushState({}, 'Next page', nextRoute);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

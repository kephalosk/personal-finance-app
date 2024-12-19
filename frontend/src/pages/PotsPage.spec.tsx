import { fireEvent, render, screen } from '@testing-library/react';
import PotsPage from './PotsPage';
import { getPots } from '../globals/services/PotService';
import { mockedPots } from '../fixtures/MockedPots';
import { act } from 'react';
import HeaderBar from '../components/HeaderBar';
import PotPageGrid from '../components/pots/PotPageGrid';

jest.mock('../components/HeaderBar', () =>
  jest.fn((props) => <div data-testid="header-bar" onClick={props.handleClick}></div>)
);
jest.mock('../components/pots/PotPageGrid', () =>
  jest.fn(() => <div data-testid="pot-page-grid"></div>)
);

jest.mock('../globals/services/PotService', () => ({
  getPots: jest.fn(),
}));

describe('PotsPage', () => {
  beforeEach(() => {
    (getPots as jest.Mock).mockResolvedValue(mockedPots);
  });

  it('renders div potsPage', async () => {
    const cut = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<PotsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.potsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component HeaderBar', async () => {
    await act(async (): Promise<void> => {
      render(<PotsPage />);
    });

    const htmlElement = screen.getByTestId('header-bar');

    expect(htmlElement).toBeInTheDocument();
    expect(HeaderBar).toHaveBeenLastCalledWith(
      { buttonText: '+ Add New Pot', h1Headline: 'Pots', handleClick: expect.any(Function) },
      {}
    );
  });

  it('renders component PotPageGrid', async () => {
    await act(async (): Promise<HTMLElement> => {
      const { container } = render(<PotsPage />);
      return container;
    });

    const htmlElement = screen.getByTestId('pot-page-grid');

    expect(htmlElement).toBeInTheDocument();
    expect(PotPageGrid).toHaveBeenNthCalledWith(1, { isLoading: true, pots: [] }, {});
    expect(PotPageGrid).toHaveBeenNthCalledWith(2, { isLoading: false, pots: mockedPots }, {});
  });

  it('handles AddNewPot', async () => {
    await act(async (): Promise<void> => {
      render(<PotsPage />);
    });

    const htmlElement = screen.getByTestId('header-bar');
    fireEvent.click(htmlElement!);

    expect(htmlElement).toBeInTheDocument();
    //TODO fe-26-add-new-pot
  });
});

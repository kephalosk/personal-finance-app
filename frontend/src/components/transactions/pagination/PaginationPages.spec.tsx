import { fireEvent, render } from '@testing-library/react';
import PaginationPages from './PaginationPages';
import React from 'react';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';

jest.mock('../../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('PaginationPages', () => {
  let mockOnClick: jest.Mock<() => void>;

  const indexMax = 10;
  const currentIndex = 5;

  const testProps = {
    indexMax,
    currentIndex,
  };

  beforeEach(() => {
    mockOnClick = jest.fn();
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div paginationPages', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElement = container.querySelector('.paginationPages');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders buttons with prop indexMax times', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElements = container.querySelectorAll('.paginationPagesButton');

    expect(htmlElements).toHaveLength(indexMax);
  });

  it('renders buttons with correct number', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElements = container.querySelectorAll('.paginationPagesButton');

    htmlElements.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });

  it('sets active button with prop currentIndex', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElements = container.querySelectorAll('.paginationPagesButton');

    expect(htmlElements[currentIndex]).toHaveClass('isActive');
    htmlElements.forEach((button, index) => {
      if (index !== currentIndex) {
        expect(button).not.toHaveClass('isActive');
      }
    });
  });

  it('sets not active button with prop currentIndex', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElements = container.querySelectorAll('.paginationPagesButton');

    expect(htmlElements[currentIndex]).not.toHaveClass('isNotActive');
    htmlElements.forEach((button, index) => {
      if (index !== currentIndex) {
        expect(button).toHaveClass('isNotActive');
      }
    });
  });

  it('calls onClick with correct index when button is clicked', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const buttons = container.querySelectorAll('.paginationPagesButton');
    buttons.forEach((button, index) => {
      fireEvent.click(buttons[index]!);
      expect(mockOnClick).toHaveBeenLastCalledWith(index);
    });
  });

  describe('Mobile View', () => {
    it('renders button pageOne if indexMax > 3 and currentIndex === indexMax - 1', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} {...testProps} indexMax={4} currentIndex={3} />
      );

      const htmlElement = container.querySelector('.pageOne');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders button placeholderLeft if indexMax > 3 and currentIndex >= indexMax - 2', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} {...testProps} indexMax={4} currentIndex={3} />
      );

      const htmlElement = container.querySelector('.placeholderLeft');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders button pageBetween if indexMax > 3 and currentIndex < indexMax - 2', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} {...testProps} indexMax={4} currentIndex={1} />
      );

      const htmlElement = container.querySelector('.pageBetween');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders button placeholderRight if indexMax > 3 and currentIndex < indexMax - 2', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} {...testProps} indexMax={4} currentIndex={1} />
      );

      const htmlElement = container.querySelector('.placeholderRight');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders button pagePenultimate if indexMax > 3 and currentIndex === indexMax - 2', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} {...testProps} indexMax={4} currentIndex={2} />
      );

      const htmlElement = container.querySelector('.pagePenultimate');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders button pageLast if indexMax > 3', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} {...testProps} indexMax={4} />
      );

      const htmlElement = container.querySelector('.pageLast');

      expect(htmlElement).toBeInTheDocument();
    });

    it('triggers onPageClick when button with condition currentIndex === indexMax - 1 is clicked', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} currentIndex={3} indexMax={4} />
      );

      const button = container.querySelector('.pageOne');
      fireEvent.click(button!);

      expect(mockOnClick).toHaveBeenCalled();
    });

    it('triggers onPageClick when button with condition currentIndex < indexMax - 2 is clicked', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} currentIndex={1} indexMax={4} />
      );

      const button = container.querySelector('.pageBetween');
      fireEvent.click(button!);

      expect(mockOnClick).toHaveBeenCalled();
    });

    it('triggers onPageClick when button with condition currentIndex === indexMax - 2 is clicked', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} currentIndex={2} indexMax={4} />
      );

      const button = container.querySelector('.pagePenultimate');
      fireEvent.click(button!);

      expect(mockOnClick).toHaveBeenCalled();
    });

    it('triggers onPageClick when pageLast button is clicked', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <PaginationPages onPageClick={mockOnClick} currentIndex={3} indexMax={4} />
      );

      const button = container.querySelector('.pageLast');
      fireEvent.click(button!);

      expect(mockOnClick).toHaveBeenCalled();
    });
  });
});

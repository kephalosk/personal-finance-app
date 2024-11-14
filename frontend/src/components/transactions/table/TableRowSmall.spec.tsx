import { render, screen } from '@testing-library/react';
import React from 'react';
import { TableRowSmall } from './TableRowSmall';
import { TableRowProps } from '../../../model/props/TableRowProps';

describe('TableRowSmall', () => {
  const name: string = 'testName';
  const imgSrc: string = 'testImgSrc';
  const category: string = 'testCategory';
  const date: string = 'testDate';
  const value: number = 100.21;

  const testProps: TableRowProps = {
    name,
    imgSrc,
    category,
    date,
    value,
  };

  const imgAlt = 'icon of payment partner';

  it('renders div transactionsTableRowSmall', () => {
    const { container } = render(<TableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.transactionsTableRowSmall');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div tableRowSmallPartner', () => {
    const { container } = render(<TableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.tableRowSmallPartner');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div tableRowSmallNameCategoryWrapper', () => {
    const { container } = render(<TableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.tableRowSmallNameCategoryWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('passes prop name', () => {
    const { container } = render(<TableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.tableRowSmallPartnerName');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(name);
  });

  it('passes prop category', () => {
    const { container } = render(<TableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.tableRowSmallCategory');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(category);
  });

  it('renders div tableRowSmallValueDateWrapper', () => {
    const { container } = render(<TableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.tableRowSmallValueDateWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('passes prop date', () => {
    const { container } = render(<TableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.tableRowSmallDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(date);
  });

  it('passes prop value', () => {
    const { container } = render(<TableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.tableRowSmallValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`+$${value}`);
  });

  it('passes prop imgSrc', () => {
    render(<TableRowSmall {...testProps} />);

    const htmlElement = screen.getByAltText(imgAlt);

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', imgSrc);
  });
});
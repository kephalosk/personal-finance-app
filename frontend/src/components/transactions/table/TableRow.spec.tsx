import { render, screen } from '@testing-library/react';
import React from 'react';
import TableRow from './TableRow';
import { VorzeichenEnum } from '../../../model/enum/VorzeichenEnum';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';

describe('TableRow', () => {
  const name: string = 'testName';
  const imgSrc: string = 'testImgSrc';
  const category: string = 'testCategory';
  const date: string = 'testDate';
  const value: number = 100.21;

  const testProps = {
    name,
    imgSrc,
    category,
    date,
    value,
  };

  const imgAlt = 'icon of payment partner';

  it('renders hr transactionsTableLine', () => {
    const { container } = render(<TableRow {...testProps} />);

    const htmlElement = container.querySelector('.transactionsTableLine');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div transactionsTableRow', () => {
    const { container } = render(<TableRow {...testProps} />);

    const htmlElement = container.querySelector('.transactionsTableRow');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div tableRowPartner', () => {
    const { container } = render(<TableRow {...testProps} />);

    const htmlElement = container.querySelector('.tableRowPartner');

    expect(htmlElement).toBeInTheDocument();
  });

  it('passes prop name', () => {
    const { container } = render(<TableRow {...testProps} />);

    const htmlElement = container.querySelector('.tableRowPartnerName');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(name);
  });

  it('passes prop category', () => {
    const { container } = render(<TableRow {...testProps} />);

    const htmlElement = container.querySelector('.tableRowCategory');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(category);
  });

  it('passes prop date', () => {
    const { container } = render(<TableRow {...testProps} />);

    const htmlElement = container.querySelector('.tableRowDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(date);
  });

  it('passes positive prop value', () => {
    const { container } = render(<TableRow {...testProps} />);

    const htmlElement = container.querySelector('.tableRowValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${VorzeichenEnum.PLUS}$${value}`);
    expect(htmlElement).toHaveClass(ColorNameEnum.GREEN);
  });

  it('passes negative prop value', () => {
    const { container } = render(<TableRow {...testProps} value={-value} />);

    const htmlElement = container.querySelector('.tableRowValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${VorzeichenEnum.MINUS}$${value}`);
    expect(htmlElement).toHaveClass(ColorNameEnum.BLACK);
  });

  it('passes prop imgSrc', () => {
    render(<TableRow {...testProps} />);

    const htmlElement = screen.getByAltText(imgAlt);

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', imgSrc);
  });
});

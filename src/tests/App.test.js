import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { clear } from '@testing-library/user-event/dist/clear';
import React from 'react';
import App from '../App';
import Header from '../components/Header';
import PlanetsProvider from '../context/PlanetsProvider';
import PlanetsMock from './PlanetsMock';

describe('Requisitos TESTES: 5, 8 e 10', () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(PlanetsMock),
    });
    render(<App />)
  })

  afterEach(() => jest.clearAllMocks());

  test('1) Verificação do tamanho da tabela.', async () => {
  const table = await screen.findAllByTestId('planet-name')
  expect(table).toHaveLength(10);
});

test('2) Teste botões de filtro', async () => {
    const name = screen.getByTestId("name-filter")
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const value = screen.getByTestId("value-filter");
    const button = await screen.findByTestId('button-filter');

    expect(value).toHaveValue(0)
    expect(comparison).toHaveValue('maior que')
    expect(comparison).toHaveLength(3)
    expect(column).toHaveValue('population')
    expect(column).toHaveLength(5)
    
    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '12500');
    userEvent.click(button);
    userEvent.clear(value);
    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '1000');
    userEvent.click(button);
    userEvent.selectOptions(column, 'rotation_period');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.clear(value);
    userEvent.type(value, '25');
    userEvent.click(button);
    userEvent.type(name,'oo');
    userEvent.click(button);
  });

  test('3) verificação de mais botões do Header', async () => {
    const ascendente = screen.getByRole('radio', {  name: /ascendente/i});
    const descendente = screen.getByRole('radio', {  name: /descendente/i});
    const ordenar = screen.getByRole('button', {  name: /ordenar/i})
    const name = screen.getByTestId("name-filter")
    const columnSortFilter = screen.getByTestId("column-sort");
    const columnSortBtn = screen.getByTestId("column-sort-button")
    const dagobah = await screen.findByRole('cell', {  name: /Dagobah/i})
    const alderaan = await screen.findByRole('cell', {  name: /alderaan/i})
    const hoth = await screen.findByRole('cell', {  name: /hoth/i})
    const yavin = await screen.findByRole('cell', {  name: /yavin iv/i})

    expect(dagobah).toBeInTheDocument();
    userEvent.clear(name)
    expect(alderaan).toBeInTheDocument();
    expect(columnSortFilter).toHaveValue('population')
    expect(columnSortFilter).toHaveLength(5)
    userEvent.click(columnSortFilter);
    userEvent.click(columnSortBtn);
    userEvent.click(ascendente);
    expect(yavin).toBeInTheDocument();
    expect(hoth).toBeInTheDocument();
    userEvent.click(ordenar);

  })

  test('4) verificação do botão de ascender', async () => {
    const ascendente = screen.getByRole('radio', {  name: /ascendente/i});
    const columnSortFilter = screen.getByTestId("column-sort");
    const columnSortBtn = screen.getByTestId("column-sort-button")
    const planetName = await screen.findAllByTestId('planet-name');
  
    userEvent.selectOptions(columnSortFilter, 'population');
    userEvent.click(ascendente)
    userEvent.click(columnSortBtn)
    expect(planetName[0]).toHaveTextContent('Yavin IV');
  })

  test('5) verificação do botão de descender', async () => {
    const descendente = screen.getByRole('radio', {  name: /descendente/i});
    const columnSortFilter = screen.getByTestId("column-sort");
    const columnSortBtn = screen.getByTestId("column-sort-button")
    const planetName = await screen.findAllByTestId('planet-name');
  
    userEvent.selectOptions(columnSortFilter, 'population');
    userEvent.click(descendente)
    userEvent.click(columnSortBtn)
    expect(planetName[0]).toHaveTextContent('Yavin IV');
  })
  
})
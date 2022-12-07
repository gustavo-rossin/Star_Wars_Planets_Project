import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Header() {
  const { setSearchPlanet,
    setSelectedFilter,
    selected,
    setSelected,
    checkFilters,
    setCheckFilters,
    columnOptions,
    setColumnOptions,
    filteredSelection,
    setFilteredSelection,
    filteredColumn,
    setFilteredColumn,
    order,
    setOrder,
  } = useContext(PlanetsContext);

  useEffect(() => {
    setSelected({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  }, [columnOptions]);

  // Aula do Tiago da academia de lógica para fazer a questão 9
  const sortDataOrder = () => {
    const MINUS_ONE = -1;
    if (order === 'ASCENDER') {
      const orderedPlanets = filteredSelection.sort((a, b) => {
        if (b[filteredColumn] === 'unknown') {
          return MINUS_ONE;
        }
        return a[filteredColumn] - b[filteredColumn];
      });
      setFilteredSelection([...orderedPlanets]);
      console.log('teste', orderedPlanets);
    } else if (order === 'DESCENDER') {
      const orderedPlanets2 = filteredSelection.sort((a, b) => {
        if (b[filteredColumn] === 'unknown') {
          return MINUS_ONE;
        }
        return b[filteredColumn] - a[filteredColumn];
      });
      setFilteredSelection([...orderedPlanets2]);
      console.log('teste', orderedPlanets2);
    }
  };

  // Academia de Lógica do Tiago.

  const handleChange = ({ target: { value, name } }) => {
    setSelected({
      ...selected,
      [name]: value,
    });
  };

  const handleRepeatedFilter = () => {
    setCheckFilters([...checkFilters, selected]);

    const repeatedFilter = columnOptions.filter((el) => el !== selected.column);

    setColumnOptions(repeatedFilter);
  };

  const handleSelectedFilter = () => {
    setSelectedFilter(selected);
    handleRepeatedFilter();
  };

  const cssFilters = {
    color: 'red',
    display: 'flex',
    textAlign: 'left',
    flexDirection: 'column',
  };

  return (
    <div style={ { textAlign: 'center' } }>
      <h1>Projeto StarWars</h1>
      <label htmlFor="pesquisar">
        <input
          data-testid="name-filter"
          type="text"
          name="pesquisar"
          placeholder="Pesquisar"
          onChange={ ({ target: { value } }) => setSearchPlanet(value) }
        />
      </label>
      <br />
      <br />
      <form>
        <select
          data-testid="column-filter"
          name="column"
          value={ selected.column }
          onChange={ handleChange }
        >
          { columnOptions.map(((el) => (
            <option key={ el } value={ el }>
              {el}
            </option>
          )))}
        </select>

        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ selected.comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          type="number"
          name="value"
          value={ selected.value }
          onChange={ handleChange }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleSelectedFilter }
        >
          Filtrar
        </button>

        <select
          onChange={ ({ target }) => setFilteredColumn(target.value) }
          data-testid="column-sort"
        >
          { columnOptions.map((e) => <option key={ e } value={ e }>{e}</option>)}
        </select>

        <div>
          <label htmlFor="ASCENDER">
            Ascendente
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              name="ordenar"
              value="ASCENDER"
              id="ASCENDER"
              onChange={ ({ target }) => setOrder(target.value) }
            />
          </label>

          <label htmlFor="DESCENDER">
            Descendente
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              name="ordenar"
              value="DESCENDER"
              onChange={ ({ target }) => setOrder(target.value) }
              id="DESCENDER"
            />
          </label>

          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ sortDataOrder }
          >
            Ordenar
          </button>
        </div>
        <div style={ cssFilters }>
          { checkFilters.map((e) => (
            <div key={ e.column }>
              <p style={ { display: 'inline-flex', padding: '5px' } }>
                {`${e.column} | ${e.comparison} | ${e.value}`}
              </p>
              <button type="button">
                Remover
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Header;

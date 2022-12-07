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
    setColumnOptions } = useContext(PlanetsContext);

  useEffect(() => {
    setSelected({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  }, [columnOptions]);

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

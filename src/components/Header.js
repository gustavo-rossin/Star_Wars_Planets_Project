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
    setColumnOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  }, []);

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
      </form>
    </div>
  );
}

export default Header;

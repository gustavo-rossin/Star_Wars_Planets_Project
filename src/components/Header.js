import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Header() {
  const { setSearchPlanet,
    setSelectedFilter,
    selected,
    setSelected } = useContext(PlanetsContext);
  const [numericInputs, setNumericInputs] = useState([]);
  const [columnOptions, setColumnOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  // Academia de Lógica do Tiago.

  const handleChange = ({ target: { value, name } }) => {
    setSelected({
      ...selected,
      [name]: value,
    });
  };

  const handleSelectedFilter = () => {
    setSelectedFilter(selected);
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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

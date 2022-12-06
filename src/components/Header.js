import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Header() {
  const { setSearchPlanet } = useContext(PlanetsContext);

  return (
    <div style={ { textAlign: 'center' } }>
      <h1>Projeto StarWars</h1>
      <label htmlFor="pesquisar">
        <input
          name="pesquisar"
          placeholder="Pesquisar"
          type="text"
          data-testid="name-filter"
          onChange={ ({ target }) => setSearchPlanet(target.value) }
        />
      </label>
    </div>
  );
}

export default Header;

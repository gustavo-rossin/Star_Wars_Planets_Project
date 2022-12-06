import { useEffect, useMemo, useState } from 'react';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');

  const api = async () => {
    const planetsData = await planetsAPI();
    setData(planetsData);
  };

  useEffect(() => {
    api();
  }, []);

  const value = useMemo(() => ({
    data,
    searchPlanet,
    setSearchPlanet,
  }), [data, searchPlanet, setSearchPlanet]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
export default PlanetsProvider;

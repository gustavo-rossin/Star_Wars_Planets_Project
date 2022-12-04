import { useEffect, useMemo, useState } from 'react';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const api = async () => {
    const planetsData = await planetsAPI();
    setData(planetsData);
  };

  useEffect(() => {
    api();
  }, []);

  const value = useMemo(() => ({
    data,
    searchItem,
    setSearchItem,
  }), [data, searchItem, setSearchItem]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
export default PlanetsProvider;

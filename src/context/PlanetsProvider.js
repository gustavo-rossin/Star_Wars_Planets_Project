import { useEffect, useMemo, useState } from 'react';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredSelection, setFilteredSelection] = useState([]);
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

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
    selectedFilter,
    setSelectedFilter,
    selected,
    setSelected,
    filteredSelection,
    setFilteredSelection,
  }), [
    data,
    searchPlanet,
    setSearchPlanet,
    selectedFilter,
    setSelectedFilter,
    selected,
    setSelected,
    filteredSelection,
    setFilteredSelection,
  ]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
export default PlanetsProvider;

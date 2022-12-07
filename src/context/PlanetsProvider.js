import { useEffect, useMemo, useState } from 'react';
import planetsAPI from '../services/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredSelection, setFilteredSelection] = useState([]);
  const [checkFilters, setCheckFilters] = useState([]);
  const [filteredColumn, setFilteredColumn] = useState('population');
  const [order, setOrder] = useState('ASC');

  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const api = async () => {
    const planetsData = await planetsAPI();
    setData(planetsData);
    setFilteredSelection(planetsData);
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
    checkFilters,
    setCheckFilters,
    columnOptions,
    setColumnOptions,
    filteredColumn,
    setFilteredColumn,
    order,
    setOrder,
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
    checkFilters,
    setCheckFilters,
    columnOptions,
    setColumnOptions,
    filteredColumn,
    setFilteredColumn,
    order,
    setOrder,
  ]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
export default PlanetsProvider;

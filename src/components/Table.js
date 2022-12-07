import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data,
    searchPlanet,
    selectedFilter,
  } = useContext(PlanetsContext);
  const [filteredSelection, setFilteredSelection] = useState([]);
  // console.log(filteredSelection.length);

  // acad logica tiago: aplicação de + ao invés de Number. E usar o switch ao invés de IF
  const handleDataInfo = (arr) => {
    let newArr = [];

    switch (selectedFilter.comparison) {
    case 'maior que':
      newArr = arr.filter((e) => +e[selectedFilter.column] > +selectedFilter.value);
      break;

    case 'menor que':
      newArr = arr.filter((e) => +e[selectedFilter.column] < +selectedFilter.value);
      break;

    case 'igual a':
      newArr = arr.filter((e) => +e[selectedFilter.column] === +selectedFilter.value);
      break;
    default:
      newArr = arr;
    }

    return newArr;
  };

  const handleFilter = () => {
    const dataFilter = data.filter((el) => (
      el.name.toLowerCase().includes(searchPlanet.toLowerCase())));
    setFilteredSelection(handleDataInfo(dataFilter));
  };

  useEffect(() => {
    handleFilter();
  }, [searchPlanet, selectedFilter]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotaion Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filteredSelection.length === 0
          ? (data.map((el1) => (
            <tr key={ el1.name }>
              <td>{el1.name}</td>
              <td>{el1.rotation_period}</td>
              <td>{el1.orbital_period}</td>
              <td>{el1.diameter}</td>
              <td>{el1.climate}</td>
              <td>{el1.gravity}</td>
              <td>{el1.terrain}</td>
              <td>{el1.surface_water}</td>
              <td>{el1.population}</td>
              <td>{el1.films}</td>
              <td>{el1.created}</td>
              <td>{el1.edited}</td>
              <td>{el1.url}</td>
            </tr>
          )))
          : (filteredSelection.map((el2) => (
            <tr key={ el2.name }>
              <td>{el2.name}</td>
              <td>{el2.rotation_period}</td>
              <td>{el2.orbital_period}</td>
              <td>{el2.diameter}</td>
              <td>{el2.climate}</td>
              <td>{el2.gravity}</td>
              <td>{el2.terrain}</td>
              <td>{el2.surface_water}</td>
              <td>{el2.population}</td>
              <td>{el2.films}</td>
              <td>{el2.created}</td>
              <td>{el2.edited}</td>
              <td>{el2.url}</td>
            </tr>
          )))}
      </tbody>
    </table>
  );
}

export default Table;

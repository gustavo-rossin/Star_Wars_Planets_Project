import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, searchItem } = useContext(PlanetsContext);
  const [filter, setFilter] = useState([]);
  // console.log(filter.length);
  const handleFilter = () => {
    const dataFilter = data.filter((el) => (
      el.name.toLowerCase().includes(searchItem.toLowerCase())));
    setFilter(dataFilter);
  };

  useEffect(() => {
    handleFilter();
  }, [searchItem]);

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
        {filter.length === 0
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
          : (filter.map((el2) => (
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

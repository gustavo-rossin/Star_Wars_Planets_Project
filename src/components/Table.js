import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, searchItem } = useContext(PlanetsContext);
  const [filter, setFilter] = useState([]);

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
        {data && filter.map((el) => (
          <tr key={ el.name }>
            <td>{el.name}</td>
            <td>{el.rotation_period}</td>
            <td>{el.orbital_period}</td>
            <td>{el.diameter}</td>
            <td>{el.climate}</td>
            <td>{el.gravity}</td>
            <td>{el.terrain}</td>
            <td>{el.surface_water}</td>
            <td>{el.population}</td>
            <td>{el.films}</td>
            <td>{el.created}</td>
            <td>{el.edited}</td>
            <td>{el.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

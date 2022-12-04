const planetsAPI = async () => {
  const planetsURL = 'https://swapi.py4e.com/api/planets';
  const planetsResponse = await fetch(planetsURL);
  const planetsData = await planetsResponse.json();
  delete planetsData.results.residents;

  return planetsData.results;
};

export default planetsAPI;

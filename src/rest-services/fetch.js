
export const fetchApi = async (url) => {
  const response = await fetch(url);
  const peopleData = await response.json();
  return (peopleData);
};

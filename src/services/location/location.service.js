import camelize from "camelize";

export const locationRequest = (searchTerm) => {
  return fetch(
    `http://127.0.0.1:5001/mealtogo-3baa1/us-central1/geocode?city=${searchTerm}`
  ).then((res) => {
    return res.json();
  });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};

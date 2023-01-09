const formatLocations = (arr) => {
  arr.forEach((value) => {
    value.position = {
      lat: value.location.coordinates[0],
      lng: value.location.coordinates[1],
    };
    delete value.location;
  });

  return arr;
};
export default formatLocations;

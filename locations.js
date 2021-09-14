function formatData(responseFromApi) {
  let formattedData = {};
  const components = responseFromApi?.data?.dashboard?.components;
  if (components) {
    components.forEach((component) => {
      var key = component.location.substring(0, 2);
      let newComponent = { [component.location]: component };
      if (formattedData[key]) {
        let updated = { ...formattedData[key], ...newComponent };
        formattedData[key] = updated;
      } else {
        let newCreatedComponenent = { [key]: newComponent };
        let updated = { ...formattedData, ...newCreatedComponenent };
        formattedData = updated;
      }
    });
    return formattedData;
  }
  return {};
}

function unitTests() {
  //Test empty input object
  let data = formatData({});
  data && Object.keys(data).length === 0 && data.constructor === Object
    ? console.log("Pass - Test empty input object")
    : console.log("Fail - Test empty input object");
  //Test empty input
  data = formatData();
  data && Object.keys(data).length === 0 && data.constructor === Object
    ? console.log("Pass - Test empty input")
    : console.log("Fail - Test empty input");
  // Test responseFromApi data
  // Test no of different Keys
  // Test no of different components for a particular key
  data = formatData(responseFromApi);
  let count = 0;
  for (const [key, value] of Object.entries(data)) {
    if (key === "AG") {
      data && Object.keys(value).length === 20 && data.constructor === Object
        ? console.log(
            "Pass - Test no of different components for a particular key - 'AG'"
          )
        : console.log(
            "Fail - Test no of different components for a particular key - 'AG'"
          );
    }
  }
  data && Object.keys(data).length === 9 && data.constructor === Object
    ? console.log("Pass - Test no of different Keys")
    : console.log("Fail - Test no of different Keys");

  //Test removeLocations
  data = removeLocations(
    ["AG001", "AG002", "RA001", "RA002", "XXXXX", "AGXXX"],
    responseFromApi
  );
  count = 0;
  for (const [key, value] of Object.entries(data)) {
    if (key === "AG") {
      data && Object.keys(value).length === 18 && data.constructor === Object
        ? console.log(
            "Pass - Test removeLocations for a particular key -'AG001', 'AG002'"
          )
        : console.log(
            "Fail - - Test removeLocations for a particular key -'AG001', 'AG002'"
          );
    }
  }
  data && Object.keys(data).length === 8 && data.constructor === Object
    ? console.log("Pass - Test no of different Keys after removeLocations")
    : console.log("Fail - Test no of different Keys after removeLocations");
}

function removeLocations(locations, data) {
  data = formatData(responseFromApi);
  locations.forEach((location) => {
    const locKey = location.substring(0, 2);
    if (data[locKey] && data[locKey][location]) {
      delete data[locKey][location];
      if (Object.keys(data[locKey]).length === 0) delete data[locKey];
    }
  });
  return data;
}

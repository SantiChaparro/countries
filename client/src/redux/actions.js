import axios from "axios";

export const GET_TOTAL_COUNTRIES = "GET_TOTAL_COUNTRIES";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const EMPTY_STATE_COUNTRY = "EMPTY_STATE_COUNTRY ";
export const FILTER_COUNTRIES = "FILTER_COUNTRIES";
export const EMPTY_STATE_FILTERED = "MPTY_STATE_FILTERED";
export const ORDERED_COUNTRIES = "ORDERED_COUNTRIES";
export const EMPTY_STATE_ORDERED = "EMPTY_STATE_ORDERED";
export const FILTERED_BY_ACTIVITY = "FILTERED_BY_ACTIVITY";
export const EMPTY_FILTERED_ACTIVITIES = "EMPTY_FILTERED_ACTIVITIES";
export const POST_ACTIVITY = "POST_ACTIVITY";

export const getCountries = (startIndex, endIndex) => {
  return async function (dispatch) {
    const dbCountries = await axios.get(
      `http://localhost:3001/countries?_start=${startIndex}&_end=${endIndex}`
    );

    const countries = dbCountries.data;
    dispatch({ type: GET_COUNTRIES, payload: countries });
  };
};

export const getTotalCountries = () => {
  return async (dispatch) => {
    const totalCountries = await axios.get("http://localhost:3001/countries");
    const totalPaises = totalCountries.data;

    dispatch({ type: GET_TOTAL_COUNTRIES, payload: totalPaises });
  };
};

export const getCountry = (name) => {
  return async function (dispatch) {
    try {
      const countryByName = await axios.get(
        `http://localhost:3001/countries?nombre=${name}`
      );

      const country = countryByName.data;
      dispatch({ type: GET_COUNTRY, payload: country });
    } catch (error) {
      window.alert("No exite dicho pais");
    }
  };
};

export const getCountryById = (id) => {
  return async (dispatch) => {
    try {
      const countryByiD = await axios.get(
        `http://localhost:3001/countries/${id}`
      );
      const country = countryByiD.data;
      dispatch({ type: GET_COUNTRY_BY_ID, payload: country });
    } catch (error) {
      console.error(error);
    }
  };
};

export const empyStateCountry = () => {
  return (dispatch) => {
    dispatch({ type: EMPTY_STATE_COUNTRY, payload: {} });
  };
};

export const countriesFiltered = (continente) => {
  return (dispatch) => {
    dispatch({ type: FILTER_COUNTRIES, payload: continente });
  };
};

export const emptyStateFiltered = () => {
  return (dispatch) => {
    dispatch({ type: EMPTY_STATE_FILTERED, payload: [] });
  };
};

export const sortedCountries = (order, sortBy) => {
  return (dispatch) => {
    dispatch({ type: ORDERED_COUNTRIES, payload: { order, sortBy } });
  };
};

export const emptyStateOrdered = () => {
  return (dispatch) => {
    dispatch({ type: EMPTY_STATE_ORDERED, payload: [] });
  };
};

export const filterByActivities = (actividad) => {
  return (dispatch) => {
    dispatch({ type: FILTERED_BY_ACTIVITY, payload: actividad });
  };
};

export const emptyFilteredActivities = () => {
  return (dispatch) => {
    dispatch({ type: EMPTY_FILTERED_ACTIVITIES, payload: [] });
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    const activities = await axios.get("http://localhost:3001/activities");
    const allActivities = activities.data;

    dispatch({ type: GET_ACTIVITIES, payload: allActivities });
  };
};

export const postActivity = (activity) => {
  return async (dispatch) => {
    const postActivity = await axios.post(
      "http://localhost:3001/activities",
      activity
    );

    const newActivity = postActivity.data;

    dispatch({ type: POST_ACTIVITY, payload: newActivity });
  };
};

import axios from 'axios';
const server = 'http://localhost:8082'

const GET_NEARBY_GRAFFITI = 'GET_NEARBY_GRAFFITI';

const initialState = {
  selectedPois: []
};

const gotNearbyGraffiti = graffitis => ({
  type: GET_NEARBY_GRAFFITI,
  graffitis
})

export const getNearbyGraffiti = (lat, long) => {
  return async dispatch => {
    try {
      let { data } = await axios.get(`${server}/api/tags/?lat=${lat}&long=${long}`)
      dispatch(gotNearbyGraffiti(data))
    } catch (error) {
      console.warn(error);
    }
  }
}


export default function (state = initialState, action) {
  let stateCopy = { ...state };
  switch (action.type) {
    case GET_NEARBY_GRAFFITI:
      stateCopy.graffitis = action.graffitis;
      return stateCopy;
    default:
      return state;
  }
}

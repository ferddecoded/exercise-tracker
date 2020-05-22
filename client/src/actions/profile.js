import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR } from './types';

export const getProfile = profileId => async dispatch => {
  try {
    const res = await axios.get(`/api/profiles/${profileId}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get(`/api/profiles/`);
    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error?.response?.statusText,
        status: error?.response?.status,
      },
    });
  }
};

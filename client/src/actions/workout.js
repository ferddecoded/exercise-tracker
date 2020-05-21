import axios from 'axios';
import { GET_WORKOUTS, WORKOUT_ERROR } from './types';

export const getWorkoutsByUser = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/workouts/user/${userId}`);
    dispatch({
      type: GET_WORKOUTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: {
        msg: error?.response?.statusText,
        code: error?.response?.statusCode,
      },
    });
  }
};

export const getWorkouts = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/workouts`);
    dispatch({
      type: GET_WORKOUTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: {
        msg: error?.response?.statusText,
        code: error?.response?.statusCode,
      },
    });
  }
};

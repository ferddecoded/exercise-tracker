import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL } from './types';
import { setAlert } from './alert';

export const loginUser = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formData);

    const { data } = await axios.post('/api/auth', body, config);

    // update state with user token
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    const { errors } = error?.response?.data;
    console.log({ errors });

    if (errors) {
      errors.forEach((error, i) =>
        dispatch(setAlert(error.msg, 'danger', 3000))
      );
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

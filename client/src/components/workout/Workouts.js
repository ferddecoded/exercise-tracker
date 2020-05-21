import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { H3 } from '../typography/Headings';
import { Divider } from '../layout/Divider';
import Workout from './Workout';

const ContentContainer = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const Workouts = ({ workouts }) => (
  <ContentContainer>
    <H3>Your Workouts</H3>
    <Divider color="grey" />
    {workouts && workouts.length
      ? workouts.map(workout => <Workout workout={workout} key={workout._id} />)
      : null}
  </ContentContainer>
);

Workouts.propTypes = {
  workouts: PropTypes.array,
};

export default Workouts;

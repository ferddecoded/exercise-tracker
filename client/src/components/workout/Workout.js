import React from 'react';
import styled from 'styled-components';
import { Box } from '../grid/Box';

const Container = styled(Box)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.darkestGrey};
`;

const Workout = () => <Container>Workout</Container>;

export default Workout;

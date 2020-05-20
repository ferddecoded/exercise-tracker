import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import { H4, H6 } from '../typography/Headings';
import { Box } from '../grid/Box';
import { Image } from '../image/Image';
import { Divider } from '../layout/Divider';
import { Copy } from '../typography/Copy';
import { Row } from '../grid/Row';
import { Column } from '../grid/Column';
import { ButtonLink } from '../link/ButtonLink';

const Container = styled(Row)`
  width: 90%;
  margin: 0 auto;
`;

const WorkoutContainer = styled(Box)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.darkestGrey};
  width: 85%;
  display: flex;
  margin: 24px 0px;
  padding: 24px 0;
`;

const AvatarContainer = styled(Column)`
  width: 25%;
  padding: 24px;
  text-align: center;
`;

const DetailsContainer = styled(Column)`
  flex-grow: 2;
  padding: 24px;
`;

const StyledH4 = styled(H4)`
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 12px 0px;
  margin: 12px 0px;
  border-radius: 5px;
`;

const WorkoutLabel = styled(H6)`
  background-color: ${({ theme }) => theme.darkerGrey};
  margin: 12px 12px 12px 0px;
  padding: 12px;
  display: inline-block;
  border-radius: 5px;
`;

const ActionsContainer = styled(Column)`
  width: 15%;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Workout = ({ profile, workout }) => {
  if (!profile || !Object.keys(profile).length) {
    return null;
  }
  return (
    <Container>
      <WorkoutContainer>
        <AvatarContainer>
          <Image
            src={profile?.avatar && `/assets/${profile.avatar}.png`}
            alt="avatar image"
          />
          <StyledH4 fontColor="primary">{workout.caloriesBurned}</StyledH4>
          <H6 fontColor="primary">Calories</H6>
        </AvatarContainer>
        <Divider color="grey" vertical />
        <DetailsContainer>
          <H4 fontColor="primary">{`${profile.user.firstName} ${profile.user.lastName}`}</H4>
          <Row>
            <WorkoutLabel>Description</WorkoutLabel>
            <Copy>{workout?.description}</Copy>
          </Row>
          <Row>
            <WorkoutLabel>Exercises</WorkoutLabel>
            <Copy>{workout?.exercises?.length} total exercise(s)</Copy>
          </Row>
          <Row>
            <WorkoutLabel>Sets</WorkoutLabel>
            <Copy>
              {workout?.exercises?.reduce(
                (acc, curr) => acc + curr.routine.length,
                0
              )}{' '}
              total set(s)
            </Copy>
          </Row>
          <Row>
            <WorkoutLabel>Date</WorkoutLabel>
            <Copy>
              <Moment format="MMM Do, YYYY">{workout.date}</Moment>
            </Copy>
          </Row>
        </DetailsContainer>
      </WorkoutContainer>
      <ActionsContainer>
        <ButtonLink>View</ButtonLink>
      </ActionsContainer>
    </Container>
  );
};

Workout.propTypes = {
  profile: PropTypes.object,
  workout: PropTypes.object,
};

export default Workout;

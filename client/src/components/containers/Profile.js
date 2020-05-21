import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProfile as getProfileAction } from '../../actions/profile';
import { getWorkoutsByUser as getWorkoutsByUserAction } from '../../actions/workout';

import { H4, H3 } from '../typography/Headings';
import { Box } from '../grid/Box';
import { Copy } from '../typography/Copy';
import ProgressRing from '../charts/ProgressRing';
import { Divider } from '../layout/Divider';
import Workout from '../workout/Workout';
import { Image } from '../image/Image';
import Spinner from '../layout/Spinner';

const ContentContainer = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const Container = styled(Box)`
  padding: 48px 0px;
`;

const InfoBox = styled(Box)`
  position: relative;
  background: ${({ theme }) => theme.grey};
  text-align: center;
  border-radius: 5px;
  margin-bottom: 48px;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
`;

const InfoContainer = styled(Box)`
  border: 10px solid ${({ theme }) => theme.primaryColor};
  height: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const HeadingContainer = styled(Box)`
  border: 10px solid ${({ theme }) => theme.primaryColor};
  border-radius: 5px;
  padding: 12px;
  margin: 12px;
  width: auto;

  h3 {
    display: inline-block;
  }
`;

const StatsContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin: 24px auto;
  width: 90%;
  max-width: 300px;
  padding: 12px;
`;

const StatsBox = styled(Box)`
  margin: 0px 48px;
  width: auto;
`;

const StyledCopy = styled(Copy)`
  background: #212121;
  color: ${({ theme }) => theme.primaryColor};
`;

const Profile = ({
  getProfile,
  profile: { profile, loading: profileLoading },
  user: { user, loading: userLoading },
  workouts: { workouts, loading: workoutsLoading },
  getWorkoutsByUser,
}) => {
  useEffect(() => {
    if (user && user._id) {
      getProfile(user._id);
      getWorkoutsByUser(user._id);
    }
  }, [getProfile, getWorkoutsByUser, user]);

  if (
    (profileLoading && profile === null) ||
    (userLoading && user === null) ||
    (workoutsLoading && !workouts.length)
  ) {
    return <Spinner />;
  }

  return (
    <Container>
      <InfoBox>
        <InfoContainer>
          <HeadingContainer>
            <H3 color="primary">{`${user?.firstName} ${user?.lastName}`}</H3>
          </HeadingContainer>
          <StatsContainer>
            <Image src={`/assets/${user?.avatar}.png`} alt="user avatar" />
          </StatsContainer>
        </InfoContainer>
      </InfoBox>
    </Container>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func,
  user: PropTypes.object,
  getWorkoutsByUser: PropTypes.func,
  workouts: PropTypes.array,
};

const mapState = ({ profile, user, workout }) => ({
  profile,
  user,
  workouts: workout,
});

export default connect(mapState, {
  getProfile: getProfileAction,
  getWorkoutsByUser: getWorkoutsByUserAction,
})(Profile);

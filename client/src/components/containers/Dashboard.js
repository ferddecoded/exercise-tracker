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
  background: ${({ theme }) => theme.primaryColor};
  height: 500px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 48px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
`;

const InfoContainer = styled(Box)`
  border: 10px solid ${({ theme }) => theme.grey};
  height: 100%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const HeadingContainer = styled(Box)`
  border: 10px solid #212121;
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
  margin: 24px 0px;
  width: auto;
`;

const StatsBox = styled(Box)`
  margin: 0px 48px;
  width: auto;
`;

const StyledCopy = styled(Copy)`
  background: #212121;
  color: ${({ theme }) => theme.primaryColor};
`;

const Dashboard = ({
  getProfile,
  profile: { profile, loading: profileLoading },
  user: { user, loading: userLoading },
  workouts: { workouts, loading: workoutsLoading },
  getWorkoutsByUser,
}) => {
  const [progress, setProgress] = useState(0);

  const todaysDate = new Date().setHours(0, 0, 0, 0);
  const todaysWorkouts = workouts.filter(workout => {
    const formattedWorkoutDate = new Date(workout.date).setHours(0, 0, 0, 0);
    return formattedWorkoutDate === todaysDate;
  });
  const todaysCaloriesBurn = todaysWorkouts.reduce(
    (acc, curr) => acc + curr.caloriesBurned,
    0
  );

  useEffect(() => {
    if (profile?.dailyCaloriesGoal && workouts?.length) {
      const calorieProgress =
        (todaysCaloriesBurn / profile.dailyCaloriesGoal) * 100;
      setTimeout(() => {
        setProgress(calorieProgress);
      }, 1000);
    }
  }, [profile, todaysCaloriesBurn, workouts]);

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
            <H3 color="#3A3A3A">Your Daily Progress</H3>
          </HeadingContainer>
          <StatsContainer>
            <StatsBox>
              <H4 color="#3A3A3A">Your Goal Burn</H4>
              <StyledCopy color="#3A3A3A" large>
                {profile?.dailyCaloriesGoal}
              </StyledCopy>
            </StatsBox>
            <div>
              <ProgressRing progress={progress} size={250} strokeSize={30} />
            </div>
            <StatsBox>
              <H4 color="#3A3A3A">Today's Burn</H4>
              <StyledCopy color="#3A3A3A" large>
                {todaysCaloriesBurn || 0}
              </StyledCopy>
            </StatsBox>
          </StatsContainer>
        </InfoContainer>
      </InfoBox>

      <ContentContainer>
        <H3>Your Workouts</H3>
        <Divider color="grey" />
        {workouts.length
          ? workouts.map(workout => (
              <Workout profile={profile} workout={workout} key={workout._id} />
            ))
          : null}
      </ContentContainer>
    </Container>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func,
  user: PropTypes.object,
  getWorkoutsByUser: PropTypes.func,
  workouts: PropTypes.object,
};

const mapState = ({ profile, user, workout }) => ({
  profile,
  user,
  workouts: workout,
});

export default connect(mapState, {
  getProfile: getProfileAction,
  getWorkoutsByUser: getWorkoutsByUserAction,
})(Dashboard);

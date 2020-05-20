import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { H4, H3 } from '../typography/Headings';
import { Box } from '../grid/Box';
import { Copy } from '../typography/Copy';
import ProgressRing from '../charts/ProgressRing';
import { Divider } from '../layout/Divider';

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
/* 
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 140px 290px 0 290px;
    border-color: ${({ theme }) =>
      `${theme.primaryColor} transparent transparent transparent`};
    left: 50%;
    transform: translateX(-50%) translateY(100%);
  } */
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

const Dashboard = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(75);
    }, 1000);
  }, []);

  return (
    <Container>
      <InfoBox>
        <InfoContainer>
          <HeadingContainer>
            <H3 fontColor="#3A3A3A">Your Daily Progress</H3>
          </HeadingContainer>
          <StatsContainer>
            <StatsBox>
              <H4 fontColor="#3A3A3A">Your Goal</H4>
              <StyledCopy fontColor="#3A3A3A" large>
                360
              </StyledCopy>
            </StatsBox>
            <div>
              <ProgressRing progress={progress} size={250} strokeSize={30} />
            </div>
            <StatsBox>
              <H4 fontColor="#3A3A3A">Daily Burn</H4>
              <StyledCopy fontColor="#3A3A3A" large>
                360
              </StyledCopy>
            </StatsBox>
          </StatsContainer>
        </InfoContainer>
      </InfoBox>

      <ContentContainer>
        <H3>Workouts</H3>
        <Divider color="grey" />
      </ContentContainer>
    </Container>
  );
};

export default Dashboard;

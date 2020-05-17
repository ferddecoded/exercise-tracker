import React from 'react';
import styled from 'styled-components';
import { Row } from '../grid/Row';
import { Box } from '../grid/Box';
import { H4, H3 } from '../typography/Headings';
import { Column } from '../grid/Column';
import { Icon } from '../typography/Icon';
import { Divider } from '../layout/Divider';
import { Copy } from '../typography/Copy';
import { Image } from '../image/Image';
import { TextInput } from '../formInputs/TextInput';
import { TextLink } from '../link/TextLink';
import { ButtonLink } from '../link/ButtonLink';

const Container = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const LoginContainer = styled(Column)`
  /* 10px is the width of the Divider */
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  background-color: ${({ theme }) => theme.grey};
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;
  padding: 24px;
`;

const InputContainer = styled.div`
  margin: 24px 0px;

  div:first-child {
    margin-bottom: 12px;
  }
`;

const StyledCopy = styled(Copy)`
  display: flex;
`;

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

const StyledImage = styled(Image)`
  width: 66.66%;
`;

const InfoContainer = styled(Column)`
  width: 100%;
  padding: 0px;
`;

const InfoHeading = styled(H4)`
  text-decoration: underline;
`;

const Info = styled(Box)`
  position: relative;
  background: ${({ theme }) => theme.primaryColor};
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 48px;
  width: 50%;
  left: 50%;
  transform: translateX(-50%);

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px 50px 0 50px;
    border-color: ${({ theme }) =>
      `${theme.primaryColor} transparent transparent transparent`};
    left: 50%;
    transform: translateX(-50%) translateY(100%);
  }
`;

const InfoGroup = styled.ul`
  width: 100%;
  padding: 12px 0px 0px;
  display: flex;

  > li:last-child {
    margin-bottom: 0;
  }
`;

const InfoItem = styled.li`
  width: 100%;
  background-color: ${({ theme }) => theme.grey};
  margin: 12px;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const InfoItemText = styled(Box)`
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 8px;
  margin: 12px;
  border-radius: 5px;
`;

const Landing = () => (
  <>
    <Container as="section">
      <Row>
        <LoginContainer>
          <H3>Gymie</H3>
          <Divider color="grey" />
          <InputContainer>
            <TextInput type="text" id="user" label="username" />
            <TextInput type="text" id="password" label="password" />
          </InputContainer>
          <Divider color="grey" />
          <ButtonLink href="/">
            <Copy>Log In</Copy>
          </ButtonLink>
          <StyledCopy>
            Don't have an account? &nbsp;
            <TextLink href="/sign-up" color="lightgrey">
              Sign Up
            </TextLink>
          </StyledCopy>
        </LoginContainer>
        <ImageContainer>
          <StyledImage src="./assets/duotone.png" alt="Weights" />
        </ImageContainer>
      </Row>
    </Container>

    <InfoContainer>
      <InfoGroup>
        <InfoItem>
          <Icon className="fas fa-users" fontSize="40px"></Icon>
          <InfoItemText>
            <Copy>
              Join a community to train and see your continued growth foster
              together.
            </Copy>
          </InfoItemText>
        </InfoItem>
        <InfoItem>
          <Icon className="fas fa-running" fontSize="40px"></Icon>
          <InfoItemText>
            <Copy>
              Create your workouts, see what others have listed as their
              workouts, and count the calories you burn.
            </Copy>
          </InfoItemText>
        </InfoItem>
        <InfoItem>
          <Icon className="fas fa-list-ul" fontSize="40px"></Icon>
          <InfoItemText>
            <Copy>
              Track your progress, create and edit your workout routines.
            </Copy>
          </InfoItemText>
        </InfoItem>
      </InfoGroup>
    </InfoContainer>
  </>
);

export default Landing;

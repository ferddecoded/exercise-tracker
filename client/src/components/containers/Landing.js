import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser as loginUserAction } from '../../actions/user';

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
import { Button } from '../buttons/Button';

const Container = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const LoginContainer = styled(Column)`
  width: 40%;
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
  flex-wrap: wrap;
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

const Landing = ({ loginUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    loginUser(formData);
  };

  const { email, password } = formData;
  return (
    <>
      <Container as="section">
        <Row>
          <LoginContainer as="form" onSubmit={onSubmit}>
            <H3>Gymie</H3>
            <Divider color="grey" />
            <InputContainer>
              <TextInput
                type="text"
                id="email"
                label="email"
                onChange={onChange}
                value={email}
              />
              <TextInput
                type="password"
                id="password"
                label="password"
                onChange={onChange}
                value={password}
              />
            </InputContainer>
            <Divider color="grey" />
            <Button href="/">
              <Copy>Log In</Copy>
            </Button>
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
};

Landing.propTypes = {
  loginUser: PropTypes.func,
};

export default connect(null, { loginUser: loginUserAction })(Landing);

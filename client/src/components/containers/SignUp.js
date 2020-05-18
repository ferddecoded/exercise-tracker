import React from 'react';
import styled from 'styled-components';

import { H3, H4 } from '../typography/Headings.js';
import { Copy } from '../typography/Copy.js';
import { Divider } from '../layout/Divider.js';
import Workout from '../svg/Workout';
import { TextInput } from '../formInputs/TextInput.js';
import { Button } from '../buttons/Button.js';
import { Box } from '../grid/Box.js';

const Container = styled(Box)`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  margin: 24px 0px;
  padding: 12px 0px;
  background-color: ${({ theme }) => theme.grey};
  width: 100%;
  border-radius: 5px;
`;

const FormGroup = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const FormSection = styled.section`
  width: 50%;
  padding: 0px 12px;
  input {
    margin-bottom: 12px;
  }
`;

const ImageContainer = styled(Box)`
  width: 40%;
  margin: 24px 0px;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

const SingUp = () => (
  <Container>
    <H3 fontColor="lightgrey">Sign Up For An Account</H3>
    <Divider color="grey" />
    <FormContainer>
      <FormGroup>
        <FormSection>
          <H4>Credentials</H4>
          <Copy fontColor="white">
            Please enter an email that hasn't already been registered
          </Copy>
          <TextInput type="text" id="email" label="email" />
          <Copy fontColor="white">Please enter a unique password</Copy>
          <TextInput type="text" id="password" label="password" />
          <TextInput type="text" id="password2" label="Reenter your password" />
        </FormSection>
        <FormSection>
          <H4>About You</H4>
          <Copy fontColor="white">What is your goal calories burn</Copy>
          <TextInput
            type="text"
            id="dailyCaloriesGoal"
            label="Calories Burn Goal"
          />
          <Copy fontColor="white">Please select an avatar</Copy>
          <TextInput type="text" id="email" label="Avatar" />
        </FormSection>
      </FormGroup>
      <ButtonContainer>
        <Button>Register</Button>
      </ButtonContainer>
    </FormContainer>
    <ImageContainer>
      <Workout />
    </ImageContainer>
  </Container>
);

export default SingUp;

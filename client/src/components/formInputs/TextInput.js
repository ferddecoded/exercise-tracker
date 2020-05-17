import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  position: relative;
  line-height: 14px;
  margin: 0px;
  display: inline-block;
  width: 90%;
`;

const Input = styled.input`
  width: 100%;
  font-size: 13px;
  color: ${({ theme }) => theme.lightgrey};
  outline: none;
  border: 1px solid ${({ theme }) => theme.lightgrey};
  padding: 10px 20px;
  border-radius: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.grey};

  + label {
    transform: translateY(0);
    background-color: ${({ theme }) => theme.grey};
  }

  &:focus {
    border-color: ${({ theme }) => theme.primaryColor};
    + label {
      ${({ theme }) => theme.primaryColor};
      transform: translateY(-20px);
    }
  }
`;

const Label = styled('label')`
  color: #bbb;
  font-size: 11px;
  text-transform: uppercase;
  position: absolute;
  z-index: 2;
  left: 20px;
  top: 14px;
  padding: 0 2px;
  pointer-events: none;
  background: white;
  transition: transform 100ms ease;
  transform: translateY(-20px);
`;

export const TextInput = ({ label, id }) => (
  <Container>
    <Input type="text" id={id} />
    <Label htmlFor={id}>{label}</Label>
  </Container>
);

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
};

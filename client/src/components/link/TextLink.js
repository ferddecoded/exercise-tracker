import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const TextLink = styled(({ routerLink, children, ...rest }) => (
  <a as={!routerLink ? 'a' : RouterLink} {...rest}>
    {children}
  </a>
))`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 5px solid transparent;
  color: ${({ theme, fontColor }) => fontColor || theme.primaryColor};
  transition: ${({ theme }) => theme.defaultTransition};

  &:hover {
    border-bottom: 5px solid
      ${({ theme, fontColor }) => fontColor || theme.primaryColor};
  }
`;

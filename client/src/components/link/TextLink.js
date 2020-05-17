import styled from 'styled-components';

export const TextLink = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 5px solid transparent;
  color: ${({ theme, color }) => color || theme.grey};
  transition: ${({ theme }) => theme.defaultTransition};

  &:hover {
    border-bottom: 5px solid ${({ theme, color }) => color || theme.grey};
  }
`;

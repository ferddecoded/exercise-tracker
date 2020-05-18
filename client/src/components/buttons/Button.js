import styled, { css } from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  padding: 12px 24px;
  margin: 12px;
  border-radius: 10px;
  transition: ${({ theme }) => theme.defaultTransition};
  border: 2px solid ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.grey};
  background-color: ${({ theme }) => theme.primaryColor};

  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    background-color: ${({ theme }) => theme.grey};
    border: 2px solid ${({ theme }) => theme.primaryColor};
  }

  ${({ secondary }) =>
    secondary &&
    css`
      border: 2px solid ${({ theme }) => theme.grey};
      color: ${({ theme }) => theme.primaryColor};
      background-color: ${({ theme }) => theme.grey};

      &:hover {
        border: 2px solid ${({ theme }) => theme.grey};
        color: ${({ theme }) => theme.grey};
        background-color: ${({ theme }) => theme.primaryColor};
      }
    `}
`;

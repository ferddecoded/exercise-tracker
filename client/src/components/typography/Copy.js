import styled, { css } from 'styled-components';

export const Copy = styled.p`
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }

  ${({ small }) =>
    small &&
    css`
      font-size: 16px;
      @media (max-width: 768px) {
        font-size: 14px;
      }
    `}
`;

import styled from 'styled-components';

export const H1 = styled.h1`
  color: ${({ fontColor, theme }) => {
    if (fontColor === 'primary') {
      return theme.primaryColor;
    }
    if (fontColor === 'tertiary') {
      return theme.primaryWhite;
    }
    return fontColor;
  }};
  font-size: 80px;
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const H2 = styled.h2`
  color: ${({ fontColor, theme }) => {
    if (fontColor === 'primary') {
      return theme.primaryColor;
    }
    if (fontColor === 'tertiary') {
      return theme.primaryWhite;
    }
    return fontColor;
  }};
  font-size: 60px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const H3 = styled.h3`
  color: ${({ fontColor, theme }) => {
    if (fontColor === 'primary') {
      return theme.primaryColor;
    }
    if (fontColor === 'tertiary') {
      return theme.primaryWhite;
    }
    return fontColor;
  }};
  font-size: 44px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const H4 = styled.h4`
  color: ${({ fontColor, theme }) => {
    if (fontColor === 'primary') {
      return theme.primaryColor;
    }
    if (fontColor === 'tertiary') {
      return theme.primaryWhite;
    }
    return fontColor;
  }};
  font-size: 32px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const H5 = styled.h5`
  color: ${({ fontColor, theme }) => {
    if (fontColor === 'primary') {
      return theme.primaryColor;
    }
    if (fontColor === 'tertiary') {
      return theme.primaryWhite;
    }
    return fontColor;
  }};
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const H6 = styled.h6`
  color: ${({ fontColor, theme }) => {
    if (fontColor === 'primary') {
      return theme.primaryColor;
    }
    if (fontColor === 'tertiary') {
      return theme.primaryWhite;
    }
    return fontColor;
  }};
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

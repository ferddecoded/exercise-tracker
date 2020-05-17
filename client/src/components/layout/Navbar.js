import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import { TextLink } from '../link/TextLink';
import { H3 } from '../typography/Headings';
import { Icon } from '../typography/Icon';
import { Copy } from '../typography/Copy';
import { ButtonLink } from '../link/ButtonLink';
import { Row } from '../grid/Row';

const Header = styled.header`
  background-color: ${({ theme }) => theme.primaryColor};
`;

const LogoContainer = styled.div`
  padding: 12px 0px;
`;

const LinkList = styled.ul`
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  display: flex;
  align-content: center;
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
`;

const Navbar = () => (
  <Header>
    <AppWrapper>
      <Row>
        <LogoContainer>
          <TextLink href="#">
            <Icon className="fas fa-dumbbell" fontSize="40px"></Icon>
            <H3>Gymie</H3>
          </TextLink>
        </LogoContainer>
        <LinkList>
          <LinkItem>
            <ButtonLink href="/" secondary>
              <Copy>Log In</Copy>
            </ButtonLink>
          </LinkItem>
          <LinkItem>
            <ButtonLink secondary>
              <Copy>Sign Up</Copy>
            </ButtonLink>
          </LinkItem>
        </LinkList>
      </Row>
    </AppWrapper>
  </Header>
);

export default Navbar;

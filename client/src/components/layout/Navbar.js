import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppWrapper from './AppWrapper';
import { TextLink } from '../link/TextLink';
import { H3 } from '../typography/Headings';
import { Icon } from '../typography/Icon';
import { Copy } from '../typography/Copy';
import { ButtonLink } from '../link/ButtonLink';
import { Row } from '../grid/Row';
import { logout as logoutAction } from '../../actions/user';

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

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const onClick = () => {
    logout();
  };
  return (
    <Header>
      <AppWrapper>
        <Row>
          <LogoContainer>
            <TextLink href="#" color="#3A3A3A">
              <Icon
                className="fas fa-dumbbell"
                fontSize="40px"
                color="#3A3A3A"
              ></Icon>
              <H3>Gymie</H3>
            </TextLink>
          </LogoContainer>
          {!loading && !isAuthenticated ? (
            <LinkList>
              <LinkItem>
                <ButtonLink to="/" primary="true" routerLink>
                  <Copy>Log In</Copy>
                </ButtonLink>
              </LinkItem>
              <LinkItem>
                <ButtonLink to="/sign-up" primary="true" routerLink>
                  <Copy>Sign Up</Copy>
                </ButtonLink>
              </LinkItem>
            </LinkList>
          ) : (
            <LinkList>
              <LinkItem>
                <ButtonLink to="/users" primary="true" routerLink>
                  <Copy>Users</Copy>
                </ButtonLink>
              </LinkItem>
              <LinkItem>
                <ButtonLink to="/profile" primary="true" routerLink>
                  <Copy>Profile</Copy>
                </ButtonLink>
              </LinkItem>
              <LinkItem>
                <ButtonLink to="/workouts" primary="true" routerLink>
                  <Copy>Workouts</Copy>
                </ButtonLink>
              </LinkItem>
              <LinkItem>
                <ButtonLink to="/dashboard" primary="true" routerLink>
                  <Copy>Dashboard</Copy>
                </ButtonLink>
              </LinkItem>
              <LinkItem>
                <ButtonLink onClick={onClick} href="#!" primary="true">
                  <Copy>Log Out</Copy>
                </ButtonLink>
              </LinkItem>
            </LinkList>
          )}
        </Row>
      </AppWrapper>
    </Header>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func,
};

const mapState = state => ({
  auth: state.user,
});

export default connect(mapState, { logout: logoutAction })(Navbar);

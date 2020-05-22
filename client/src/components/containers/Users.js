import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { getProfiles as getProfilesAction } from '../../actions/profile';

import { Row } from '../grid/Row';
import { Box } from '../grid/Box';
import { H3 } from '../typography/Headings';
import { Column } from '../grid/Column';
import { Divider } from '../layout/Divider';
import { Image } from '../image/Image';
import { Copy } from '../typography/Copy';
import { ButtonLink } from '../link/ButtonLink';
import Spinner from '../layout/Spinner';

const Container = styled.div`
  margin-top: 48px;
  background-color: ${({ theme }) => theme.darkerGrey};
  padding: 24px;
  position: relative;
`;

const HeadingContainer = styled(Column)`
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

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  height: 500px;
`;

const StyledImage = styled(Image)`
  width: 66.66%;
  object-fit: cover;
`;

const ProfilesContainer = styled(Row)`
  justify-content: center;
`;

const ProfileContainer = styled(Column)`
  width: calc(33.33% - 24px);
  margin: 48px 12px;
  background-color: ${({ theme }) => theme.grey};
  border-radius: 5px;
  text-align: center;
`;

const AvatarContainer = styled(Box)`
  padding: 24px;
`;

const ButtonContainer = styled(Box)`
  margin: 24px 0px;
`;

const Users = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !profiles?.length) {
    return <Spinner />;
  }
  return (
    <>
      <Container as="section">
        <Row>
          <HeadingContainer>
            <H3 color="primary">Users</H3>
            <Divider color="grey" />
          </HeadingContainer>
          <ImageContainer>
            <StyledImage src="./assets/users.png" alt="two guys fist bumping" />
          </ImageContainer>
        </Row>
      </Container>

      <ProfilesContainer as="section">
        {profiles.length
          ? profiles.map(profile => (
              <ProfileContainer>
                <AvatarContainer>
                  <Image
                    src={`/assets/${profile.user.avatar}.png`}
                    alt={`avatar image of ${profile.user.avatar}`}
                  />
                </AvatarContainer>
                <H3>{`${profile.user.firstName} ${profile.user.lastName}`}</H3>
                <Copy>
                  Member Since:{' '}
                  <Moment format="MMM Do, YYYY">{profile?.user?.date}</Moment>
                </Copy>
                <ButtonContainer>
                  <ButtonLink routerLink to={`/profile/${profile.user._id}`}>
                    View Profile
                  </ButtonLink>
                </ButtonContainer>
              </ProfileContainer>
            ))
          : null}
      </ProfilesContainer>
    </>
  );
};

Users.propTypes = {
  getProfiles: PropTypes.func,
  profile: PropTypes.object,
};

const mapState = state => ({
  profile: state?.profile,
});

export default connect(mapState, { getProfiles: getProfilesAction })(Users);
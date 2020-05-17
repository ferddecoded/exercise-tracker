import React from 'react';
import styled from 'styled-components';
import { Button } from '../buttons/Button';

export const ButtonLink = styled(props => <Button as="a" {...props} />)``;

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles';

import type {ThemeT} from '../styles';

type StyledPropsT = {
  $theme: ThemeT,
};

type StyledListItemPropsT = {
  $isHighlighted: boolean,
} & StyledPropsT;

export const List = styled('ul', ({$theme}: StyledPropsT) => ({
  position: 'relative',
  margin: 0,
  padding: 0,
  background: $theme.colors.white,
  borderRadius: $theme.borders.radius300,
  boxShadow: $theme.lighting.shadow600,
  overflow: 'auto',
}));

export const ListItem = styled(
  'li',
  ({$theme, $isHighlighted}: StyledListItemPropsT) => ({
    ...$theme.typography.font300,
    position: 'relative',
    display: 'block',
    color: $isHighlighted ? $theme.colors.primary : $theme.colors.black,
    cursor: 'pointer',
    transitionProperty: 'color, background-color',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    ':hover': {
      backgroundColor: $theme.colors.mono300,
    },
    paddingTop: $theme.sizing.scale300,
    paddingBottom: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale600,
    paddingLeft: $theme.sizing.scale600,
    ':first-child': {
      paddingTop: $theme.sizing.scale600,
    },
    ':last-child': {
      paddingBottom: $theme.sizing.scale600,
    },
  }),
);

export const ListItemProfile = styled('li', ({$theme}: StyledPropsT) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  paddingTop: $theme.sizing.scale300,
  paddingBottom: $theme.sizing.scale300,
  paddingRight: $theme.sizing.scale800,
  paddingLeft: $theme.sizing.scale800,
  transitionProperty: 'color, background-color',
  transitionDuration: $theme.animation.timing100,
  transitionTimingFunction: $theme.animation.easeOutCurve,
  ':hover': {
    backgroundColor: $theme.colors.mono300,
  },
  ':first-child': {
    paddingTop: $theme.sizing.scale800,
  },
  ':last-child': {
    paddingBottom: $theme.sizing.scale800,
  },
}));

export const ProfileImgContainer = styled('div', {
  width: '60px',
  height: '60px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ProfileImg = styled('img', {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
});

export const ProfileLabelsContainer = styled('div', ({$theme}) => ({
  marginLeft: $theme.sizing.scale600,
  alignSelf: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
}));

export const ProfileTitle = styled('h6', ({$theme}) => ({
  ...$theme.typography.font450,
  color: $theme.colors.black,
  margin: 0,
}));

export const ProfileSubtitle = styled('p', ({$theme}) => ({
  ...$theme.typography.font300,
  color: $theme.colors.black,
  margin: 0,
}));

export const ProfileBody = styled('p', ({$theme}) => ({
  ...$theme.typography.font200,
  margin: 0,
  color: $theme.colors.mono800,
}));

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles';
import {KIND, SIZE, SHAPE} from './constants';
import type {ThemeT} from '../styles';

type StylePropsT = {
  $theme: ThemeT,
  $size?: $Keys<typeof SIZE>,
  $kind?: $Keys<typeof KIND>,
  $shape?: $Keys<typeof SHAPE>,
};

export const BaseButton = styled(
  'button',
  ({$theme, $size, $kind, $shape}: StylePropsT) => ({
    ...$theme.typography[$size === SIZE.compact ? 'font200' : 'font300'],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    borderRadius: $shape === SHAPE.round ? '50%' : $theme.borders.radius200,
    textDecoration: 'none',
    outline: 'none',
    WebkitAppearance: 'none',
    transitionProperty: 'background',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    cursor: 'pointer',
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: $theme.colors.mono300,
      color: $theme.colors.mono600,
    },
    // Padding For Shape and Size
    ...getStyleForShape({$theme, $shape, $size}),
    // Kind style override
    ...getStyleForKind({$theme, $kind}),
  }),
);

export const EndEnhancer = styled('div', ({$theme}: StylePropsT) => ({
  display: 'flex',
  marginLeft: $theme.sizing.scale500,
}));

export const StartEnhancer = styled('div', ({$theme}: StylePropsT) => ({
  display: 'flex',
  marginRight: $theme.sizing.scale500,
}));

export function getStyleForShape({$theme, $shape, $size}: StylePropsT) {
  switch ($shape) {
    case SHAPE.round:
    case SHAPE.square:
      return {
        paddingTop:
          $theme.sizing[$size === SIZE.compact ? 'scale400' : 'scale500'],
        paddingBottom:
          $theme.sizing[$size === SIZE.compact ? 'scale400' : 'scale500'],
        paddingLeft:
          $theme.sizing[$size === SIZE.compact ? 'scale400' : 'scale500'],
        paddingRight:
          $theme.sizing[$size === SIZE.compact ? 'scale400' : 'scale500'],
      };
    default:
      return {
        paddingTop:
          $theme.sizing[$size === SIZE.compact ? 'scale200' : 'scale300'],
        paddingBottom:
          $theme.sizing[$size === SIZE.compact ? 'scale200' : 'scale300'],
        paddingLeft: $theme.sizing.scale600,
        paddingRight: $theme.sizing.scale600,
      };
  }
}

export function getStyleForKind({$theme, $kind}: StylePropsT) {
  switch ($kind) {
    case KIND.primary:
      return {
        color: $theme.colors.white,
        backgroundColor: $theme.colors.primary,
        ':hover:enabled': {
          backgroundColor: $theme.colors.primary500,
        },
        ':focus:enabled': {
          backgroundColor: $theme.colors.primary500,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.primary600,
        },
      };
    case KIND.secondary:
      return {
        color: $theme.colors.primary,
        backgroundColor: $theme.colors.primary50,
        ':hover:enabled': {
          backgroundColor: $theme.colors.primary100,
        },
        ':focus:enabled': {
          backgroundColor: $theme.colors.primary100,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.primary200,
        },
      };
    case KIND.tertiary:
      return {
        color: $theme.colors.primary,
        backgroundColor: $theme.colors.mono200,
        ':hover:enabled': {
          backgroundColor: $theme.colors.mono400,
        },
        ':focus:enabled': {
          backgroundColor: $theme.colors.mono400,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.mono500,
        },
      };
    case KIND.minimal:
      return {
        color: $theme.colors.primary,
        backgroundColor: 'transparent',
        ':hover:enabled': {
          backgroundColor: $theme.colors.mono200,
        },
        ':focus:enabled': {
          backgroundColor: $theme.colors.mono200,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.mono400,
        },
      };
    default:
      return {};
  }
}

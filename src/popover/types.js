// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import {PLACEMENT, STATE_CHANGE_TYPE, TRIGGER_TYPE} from './constants';

export type PopoverPlacement = $Keys<typeof PLACEMENT>;

export type TriggerType = $Keys<typeof TRIGGER_TYPE>;

export type State = {
  isOpen: boolean,
};

export type StateChangeType = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducer = (
  stateChangeType: StateChangeType,
  nextState: State,
  currentState: State,
  event?: Event
) => State;

export type ContentRenderProp = ({
  close?: () => void,
}) => React.Node;

export type ComponentsProp = {|
  PopoverBody?: React.ComponentType<any>,
  PopoverArrow?: React.ComponentType<any>,
  PopoverInner?: React.ComponentType<any>,
|};

// Props shared by all flavors of popover
export type BasePopoverProps = {
  components?: ComponentsProp,
  content: React.Node | ContentRenderProp,
  onMouseEnterDelay?: number,
  onMouseLeaveDelay?: number,
  placement: PopoverPlacement,
  showArrow?: boolean,
  triggerType: TriggerType,
};

// Props for stateless render logic
export type PopoverProps = BasePopoverProps & {
  children: React.Node,
  isOpen: boolean,
  onClick?: (e: Event) => void,
  onClickOutside?: () => void,
  onEsc?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

// Props for stateful wrapper
export type StatefulPopoverProps = BasePopoverProps & {
  children: React.Node,
  dismissOnClickOutside: boolean,
  dismissOnEsc: boolean,
  initialState?: State,
  onClose?: () => void,
  onOpen?: () => void,
  stateReducer?: StateReducer,
};

// Props for state container
export type StatefulPopoverContainerProps = $Diff<
  StatefulPopoverProps,
  {children: React.Node}
> & {
  children: (props: $Diff<PopoverProps, {children: React.Node}>) => React.Node,
};

export type PopperDataOffset = {
  top?: number | string,
  left?: number | string,
  width?: number | string,
  height?: number | string,
};

export type PopperPositionStyle = {
  top?: number | string,
  left?: number | string,
};

export type PopperData = {
  arrowStyles?: {
    top: string,
    left: string,
  },
  styles?: {
    top: string,
    left: string,
  },
  placement: PopoverPlacement,
};

export type PopoverPrivateState = {
  isAnimating: boolean,
  popperData: PopperData,
};

export type AnchorProps = {
  onMouseEnter?: (e: Event) => void,
  onMouseLeave?: (e: Event) => void,
  onClick?: (e: Event) => void,
};
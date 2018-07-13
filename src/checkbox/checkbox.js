// @flow
import React from 'react';
import type {PropsT, DefaultPropsT} from './types';

class StatelessCheckbox extends React.Component<PropsT> {
  static defaultProps: DefaultPropsT = {
    checked: false,
    disabled: false,
    isFocused: false,
    isIndeterminate: false,
    placement: 'right',
    inputRef: React.createRef(),
    error: false,
    label: '',
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  componentDidMount() {
    const {isFocused, inputRef} = this.props;
    if (isFocused) {
      inputRef.current && inputRef.current.focus();
    }
  }

  render() {
    const {
      components,
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      placement,
      label,
      inputRef,
      isFocused,
      isIndeterminate,
      error,
      disabled,
      checked,
      $theme,
    } = this.props;
    const {Root, Checkmark, Label, Input} = components;

    const events = {
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    };
    const labelComp = (
      <Label disabled={disabled} placement={placement} $theme={$theme}>
        {label}
      </Label>
    );
    return (
      <Root disabled={disabled} $error={error} $theme={$theme}>
        {(placement === 'top' || placement === 'left') && labelComp}
        <Checkmark
          disabled={disabled}
          $error={error}
          checked={checked}
          $isFocused={isFocused}
          $theme={$theme}
          $isIndeterminate={isIndeterminate}
        />
        <Input type="checkbox" $theme={$theme} $ref={inputRef} {...events} />
        {(placement === 'bottom' || placement === 'right') && labelComp}
      </Root>
    );
  }
}

export default StatelessCheckbox;

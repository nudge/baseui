/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import * as React from 'react';
import {styled} from '../../styles';
import {FormControl, StyledLabel} from './';
import {StatefulInput as Input, SIZE} from '../input';
import {StatefulTextarea as Textarea} from '../textarea';
import {StatefulCheckbox as Checkbox} from '../checkbox';
import {StatefulRadioGroup as RadioGroup, StyledRadio} from '../radio';

const InputIcon = styled('span', props => {
  return {
    width: '16px',
    alignItems: 'center',
    padding:
      props.$position === 'left'
        ? '0 0 0 12px'
        : props.$position === 'right' ? '0 12px 0 0' : '0',
    ':before': {
      content: '""',
      display: 'inline-block',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: props.$isFocused
        ? props.$theme.colors.primary
        : '#999999',
    },
  };
});

const CustomLabel = ({children, ...rest}: {children: React.Node}) => {
  return (
    <StyledLabel {...rest} data-label="data-label">
      {children}
      <InputIcon $position="left" {...rest} />
    </StyledLabel>
  );
};

const Span = styled('span', {
  display: 'flex',
  alignItems: 'center',
});
const Icon = styled('span', ({$position, $error, $theme}) => {
  return {
    padding: $position === 'left' ? '0 8px 0 0' : '0 0 0 8px',
    ':before': {
      content: '""',
      display: 'flex',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: $error ? $theme.colors.negative400 : '#999999',
    },
  };
});

export const tests = {
  CONTROLS_EXAMPLE: 'controls with label and caption',
  BASE_EXAMPLE: 'label and caption props',
};

export default {
  [tests.CONTROLS_EXAMPLE]: function example1() {
    return (
      <div>
        <FormControl label="Input label" caption="Input caption">
          <Input size={SIZE.compact} />
        </FormControl>
        <FormControl label="Textarea label" caption="Textarea caption">
          <Textarea size={SIZE.compact} />
        </FormControl>
        <FormControl label="Checkbox label" caption="Checkbox caption">
          <Checkbox>Checkbox control</Checkbox>
        </FormControl>
        <FormControl label="RadioGroup label" caption="RadioGroup caption">
          <RadioGroup>
            <StyledRadio value="red">Red</StyledRadio>
            <StyledRadio value="green">Green</StyledRadio>
            <StyledRadio value="blue">Blue</StyledRadio>
          </RadioGroup>
        </FormControl>
      </div>
    );
  },
  [tests.BASE_EXAMPLE]: function example1() {
    return (
      <div>
        <FormControl label="String type label" caption="String type caption">
          <Input size={SIZE.compact} />
        </FormControl>
        <FormControl
          label={
            <Span>
              Element type label<Icon $position="right" />
            </Span>
          }
          caption={
            <Span>
              <Icon $position="left" />Element type caption
            </Span>
          }
        >
          <Input size={SIZE.compact} />
        </FormControl>
        <FormControl
          // $FlowFixMe
          label={(props: {$disabled: boolean}) => {
            const {$disabled} = props;
            return `Function type label gets shared props.${
              $disabled ? ' This input is disabled.' : ''
            }`;
          }}
          // $FlowFixMe
          caption={props => {
            const {$disabled} = props;
            return `Function type caption gets shared props.${
              $disabled ? ' This input is disabled.' : ''
            }`;
          }}
        >
          <Input size={SIZE.compact} disabled />
        </FormControl>
        <FormControl label="Label" caption="Caption" error="String type error">
          <Input size={SIZE.compact} />
        </FormControl>
        <FormControl
          label="Label"
          caption="Caption"
          error={
            <Span>
              <Icon $position="left" $error />Element type error
            </Span>
          }
        >
          <Input size={SIZE.compact} />
        </FormControl>
        <FormControl
          label="Label"
          caption="Caption"
          // $FlowFixMe
          error={(props: {$required: boolean}) => {
            const {$required} = props;
            return `Function type error gets shared props.${
              $required ? ' This input is required.' : ''
            }`;
          }}
        >
          <Input size={SIZE.compact} required />
        </FormControl>
        <FormControl
          label="Custom label"
          caption="Caption with style overrides and extra props"
          overrides={{
            Label: {component: CustomLabel},
            Caption: {
              props: {'data-test-label': 'test'},
              style: {color: '#00F'},
            },
          }}
        >
          <Input size={SIZE.compact} />
        </FormControl>
      </div>
    );
  },
};

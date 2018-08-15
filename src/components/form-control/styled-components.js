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
import {styled} from '../../styles';

export const Label = styled('label', props => {
  const {$disabled, $theme: {colors, sizing, typography}} = props;
  return {
    ...typography.font350,
    fontWeight: 500,
    color: $disabled ? colors.mono700 : colors.mono1000,
    display: 'block',
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    marginTop: sizing.scale300,
    marginRight: '0',
    marginBottom: sizing.scale300,
    marginLeft: '0',
  };
});

export const Caption = styled('div', props => {
  const {$error, $theme: {colors, sizing, typography}} = props;
  return {
    ...typography.font200,
    color:
      $error && typeof $error !== 'boolean'
        ? colors.negative400
        : colors.mono800,
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    marginTop: sizing.scale300,
    marginRight: '0',
    marginBottom: sizing.scale300,
    marginLeft: '0',
  };
});

export const ControlContainer = styled('div', props => {
  const {$theme: {sizing}} = props;
  return {
    marginBottom: sizing.scale600,
  };
});
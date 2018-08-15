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
import React from 'react';
import {shallow} from 'enzyme';
import {TextareaContainer, Textarea} from '../styled-components';
import {SIZE} from '../../input';
describe('Textarea', () => {
  test('TextareaContainer - basic render', () => {
    const component = shallow(
      <TextareaContainer $size={SIZE.default}>
        <span />
      </TextareaContainer>,
    );
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct default styles',
    );
    component.setProps({
      $isFocused: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct styles when focused',
    );
    component.setProps({
      $size: SIZE.compact,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct styles when compact',
    );
    component.setProps({
      $error: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct styles when error',
    );
    component.setProps({
      $disabled: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'TextareaContainer has correct styles when disabled',
    );
  });

  test('Textarea element - basic render', () => {
    const component = shallow(<Textarea $size={SIZE.default} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'Textarea has correct default styles',
    );
    component.setProps({
      $size: SIZE.compact,
      $disabled: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'Textarea has correct styles when compact and disabled',
    );
  });
});

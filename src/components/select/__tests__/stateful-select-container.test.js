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
import {mount} from 'enzyme';
import {StatefulSelectContainer} from '../index';
import {STATE_TYPE} from '../constants';
import type {StateReducerT} from '../types';

describe('Stateful Select Container', function() {
  let allProps: any, childFn;
  let wrapper;

  beforeEach(function() {
    const stateReducer: StateReducerT = (type, nextState) => nextState;
    childFn = jest.fn(() => <div>test</div>);
    allProps = {
      children: childFn,
      initialState: {},
      stateReducer: stateReducer,
      prop1: 'some other propq',
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should correctly render', function() {
    wrapper = mount(<StatefulSelectContainer {...allProps} />);
    expect(wrapper).toMatchSnapshot('Component has correct render ');
  });

  test('should provide all needed props to children render func', function() {
    wrapper = mount(<StatefulSelectContainer {...allProps} />);
    const actualProps = childFn.mock.calls[0][0];
    expect(actualProps).toMatchObject({
      prop1: allProps.prop1,
    });
  });

  test('should provide initial state as part of state', function() {
    allProps.initialState = {prop3: 'some initial state'};
    wrapper = mount(<StatefulSelectContainer {...allProps} />);
    const actualProps = childFn.mock.calls[0][0];
    expect(actualProps).toMatchObject(allProps.initialState);
  });

  describe('Events', function() {
    let selectedOptions = [
      {
        id: '123',
        label: 'label for 123',
      },
    ];
    let textValue = 'some good value';
    let events, stateReducerMock, instance, event;
    event = {target: {checked: true}};
    const handlers = [
      ['onChange', STATE_TYPE.select, {selectedOptions}],
      ['onChange', STATE_TYPE.clearAll, {selectedOptions: []}],
      ['onChange', STATE_TYPE.keyUp, {textValue}],
    ];
    beforeEach(function() {
      events = {
        onChange: jest.fn(),
        onMouseEnter: jest.fn(),
        onMouseLeave: jest.fn(),
        onFocus: jest.fn(),
        onBlur: jest.fn(),
      };
      allProps = {...allProps, ...events};
      stateReducerMock = jest.fn();
      allProps.stateReducer = stateReducerMock;
      wrapper = mount(<StatefulSelectContainer {...allProps} />);
      instance = wrapper.instance();
    });

    test.each(handlers)(
      'should call state reducer to apply new state for %s event with %s type',
      (eventHandler, type, newState) => {
        const handler = instance[eventHandler];
        const params = Object.assign({}, newState, {type});
        handler(event, params);
        expect(stateReducerMock).toHaveBeenCalledWith(
          type,
          newState,
          {},
          event,
          params,
        );
        expect(events[eventHandler]).toHaveBeenCalledWith(event, params);
      },
    );

    test.each([['onMouseEnter'], ['onMouseLeave'], ['onFocus'], ['onBlur']])(
      'should call handler for %s event if it is present',
      eventHandler => {
        const handler = instance[eventHandler];
        handler(event);
        expect(events[eventHandler]).toHaveBeenCalledWith(event);
      },
    );
  });
});

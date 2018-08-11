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
import {mount, shallow} from 'enzyme';
import {Select, StyledSearchIcon, StyledInput} from '../index';
import {STATE_TYPE, TYPE, ICON} from '../constants';

describe('Stateless select', function() {
  let wrapper,
    events = {};
  let allProps: any = {},
    mockFn;

  beforeEach(function() {
    mockFn = jest.fn();
    events = {
      onChange: mockFn,
      onMouseEnter: mockFn,
      onMouseLeave: mockFn,
      onFocus: mockFn,
      onBlur: mockFn,
    };
    allProps = {
      ...events,
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test.each([
    [TYPE.SEARCH, false],
    [TYPE.SELECT, false],
    [TYPE.SEARCH, true],
    [TYPE.SELECT, true],
  ])(
    'should render component in %s mode and %s for multiple choice',
    (type, multiple) => {
      allProps.type = type;
      allProps.multiple = multiple;
      wrapper = mount(<Select {...allProps} />);
      expect(wrapper).toMatchSnapshot(
        'Component has correct render in ' +
          type +
          ' mode and mutiple choice equal ' +
          multiple,
      );
    },
  );

  test('should apply initial select options if they are missing in options array', function() {
    const initialSelectedOptions = [
      {
        id: '123',
        label: 'label for 123',
      },
    ];
    allProps.selectedOptions = initialSelectedOptions;
    allProps.type = TYPE.SELECT;
    wrapper = shallow(<Select {...allProps} />);
    const instance = wrapper.instance();
    expect(instance.state.selectedOptions).toEqual(initialSelectedOptions);
  });

  describe('events', function() {
    let documentMock, instance;
    beforeEach(function() {
      jest.doMock('global/document', () => ({
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }));
      wrapper = shallow(<Select {...allProps} />);
      instance = wrapper.instance();
      documentMock = require('global/document');
    });

    test('should subscribe on document click to handle toggle of dropdown when component is rendered', function() {
      expect(documentMock.addEventListener).toHaveBeenCalledWith(
        'click',
        instance.handleClickEvent,
        {
          capture: true,
        },
      );
    });

    test('should unsubscribe from document click to handle toggle of dropdown when component is removed from DOM', function() {
      wrapper.unmount();
      expect(documentMock.removeEventListener).toHaveBeenCalledWith(
        'click',
        instance.handleClickEvent,
        {
          capture: true,
        },
      );
    });
    test('should close dropdown if clicked outside of select component', function() {
      wrapper.unmount();
      wrapper = mount(<Select {...allProps} />);
      instance = wrapper.instance();
      instance.setState({isDropDownOpen: true});
      instance.handleClickEvent({
        target: null,
      });
      expect(instance.state.isDropDownOpen).toBeFalsy();
    });

    describe('On change action', function() {
      let id = '2';
      let label = 'label for 2';
      let textValue = 'some value';
      beforeEach(function() {
        const options = [
          {
            id: '1',
            label: 'label for 1',
          },
          {
            id,
            label,
          },
          {
            id: '3',
            label: 'label for 3',
          },
          {
            id: '4',
            label: 'label for 4',
          },
        ];
        allProps.type = TYPE.SEARCH;
        allProps.options = options;
        allProps.onChange = jest.fn();
        wrapper = mount(<Select {...allProps} />);
      });

      test.each([
        [STATE_TYPE.select, {id, label, selectedOptions: [{id, label}]}],
        [STATE_TYPE.clearAll, {selectedOptions: []}],
        [STATE_TYPE.keyUp, {textValue}],
      ])(
        'should set update of state if change action is %s',
        (type, expectedResult) => {
          const e = {
            target: {
              value: textValue,
            },
          };
          const event = [e, type, id, label];
          wrapper.instance().onChange(...event);
          expect(allProps.onChange).toHaveBeenCalledWith(
            e,
            Object.assign({}, expectedResult, {type}),
          );
        },
      );
    });
  });

  describe('Selected Tags', function() {
    let clearIcon;
    let selectedOptions;
    let options;
    beforeEach(function() {
      selectedOptions = [
        {
          id: '2',
          label: 'label for 2',
        },
      ];
      options = [
        {
          id: '1',
          label: 'label for 1',
        },
        {
          id: '2',
          label: 'label for 2',
        },
      ];
      allProps = Object.assign({}, allProps, {
        options,
        selectedOptions,
        type: TYPE.SEARCH,
        multiple: true,
      });
      wrapper = mount(<Select {...allProps} />);
    });

    test('should remove selected tag from selected options if X button is clicked', function() {
      clearIcon = wrapper.find(StyledSearchIcon);
      clearIcon = clearIcon.filterWhere(
        comp => comp.props().$type === ICON.CLEAR_TAG,
      );
      expect(wrapper.instance().state.selectedOptions).toEqual(selectedOptions);
      clearIcon.first().simulate('click');
      expect(wrapper.instance().state.selectedOptions).toEqual([]);
    });

    test('should should clear all selected tags when Clear All clicked', function() {
      wrapper.unmount();
      allProps.selectedOptions = options;
      wrapper = mount(<Select {...allProps} />);
      clearIcon = wrapper.find(StyledSearchIcon);
      clearIcon = clearIcon.filterWhere(
        comp => comp.props().$type === ICON.CLEAR_ALL,
      );
      expect(wrapper.instance().state.selectedOptions).toEqual(options);
      clearIcon.first().simulate('click');
      expect(wrapper.instance().state.selectedOptions).toEqual([]);
    });
  });
  describe('Search mode', function() {
    test('should call change method when key up is hit', function() {
      allProps = Object.assign({}, allProps, {
        type: TYPE.SEARCH,
        multiple: true,
      });
      wrapper = mount(<Select {...allProps} />);
      const value = 'some input value';
      let input = wrapper
        .find(StyledInput)
        .first()
        .find('input');
      const event = {
        target: {value},
      };
      input.props().onKeyUp(event);
      expect(wrapper.instance().props.onChange).toHaveBeenCalledWith(event, {
        type: STATE_TYPE.keyUp,
        textValue: value,
      });
    });
  });
  describe('Select mode', function() {
    test('should toggle dropdown if input is clicked', function() {
      allProps = Object.assign({}, allProps, {
        type: TYPE.SELECT,
      });
      wrapper = mount(<Select {...allProps} />);
      expect(wrapper.instance().state.isDropDownOpen).toBeFalsy();
      wrapper
        .find(StyledInput)
        .first()
        .simulate('click');
      expect(wrapper.instance().state.isDropDownOpen).toBeTruthy();
    });
  });
});

// @flow
import {styled} from '../../styles';
import {ICON, TYPE} from './constants';

import {SIZE} from '../input';
import {
  getInputStyles,
  getInputContainerStyles,
} from '../input/styled-components';

import {getListStyles, getListItemStyles} from '../menu/styled-components';

export const Root = styled('div', props => {
  return {
    position: 'relative',
  };
});

export const Input = styled('input', props => {
  return {
    ...getInputStyles({...props, $size: SIZE.default}),
    cursor: 'pointer',
    width: 'auto',
    flexGrow: '1',
    ':hover': {
      cursor: 'pointer',
    },
  };
});

export const InputContainer = styled('div', props => {
  const {$theme} = props;
  const {
    colors: {primary400},
  } = $theme;
  return {
    ...getInputContainerStyles({...props, $size: SIZE.default}),
    flexWrap: 'wrap',
    padding: '5px',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    borderColor: primary400,
  };
});

export const Tag = styled('span', props => {
  const {$theme, $multiple} = props;
  const {
    colors: {primary400, mono400},
    sizing: {scale800},
  } = $theme;
  return $multiple
    ? {
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
        margin: '5px',
        borderWidth: '1px',
        borderColor: primary400,
        color: primary400,
        borderRadius: '7px',
        lineHeight: scale800,
        backgroundColor: mono400,
      }
    : {
        ...getInputStyles({...props, $size: SIZE.default, $disabled: true}),
        cursor: 'pointer',
        width: 'auto',
        flexGrow: '1',
        ':hover': {
          cursor: 'pointer',
        },
      };
});

export const SearchIcon = styled('img', props => {
  const {$theme} = props;
  const {
    sizing: {scale300, scale400, scale500},
  } = $theme;
  switch (props.$type) {
    case ICON.CLEAR_ALL:
      return {
        marginLeft: 'auto',
        position: 'absolute',
        right: scale400,
      };
    case ICON.SELECT:
      return {
        marginRight: scale500,
      };
    case ICON.SELECTED:
      return {
        paddingRight: scale300,
      };
    case ICON.CLEAR_TAG:
    case ICON.LOOP:
    default:
      return {};
  }
});

export const DropDown = styled('ul', props => {
  const {$theme, $isOpen, $type, $rows} = props;
  const {
    sizing: {scale300, scale600, scale1000},
  } = $theme;
  return {
    ...getListStyles(props),
    height: $rows ? parseInt(scale600) * $rows + 'px' : null,
    overflowY: $rows ? 'scroll' : null,
    top: $type === TYPE.SELECT ? scale1000 : null,
    display: !$isOpen ? 'none' : null,
    width: '96%',
    position: 'absolute',
    padding: scale600,
    listStyle: 'none',
    borderRadius: scale300,
    boxShadow: $theme.lighting.shadow600,
  };
});

export const DropDownItem = styled('li', props => {
  const {$theme} = props;
  const {
    sizing: {scale600},
  } = $theme;
  return {
    ...getListItemStyles(props),
    lineHeight: scale600,
  };
});

export const Option = styled('div', props => {
  const {$selected, disabled, $theme} = props;
  const {
    colors: {mono700, primary400},
    sizing: {scale300},
  } = $theme;
  const padding = $selected
    ? {
        paddingTop: scale300,
        paddingBottom: scale300,
        paddingRight: '0px',
        paddingLeft: '0px',
      }
    : {
        paddingTop: scale300,
        paddingBottom: scale300,
        paddingRight: '18px',
        paddingLeft: '18px',
      };
  return {
    ':hover': {
      cursor: disabled ? 'not-allowed' : 'text',
    },
    color: disabled ? mono700 : $selected ? primary400 : null,
    ...padding,
  };
});

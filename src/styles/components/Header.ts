import { keyframes, styled } from '@/styles/stitches.config'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { violet, mauve } from '@radix-ui/colors';

export const IconButton = styled('button', {
  marginLeft: 'auto',
  borderRadius: '20px',
  border: 'none',
  height: '36px',
  width: '86px',
  
  backgroundColor: '$gray900',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 0.75rem',

  transition: 'all 0.2s',

  '&:hover': {
    filter: 'brightness(0.8)'
  },
});

export const Status = styled('span', {
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  variants: {
    bg: {
      green: {
        backgroundColor: '$green500'
      },
      red: {
        backgroundColor: '$red500'
      }
    }
  }
});
const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const contentStyles = {
  minWidth: 220,
  backgroundColor: '#0E0E0E',
  borderRadius: 6,
  padding: 5,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
};

export const DropdownMenuContent = styled(DropdownMenu.Content, contentStyles);
export const DropdownMenuSubContent = styled(DropdownMenu.SubContent, contentStyles);

export const DropdownMenuArrow = styled(DropdownMenu.Arrow, { fill: '#0E0E0E' });

export const itemStyles = {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 5px',
  position: 'relative',
  paddingLeft: 25,
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    backgroundColor: '$gray900',
    color: violet.violet1,
  },
};

export const DropdownMenuItem = styled(DropdownMenu.Item, itemStyles);
export const DropdownMenuCheckboxItem = styled(DropdownMenu.CheckboxItem, itemStyles);
export const DropdownMenuRadioItem = styled(DropdownMenu.RadioItem, itemStyles);
export const DropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: violet.violet4,
    color: violet.violet11,
  },
  ...itemStyles,
});

export const DropdownMenuLabel = styled(DropdownMenu.Label, {
  paddingLeft: 25,
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11,
});

export const DropdownMenuSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: '$gray600',
  margin: 5,
});

export const DropdownMenuItemIndicator = styled(DropdownMenu.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
  color: mauve.mauve11,
  '[data-highlighted] > &': { color: 'white' },
  '[data-disabled] &': { color: mauve.mauve8 },
});

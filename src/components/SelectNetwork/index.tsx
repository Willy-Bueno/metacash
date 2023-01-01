import { forwardRef } from 'react';
import { styled } from '@/styles/stitches.config'
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { violet, mauve } from '@radix-ui/colors';
import { useAuth } from '@/hooks';

export function SelectNetwork() {
  const { chainId } = useAuth()

  async function changeNetwork(e: any) {
    if(e === '1') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ 
          chainId: '0x1',
         }], 
      })
    } else if(e === '38') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }], 
      })
    } else if(e === '61') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }], 
      })
    }
  }

  return (
    <Select.Root  onValueChange={changeNetwork}>
      <SelectTrigger aria-label="Networks">
        <SelectValue placeholder={
          chainId === '1' ? 'ETH' : chainId === '38' ? 'BSC' : chainId === '61' ? 'tBSC' : 'N/A'
        } />
        <SelectIcon>
          <ChevronDownIcon />
        </SelectIcon>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            <Select.Group>
              <SelectLabel>Suported Networks</SelectLabel>
              <SelectItem value="1">ETH</SelectItem>
              <SelectItem value="38">BSC</SelectItem>
              <SelectItem value="61">tBSC</SelectItem>
            </Select.Group>
          </SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectTrigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 3,
  padding: '0 15px',
  fontSize: 13,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: '$gray900',
  color: violet.violet11,
  cursor: 'pointer',
  '&:hover': { 
    filter: 'brightness(1.1)'
   },
  '&[data-placeholder]': { color: '$white' },
});

const SelectValue = styled(Select.Value, {
  '&[data-placeholder]': { 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
   },
}); 

const SelectIcon = styled(Select.SelectIcon, {
  color: '$gray100',
});

const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: '$gray900',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

const SelectItem = forwardRef(({ children, ...props }: any, forwardedRef: any) => {
  return (
    <StyledItem ref={forwardedRef} {...props}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </StyledItem>
  );
});

const StyledItem = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  color: '$white',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$gray900',
    color: violet.violet1,
  },
});

const SelectLabel = styled(Select.Label, {
  padding: '0 25px',
  fontSize: 12,
  lineHeight: '25px',
  color: mauve.mauve11,
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SelectScrollUpButton = styled(Select.ScrollUpButton, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: '$gray900',
  color: violet.violet11,
  cursor: 'default',
});

const SelectScrollDownButton = styled(Select.ScrollDownButton, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: '$gray900',
  color: violet.violet11,
  cursor: 'default',
});
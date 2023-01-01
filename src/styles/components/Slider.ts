import { styled } from '../stitches.config'
import * as slider from '@radix-ui/react-slider'
import { violet, blackA } from '@radix-ui/colors'

export const SliderRoot = styled(slider.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: 200,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100,
  },
})

export const SliderTrack = styled(slider.Track, {
  backgroundColor: blackA.blackA10,
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
})

export const SliderRange = styled(slider.Range, {
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: '9999px',
  height: '100%',
})

export const SliderThumb = styled(slider.Thumb, {
  display: 'block',
  width: 20,
  height: 20,
  backgroundColor: 'white',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  borderRadius: 10,
  '&:hover': { backgroundColor: violet.violet3 },
  '&:focus': { outline: 'none', boxShadow: `0 0 0 5px ${blackA.blackA8}` },
})
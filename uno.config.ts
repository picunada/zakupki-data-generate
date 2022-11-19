import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  transformers: [transformerVariantGroup()],
  theme: {
    extend: {
      transitionProperty: {
        maxheight: 'max-height',
      },
    },
    // ...
    colors: {
      dark: {
        50: '#f8f0f2',
        100: '#d9d9d9',
        200: '#bfbfbf',
        300: '#a6a6a6',
        400: '#8c8c8c',
        500: '#737373',
        600: '#595959',
        700: '#404040',
        800: '#262626',
        900: '#120b0d',
      },
      gark: {
        50: '#fbeff2',
        100: '#d6dad6',
        200: '#bec0be',
        300: '#a5a7a5',
        400: '#8c8d8b',
        500: '#727472',
        600: '#595b59',
        700: '#3f413f',
        800: '#252725',
        900: '#150a0d',
      },
      yel: {
        50: '#fffada',
        100: '#fff1ad',
        200: '#ffe87d',
        300: '#ffdf4b',
        400: '#ffd61a',
        500: '#e6bc00',
        600: '#b39200',
        700: '#806900',
        800: '#4d3f00',
        900: '#1c1500',
      },
      byel: {
        50: '#fffeda',
        100: '#fff9ad',
        200: '#fff47d',
        300: '#fff04b',
        400: '#ffec1a',
        500: '#e6d200',
        600: '#b3a400',
        700: '#807500',
        800: '#4d4600',
        900: '#1c1700',
      },
      grey: {
        50: '#f8f0f2',
        100: '#d9d9d9',
        200: '#bfbfbf',
        300: '#a6a6a6',
        400: '#8c8c8c',
        500: '#737373',
        600: '#595959',
        700: '#404040',
        800: '#262626',
        900: '#120b0d',
      },
    },
  },
})

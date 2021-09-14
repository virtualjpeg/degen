import {
  ConditionalValue,
  RequiredConditionalValue,
  createAtomicStyles,
  createAtomsFn,
  createMapValueFn,
  createNormalizeValueFn,
} from '@vanilla-extract/sprinkles'
import { calc } from '@vanilla-extract/css-utils'

import { vars } from './vars.css'
import { Breakpoint, breakpointNames, breakpoints } from './breakpoints'

// Ensure reset has lowest specificity
// DO NOT MOVE THIS LINE
import './reset.css'

const flexAlignment = ['flex-start', 'center', 'flex-end', 'stretch'] as const

const space = vars.space
const negativeSpace = {
  ['-px']: `${calc(space.px).negate()}`,
  ['-0.5']: `${calc(space['0.5']).negate()}`,
  ['-1']: `${calc(space['0.5']).negate()}`,
  ['-1.5']: `${calc(space['1.5']).negate()}`,
  ['-2']: `${calc(space['2']).negate()}`,
  ['-2.5']: `${calc(space['2.5']).negate()}`,
  ['-3']: `${calc(space['3']).negate()}`,
  ['-3.5']: `${calc(space['3.5']).negate()}`,
  ['-4']: `${calc(space['4']).negate()}`,
}

const margins = {
  ...space,
  ...negativeSpace,
}

const responsiveAtomicStyles = createAtomicStyles({
  defaultCondition: 'xs',
  conditions: {
    xs: {},
    sm: { '@media': `(min-width: ${breakpoints.sm}px)` },
    md: { '@media': `(min-width: ${breakpoints.md}px)` },
    lg: { '@media': `(min-width: ${breakpoints.lg}px)` },
    xl: { '@media': `(min-width: ${breakpoints.xl}px)` },
  },
  properties: {
    alignItems: [...flexAlignment, 'baseline'],
    alignSelf: [...flexAlignment, 'baseline'],
    borderWidth: vars.borderWidths,
    borderRadius: vars.radii,
    borderBottomLeftRadius: vars.radii,
    borderBottomRightRadius: vars.radii,
    borderTopLeftRadius: vars.radii,
    borderTopRightRadius: vars.radii,
    bottom: vars.space,
    display: ['block', 'flex', 'grid', 'inline-block', 'inline-flex', 'none'],
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexDirection: ['column', 'row'],
    flexWrap: ['wrap', 'nowrap'],
    fontSize: vars.fontSizes,
    fontWeight: vars.fontWeights,
    gap: vars.space,
    height: vars.space,
    inset: vars.space,
    justifyContent: [
      ...flexAlignment,
      'space-around',
      'space-between',
      'space-evenly',
    ],
    justifySelf: flexAlignment,
    left: vars.space,
    letterSpacing: vars.letterSpacings,
    lineHeight: vars.lineHeights,
    marginBottom: margins,
    marginLeft: margins,
    marginRight: margins,
    marginTop: margins,
    maxHeight: vars.space,
    maxWidth: vars.space,
    minHeight: vars.space,
    minWidth: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    paddingTop: vars.space,
    position: ['absolute', 'fixed', 'relative'],
    right: vars.space,
    textAlign: ['center', 'left', 'right'],
    top: vars.space,
    width: vars.space,
  },
  shorthands: {
    insetX: ['left', 'right'],
    insetY: ['bottom', 'top'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    radiusLeft: ['borderBottomLeftRadius', 'borderTopLeftRadius'],
    radiusRight: ['borderBottomRightRadius', 'borderTopRightRadius'],
    radiusTop: ['borderTopLeftRadius', 'borderTopRightRadius'],
    radiusBottom: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    size: ['height', 'width'],
  },
})

const unresponsiveAtomicStyles = createAtomicStyles({
  properties: {
    cursor: ['pointer', 'not-allowed'],
    fontFamily: vars.fonts,
    overflow: ['hidden'],
    strokeWidth: vars.borderWidths,
    whiteSpace: [
      'normal',
      'nowrap',
      'pre',
      'pre-line',
      'pre-wrap',
      'initial',
      'inherit',
    ],
    wordWrap: ['normal', 'break-word', 'initial', 'inherit'],
    transitionDuration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    transitionProperty: {
      none: 'none',
      all: 'all',
      default:
        'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      colors: 'background-color, border-color, color, fill, stroke',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
    },
    transitionTimingFunction: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
    },
  },
})

const selectorAtomicStyles = createAtomicStyles({
  conditions: {
    base: {},
    active: { selector: '&:active' },
    focus: { selector: '&:focus' },
    hover: { selector: '&:hover' },
  },
  defaultCondition: 'base',
  properties: {
    backgroundColor: vars.colors,
    color: vars.colors,
  },
})

export const sprinkles = createAtomsFn(
  responsiveAtomicStyles,
  unresponsiveAtomicStyles,
  selectorAtomicStyles,
)
export type Sprinkles = Parameters<typeof sprinkles>[0]

export type OptionalResponsiveValue<Value extends string | number> =
  ConditionalValue<typeof responsiveAtomicStyles, Value>
export type RequiredResponsiveValue<Value extends string | number> =
  RequiredConditionalValue<typeof responsiveAtomicStyles, Value>

export type OptionalResponsiveObject<Value> = Partial<Record<Breakpoint, Value>>
export type RequiredResponsiveObject<Value> = Partial<
  Record<Breakpoint, Value>
> &
  Record<typeof breakpointNames[0], Value>

export const normalizeResponsiveValue = createNormalizeValueFn(
  responsiveAtomicStyles,
)
export const mapResponsiveValue = createMapValueFn(responsiveAtomicStyles)

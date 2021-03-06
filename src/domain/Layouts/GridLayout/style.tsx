import isPlainObject from 'lodash/isPlainObject'
import styled, { css } from 'styled-components'

import { Props, Utils, Variables } from '../../../common'
import { getMarginSizeAtBreakpoint } from '../../Spacers/services/margins'

enum HorizontalAlignment {
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Justify = 'justify',
  Spaced = 'spaced'
}

enum VerticalAlignment {
  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',
  Stretch = 'stretch',
  Baseline = 'baseline'
}

type GutterSize = 'none' | Variables.Spacing | Variables.Layout
type CellSize = number | 'auto' | 'shrink' | 'fullWidth'
type CellOffset = number
type CellDisplayType = 'block' | 'flex'

interface IStyledCellSizes {
  min?: CellSize
  tablet?: CellSize
  desktop?: CellSize
  bigDesktop?: CellSize
}

interface IStyledCellOffsets {
  min?: CellOffset
  tablet?: CellOffset
  desktop?: CellOffset
  bigDesktop?: CellOffset
}

interface IStyledGridGutters {
  min?: GutterSize
  tablet?: GutterSize
  desktop?: GutterSize
  bigDesktop?: GutterSize
}

interface IStyledHorizontalAlignment {
  min?: HorizontalAlignment
  tablet?: HorizontalAlignment
  desktop?: HorizontalAlignment
  bigDesktop?: HorizontalAlignment
}

interface IStyledVerticalAlignment {
  min?: VerticalAlignment
  tablet?: VerticalAlignment
  desktop?: VerticalAlignment
  bigDesktop?: VerticalAlignment
}

interface IStyledGridLayoutProps {
  horizontalAlignment: HorizontalAlignment | IStyledHorizontalAlignment,
  verticalAlignment: VerticalAlignment | IStyledVerticalAlignment,
  gutterMarginX: GutterSize | IStyledGridGutters,
  gutterMarginY: GutterSize | IStyledGridGutters,
  margins?: Props.IMargins
}

interface IStyledCellProps {
  gridColumns: number
  size: CellSize | IStyledCellSizes
  offset: CellOffset | IStyledCellOffsets
  gutterMarginX: GutterSize | IStyledGridGutters
  gutterMarginY: GutterSize | IStyledGridGutters
  gutterPaddingX: GutterSize | IStyledGridGutters
  gutterPaddingY: GutterSize | IStyledGridGutters
  displayType: CellDisplayType
  flexHorizontalAlignment: HorizontalAlignment | IStyledHorizontalAlignment
}

const breakpointOrder: ReadonlyArray<keyof IStyledCellSizes> = ['min', 'tablet', 'desktop', 'bigDesktop']

function isCellSize (size: CellSize | IStyledCellSizes): size is CellSize {
  return !isPlainObject(size)
}

function isCellOffset (offset: CellOffset | IStyledCellOffsets): offset is CellOffset {
  return !isPlainObject(offset)
}

function isGutterSize (gutters: GutterSize | IStyledGridGutters): gutters is GutterSize {
  return !isPlainObject(gutters)
}

function isHorizontalAlignment (
  horizontalAlignment: HorizontalAlignment | IStyledHorizontalAlignment
): horizontalAlignment is HorizontalAlignment {
  return !isPlainObject(horizontalAlignment)
}

function isVerticalAlignment (
  verticalAlignment: VerticalAlignment | IStyledVerticalAlignment
): verticalAlignment is VerticalAlignment {
  return !isPlainObject(verticalAlignment)
}

function getSizeAtBreakpoint (size: CellSize | IStyledCellSizes, breakpoint: keyof IStyledCellSizes): CellSize {
  if (isCellSize(size)) {
    return size
  }

  let lastSize: CellSize = 'auto'

  for (const curBreakpoint of breakpointOrder) {
    lastSize = size[curBreakpoint] || lastSize

    if (curBreakpoint === breakpoint) {
      break
    }
  }

  return lastSize
}

function getOffsetAtBreakpoint (
  offset: CellOffset | IStyledCellOffsets,
  breakpoint: keyof IStyledCellOffsets
): CellOffset {
  if (isCellOffset(offset)) {
    return offset
  }

  let lastOffset: CellOffset = 0

  for (const curBreakpoint of breakpointOrder) {
    lastOffset = offset[curBreakpoint] || lastOffset

    if (curBreakpoint === breakpoint) {
      break
    }
  }

  return lastOffset
}

function getGutterPxAtBreakpoint (
  gutter: GutterSize | IStyledGridGutters,
  breakpoint: keyof IStyledGridGutters
): number {
  if (isGutterSize(gutter)) {
    return gutter === 'none' ? 0 : gutter
  }

  let lastGutter: GutterSize = 'none'

  for (const curBreakpoint of breakpointOrder) {
    lastGutter = gutter[curBreakpoint] || lastGutter

    if (curBreakpoint === breakpoint) {
      break
    }
  }

  return lastGutter === 'none' ? 0 : lastGutter
}

function getHorizontalAlignmentAtBreakpoint (
  horizontalAlignment: HorizontalAlignment | IStyledHorizontalAlignment,
  breakpoint: keyof IStyledHorizontalAlignment
): HorizontalAlignment {
  if (isHorizontalAlignment(horizontalAlignment)) {
    return horizontalAlignment
  }

  let lastAlignment: HorizontalAlignment = HorizontalAlignment.Left

  for (const curBreakpoint of breakpointOrder) {
    lastAlignment = horizontalAlignment[curBreakpoint] || lastAlignment

    if (curBreakpoint === breakpoint) {
      break
    }
  }

  return lastAlignment
}

function getVerticalAlignmentAtBreakpoint (
  verticalAlignment: VerticalAlignment | IStyledVerticalAlignment,
  breakpoint: keyof IStyledVerticalAlignment
): VerticalAlignment {
  if (isVerticalAlignment(verticalAlignment)) {
    return verticalAlignment
  }

  let lastAlignment: VerticalAlignment = VerticalAlignment.Stretch

  for (const curBreakpoint of breakpointOrder) {
    lastAlignment = verticalAlignment[curBreakpoint] || lastAlignment

    if (curBreakpoint === breakpoint) {
      break
    }
  }

  return lastAlignment
}

function getPropertiesForHorizontalAlignment (alignment: HorizontalAlignment) {
  switch (alignment) {
    case HorizontalAlignment.Left:
      return css`
        justify-content: flex-start;
      `
    case HorizontalAlignment.Right:
      return css`
        justify-content: flex-end;
      `
    case HorizontalAlignment.Center:
      return css`
        justify-content: center;
      `
    case HorizontalAlignment.Justify:
      return css`
        justify-content: space-between;
      `
    case HorizontalAlignment.Spaced:
      return css`
        justify-content: space-around;
      `
  }
}

function getPropertiesForVerticalAlignment (alignment: VerticalAlignment) {
  switch (alignment) {
    case VerticalAlignment.Top:
      return css`
        align-items: flex-start;
      `
    case VerticalAlignment.Bottom:
      return css`
        align-items: flex-end;
      `
    case VerticalAlignment.Middle:
      return css`
        align-items: center;
      `
    case VerticalAlignment.Stretch:
      return css`
        align-items: stretch;
      `
    case VerticalAlignment.Baseline:
      return css`
        align-items: baseline;
      `
  }
}

function gridStyleForPropsAtBreakpoint (
  props: IStyledGridLayoutProps,
  breakpoint: keyof IStyledGridGutters) {
  const xMarginGutterSize = getGutterPxAtBreakpoint(props.gutterMarginX, breakpoint)
  const yMarginGutterSize = getGutterPxAtBreakpoint(props.gutterMarginY, breakpoint)
  const horizontalAlignment = getHorizontalAlignmentAtBreakpoint(props.horizontalAlignment, breakpoint)
  const verticalAlignment = getVerticalAlignmentAtBreakpoint(props.verticalAlignment, breakpoint)
  const leftMargin = props.margins ? gridMarginStyleAtBreakpoint(breakpoint, props.margins.left) : 0
  const rightMargin = props.margins ? gridMarginStyleAtBreakpoint(breakpoint, props.margins.right) : 0
  const topMargin = props.margins ? gridMarginStyleAtBreakpoint(breakpoint, props.margins.top) : 0
  const bottomMargin = props.margins ? gridMarginStyleAtBreakpoint(breakpoint, props.margins.bottom) : 0
  let leftMarginGutters
  let rightMarginGutters
  let topMarginGutters
  let bottomMarginGutters

  if (xMarginGutterSize > 0 || leftMargin > 0) {
    leftMarginGutters = css`
        margin-left: ${leftMargin - xMarginGutterSize / 2}px;
      `
  }

  if (xMarginGutterSize > 0 || rightMargin > 0) {
    rightMarginGutters = css`
        margin-right: ${rightMargin - xMarginGutterSize / 2}px;
      `
  }

  if (yMarginGutterSize > 0 || topMargin > 0) {
    topMarginGutters = css`
        margin-top: ${topMargin - yMarginGutterSize / 2}px;
      `
  }

  if (yMarginGutterSize > 0 || bottomMargin > 0) {
    bottomMarginGutters = css`
        margin-bottom: ${bottomMargin - yMarginGutterSize / 2}px;
      `
  }

  return css`
    ${leftMarginGutters}
    ${rightMarginGutters}
    ${topMarginGutters}
    ${bottomMarginGutters}
    ${getPropertiesForHorizontalAlignment(horizontalAlignment)}
    ${getPropertiesForVerticalAlignment(verticalAlignment)}
  `
}

function gridMarginStyleAtBreakpoint (breakpoint: keyof IStyledGridGutters, margin?: Props.Margin) {
  if (!margin || margin === 'none') {
    return 0
  }

  if (typeof margin === 'number') {
    return margin
  }

  return getMarginSizeAtBreakpoint(breakpoint, margin)
}

function gridStyleForProps (props: IStyledGridLayoutProps) {
  return css`
    ${Utils.mediaQueryBetweenSizes({ maxPx: Variables.Breakpoint.breakpointTablet })} {
      ${gridStyleForPropsAtBreakpoint(props, 'min')}
    }

    ${Utils.mediaQueryBetweenSizes({
      minPx: Variables.Breakpoint.breakpointTablet,
      maxPx: Variables.Breakpoint.breakpointDesktop
    })} {
      ${gridStyleForPropsAtBreakpoint(props, 'tablet')}
    }

    ${Utils.mediaQueryBetweenSizes({
      minPx: Variables.Breakpoint.breakpointDesktop,
      maxPx: Variables.Breakpoint.breakpointBigDesktop
    })} {
      ${gridStyleForPropsAtBreakpoint(props, 'desktop')}
    }

    ${Utils.mediaQueryBetweenSizes({ minPx: Variables.Breakpoint.breakpointBigDesktop })} {
      ${gridStyleForPropsAtBreakpoint(props, 'bigDesktop')}
    }
  `
}

const StyledGridLayout = styled.div<IStyledGridLayoutProps>`
  display: flex;
  flex-flow: row wrap;
  flex: 1 0 auto;

  ${gridStyleForProps}
`

interface ICellStyleArguments {
  displayType: CellDisplayType,
  gridColumns: number
  size: CellSize
  flexHorizontalAlignment: HorizontalAlignment
  offset: CellOffset
  gutters: {
    marginXPx: number
    marginYPx: number
    paddingXPx: number
    paddingYPx: number
  }
}

function cellStyleForSizeAndGutters (
  {
    gridColumns,
    size,
    displayType,
    flexHorizontalAlignment,
    offset,
    gutters
  }: ICellStyleArguments
) {
  let flexProperties
  let offsetProperties
  let leftRightPaddingGutters
  let topBottomPaddingGutters
  let leftRightMarginGutters
  let topBottomMarginGutters
  let flexHorizontalAlignmentProperties

  if (gutters.paddingXPx > 0) {
    leftRightPaddingGutters = css`
      padding-left: ${gutters.paddingXPx / 2}px;
      padding-right: ${gutters.paddingXPx / 2}px;
    `
  }

  if (gutters.paddingYPx > 0) {
    topBottomPaddingGutters = css`
      padding-top: ${gutters.paddingYPx / 2}px;
      padding-bottom: ${gutters.paddingYPx / 2}px;
    `
  }

  if (gutters.marginXPx > 0) {
    leftRightMarginGutters = css`
      margin-left: ${gutters.marginXPx / 2}px;
      margin-right: ${gutters.marginXPx / 2}px;
    `
  }

  if (gutters.marginYPx > 0) {
    topBottomMarginGutters = css`
      margin-top: ${gutters.marginYPx / 2}px;
      margin-bottom: ${gutters.marginYPx / 2}px;
    `
  }

  if (size === 'auto') {
    flexProperties = css`
      flex: 1 1 0%;
      width: auto;
    `
  } else if (size === 'shrink') {
    flexProperties = css`
      flex: 0 0 auto;
      width: auto;
    `
  } else {
    const widthPercentage = (size === 'fullWidth') ? 100 : (size * 100 / gridColumns)

    if (gutters.marginXPx > 0) {
      flexProperties = css`
        width: calc(${widthPercentage}% - ${gutters.marginXPx}px);
      `
    } else {
      flexProperties = css`
        width: ${widthPercentage}%;
      `
    }
  }

  if (offset > 0) {
    const offsetPercentage = offset * 100 / gridColumns

    if (gutters.marginXPx > 0) {
      offsetProperties = css`
        margin-left: calc(${offsetPercentage}% + ${gutters.marginXPx / 2}px);
      `
    } else {
      offsetProperties = css`
        margin-left: ${offsetPercentage}%;
      `
    }
  }

  if (displayType === 'flex') {
    flexHorizontalAlignmentProperties = css`
      display: flex;

      ${getPropertiesForHorizontalAlignment(flexHorizontalAlignment)}
    `
  }

  return css`
    ${leftRightPaddingGutters}
    ${topBottomPaddingGutters}
    ${leftRightMarginGutters}
    ${topBottomMarginGutters}
    ${flexProperties}
    ${offsetProperties}
    ${flexHorizontalAlignmentProperties}
  `
}

function cellStyleForProps (props: IStyledCellProps) {
  const {
    gridColumns = 12,
    size = 'auto',
    offset = 0,
    gutterMarginX = 'none',
    gutterMarginY = 'none',
    gutterPaddingX = 'none',
    gutterPaddingY = 'none'
  } = props

  return css`
    ${Utils.mediaQueryBetweenSizes({ maxPx: Variables.Breakpoint.breakpointTablet })} {
      ${cellStyleForSizeAndGutters({
        gridColumns,
        size: getSizeAtBreakpoint(size, 'min'),
        offset: getOffsetAtBreakpoint(offset, 'min'),
        displayType: props.displayType,
        flexHorizontalAlignment: getHorizontalAlignmentAtBreakpoint(props.flexHorizontalAlignment, 'min'),
        gutters: {
          marginXPx: getGutterPxAtBreakpoint(gutterMarginX, 'min'),
          marginYPx: getGutterPxAtBreakpoint(gutterMarginY, 'min'),
          paddingXPx: getGutterPxAtBreakpoint(gutterPaddingX, 'min'),
          paddingYPx: getGutterPxAtBreakpoint(gutterPaddingY, 'min')
        }
      })}
    }

    ${Utils.mediaQueryBetweenSizes({
      minPx: Variables.Breakpoint.breakpointTablet,
      maxPx: Variables.Breakpoint.breakpointDesktop
    })} {
      ${cellStyleForSizeAndGutters({
        gridColumns,
        size: getSizeAtBreakpoint(size, 'tablet'),
        offset: getOffsetAtBreakpoint(offset, 'tablet'),
        displayType: props.displayType,
        flexHorizontalAlignment: getHorizontalAlignmentAtBreakpoint(props.flexHorizontalAlignment, 'tablet'),
        gutters: {
          marginXPx: getGutterPxAtBreakpoint(gutterMarginX, 'tablet'),
          marginYPx: getGutterPxAtBreakpoint(gutterMarginY, 'tablet'),
          paddingXPx: getGutterPxAtBreakpoint(gutterPaddingX, 'tablet'),
          paddingYPx: getGutterPxAtBreakpoint(gutterPaddingY, 'tablet')
        }
      })}
    }

    ${Utils.mediaQueryBetweenSizes({
      minPx: Variables.Breakpoint.breakpointDesktop,
      maxPx: Variables.Breakpoint.breakpointBigDesktop
    })} {
      ${cellStyleForSizeAndGutters({
        gridColumns,
        size: getSizeAtBreakpoint(size, 'desktop'),
        offset: getOffsetAtBreakpoint(offset, 'desktop'),
        displayType: props.displayType,
        flexHorizontalAlignment: getHorizontalAlignmentAtBreakpoint(props.flexHorizontalAlignment, 'desktop'),
        gutters: {
          marginXPx: getGutterPxAtBreakpoint(gutterMarginX, 'desktop'),
          marginYPx: getGutterPxAtBreakpoint(gutterMarginY, 'desktop'),
          paddingXPx: getGutterPxAtBreakpoint(gutterPaddingX, 'desktop'),
          paddingYPx: getGutterPxAtBreakpoint(gutterPaddingY, 'desktop')
        }
      })}
    }

    ${Utils.mediaQueryBetweenSizes({ minPx: Variables.Breakpoint.breakpointBigDesktop })} {
      ${cellStyleForSizeAndGutters({
        gridColumns,
        size: getSizeAtBreakpoint(size, 'bigDesktop'),
        offset: getOffsetAtBreakpoint(offset, 'bigDesktop'),
        displayType: props.displayType,
        flexHorizontalAlignment: getHorizontalAlignmentAtBreakpoint(props.flexHorizontalAlignment, 'bigDesktop'),
        gutters: {
          marginXPx: getGutterPxAtBreakpoint(gutterMarginX, 'bigDesktop'),
          marginYPx: getGutterPxAtBreakpoint(gutterMarginY, 'bigDesktop'),
          paddingXPx: getGutterPxAtBreakpoint(gutterPaddingX, 'bigDesktop'),
          paddingYPx: getGutterPxAtBreakpoint(gutterPaddingY, 'bigDesktop')
        }
      })}
    }
  `
}

const StyledCell = styled.div<IStyledCellProps>`
  flex: 0 0 auto;
  flex-basis: auto;
  min-height: 1px;
  min-width: 1px;
  width: 100%;

  ${cellStyleForProps}
`

export {
  CellOffset,
  CellSize,
  GutterSize,
  HorizontalAlignment,
  IStyledCellOffsets,
  IStyledCellProps,
  IStyledCellSizes,
  IStyledGridGutters,
  IStyledHorizontalAlignment,
  StyledGridLayout,
  StyledCell,
  VerticalAlignment
}

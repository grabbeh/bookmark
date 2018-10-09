import styled from 'styled-components'
import { space, width, height, color, borderRadius } from 'styled-system'
import * as React from 'react'
import PropTypes from 'prop-types'
import theme from '../theme'

const StyledBox = styled.div`
  ${space} ${width} ${height} ${color} ${borderRadius};
`

// To recognise propTypes in docz, we have to create new Box to wrap StyledBox
const Box = ({ children, ...props }) => (
  <StyledBox {...props}>{children}</StyledBox>
)

Box.displayName = 'Box'

Box.defaultProps = {
  theme: theme,
  bg: 'light-gray',
  p: 3
}

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

Box.propTypes = {
  /** Text color */
  color: PropTypes.string,
  /** Background color */
  bg: PropTypes.string,
  /** Width */
  width: numberStringOrArray,
  /** Height */
  height: numberStringOrArray,
  /** Margin */
  m: numberStringOrArray,
  /** Top margin */
  mt: numberStringOrArray,
  /** Right margin */
  mr: numberStringOrArray,
  /** Bottom margin */
  mb: numberStringOrArray,
  /** Left margin */
  ml: numberStringOrArray,
  /** Horizontal margin */
  mx: numberStringOrArray,
  /** Vertical margin */
  my: numberStringOrArray,
  /** Padding */
  p: numberStringOrArray,
  /** Top padding */
  pt: numberStringOrArray,
  /** Right padding */
  pr: numberStringOrArray,
  /** Bottom padding */
  pb: numberStringOrArray,
  /** Left padding */
  pl: numberStringOrArray,
  /** Horizontal padding */
  px: numberStringOrArray,
  /** Vertical padding */
  py: numberStringOrArray,
  /** Border radius */
  borderRadius: PropTypes.number
}

export default Box

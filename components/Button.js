import styled from 'styled-components'
import {
  space,
  width,
  color,
  fontWeight,
  fontSize,
  borderRadius,
  borders
} from 'styled-system'
import * as React from 'react'
import PropTypes from 'prop-types'
import theme from '../theme'

const StyledButton = styled.button`
  outline: 1px solid transparent;
  border: none;
  ${space} ${width} ${fontSize} ${color} ${fontWeight} ${borderRadius} ${borders}
`

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

Button.displayName = 'Box'

Button.defaultProps = {
  theme: theme,
  bg: 'blue',
  px: 3,
  py: 2,
  fontSize: 1,
  fontWeight: 'bold',
  color: 'white',
  disabled: false
}

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

Button.propTypes = {
  fontSize: numberStringOrArray,
  /** Font weight */
  fontWeight: PropTypes.string,
  /** Text color */
  color: PropTypes.string,
  /** Background color */
  bg: PropTypes.string,
  /** Width */
  width: numberStringOrArray,
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

export default Button

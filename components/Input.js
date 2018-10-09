import React from 'react'
import Text from './Text'
import Box from './Box'
import {
  space,
  width,
  borders,
  borderColor,
  borderBottom,
  borderLeft,
  borderTop,
  borderRight,
  fontSize
} from 'styled-system'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../theme'

const StyledInput = styled.input`
  outline: 0;
  ${space}
  ${width}
  ${borders}
  ${borderBottom}
  ${borderTop}
  ${borderLeft}
  ${borderRight}
  ${borderColor}
  ${fontSize}
`
class Input extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  render () {
    const {
      label,
      type,
      placeholder,
      name,
      handleChange,
      value,
      error,
      onFocus,
      onBlur,
      readOnly,
      autoComplete
    } = this.props

    return (
      <Box bg='white' p={0} fontSize={3}>
        {label &&
          <Text>
            <label htmlFor={value}>
              {label}
            </label>
          </Text>}
        <StyledInput
          autoComplete={autoComplete}
          id={value}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          type={type}
          name={name}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          {...this.props}
        />
        <Text color='red' fontWeight='bold' fontSize={3}>{error}</Text>
      </Box>
    )
  }
}

Input.defaultProps = {
  theme: theme,
  bg: 'white',
  p: 1,
  borderLeft: '0',
  borderRight: '0',
  borderTop: '0',
  borderBottom: '3px solid',
  borderColor: 'blue',
  mt: 2,
  fontSize: 1
}

const numberStringOrArray = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
  PropTypes.array
])

Input.propTypes = {
  /** Text color */
  color: PropTypes.string,
  /** Background color */
  bg: PropTypes.string,
  /** Width */
  width: numberStringOrArray,
  /** Font size */
  fontSize: numberStringOrArray,
  /** Font weight */
  fontWeight: PropTypes.string,
  /** Border top */
  borderTop: PropTypes.string,
  /** Border left */
  borderLeft: PropTypes.string,
  /** Border bottom */
  borderBottom: PropTypes.string,
  /** Border right */
  borderRight: PropTypes.string,
  /** Border color */

  ...borders.propType,
  borderColor: PropTypes.string,
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
  borderRadius: PropTypes.number,
  /** Label */
  label: PropTypes.string,
  /** Value */
  value: PropTypes.string,
  /** Placeholder  */
  placeholder: PropTypes.string,
  /** Handle change fn */
  handleChange: PropTypes.func.isRequired
}

export default Input

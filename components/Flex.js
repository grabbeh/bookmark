import styled from 'styled-components'
import {
  space,
  width,
  color,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  propTypes
} from 'styled-system'

const Flex = styled.div`
display: flex;
${space} ${width} ${color} ${flexWrap} ${flexDirection} ${alignItems} ${justifyContent}
`

Flex.displayName = 'Flex'

Flex.propTypes = {
  ...propTypes.space,
  ...propTypes.width,
  ...propTypes.color,
  ...propTypes.alignItems,
  ...propTypes.justifyContent,
  ...propTypes.flexWrap,
  ...propTypes.flexDirection
}

export default Flex

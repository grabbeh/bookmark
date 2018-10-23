import posed from 'react-pose'
import styled from 'styled-components'
import { themeGet } from 'styled-system'

const Error = styled(
  posed.div({
    visible: { opacity: 1, x: 0, transition: { duration: 1000 } },
    hidden: { opacity: 0, x: -100 }
  })
)`color: ${themeGet('colors.red')};
font-weight: bold;`

export default ({ error, children }) => {
  console.log(error)
  return <Error pose={error ? 'visible' : 'hidden'}>{children}</Error>
}

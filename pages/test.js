import Box from '../components/AnimatedBox'
import { Flex } from '../components/Flex'
import Text from '../components/Text'
import { Component } from 'react'

class Test extends Component {
  state = {
    isVisible: false
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        isVisible: !this.state.isVisible,
        open: !this.state.open
      })
    }, 1000)
  }

  render () {
    let { isVisible } = this.state
    return (
      <Flex justifyContent='center'>
        <Box
          mt={5}
          p={4}
          width={400}
          height={400}
          bg='blue'
          initialPose='hidden'
          pose='visible'
        >
          <Text fontWeight='bold' fontSize={4} color='white'>Hello World</Text>
        </Box>
      </Flex>
    )
  }
}

export default Test

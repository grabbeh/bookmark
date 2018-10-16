import React, { Component, Fragment } from 'react'
import Loading from '../components/Loading'
import { Query, Mutation } from 'react-apollo'
import SUBSCRIBER_QUERY from '../queries/checkSubscriber'
import CONFIRM_SUBSCRIPTION from '../queries/confirmSubscriber'
import Box from '../components/Box'
import Text from '../components/Text'
import Button from '../components/Button'
import { Flex } from '../components/Flex'

class ConfirmInvite extends Component {
  static async getInitialProps ({ query }) {
    let { id } = query
    return { id }
  }

  render () {
    let { id } = this.props
    return (
      <Query query={SUBSCRIBER_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />
          if (error) {
            console.log(error)
            return 'Error'
          }
          if (data.subscriber.isConfirmed) {
            return (
              <Flex justifyContent='center'>
                <Box p={4}>
                  <Text fontWeight='bold' fontSize={4}>
                    Looks like this subscription has already been confirmed
                  </Text>
                </Box>
              </Flex>
            )
          }
          return (
            <Box p={3}>
              <Flex justifyContent='center'>
                <Text fontWeight='bold' fontSize={4}>
                  Confirm subscription!
                </Text>
              </Flex>
              <Mutation mutation={CONFIRM_SUBSCRIPTION} variables={{ id: id }}>
                {(confirmSubscriber, { data, called }) => {
                  return (
                    <Fragment>
                      <Flex justifyContent='center'>
                        <Button
                          disabled={loading || called}
                          mt={3}
                          px={3}
                          py={2}
                          onClick={confirmSubscriber}
                        >
                          CONFIRM
                        </Button>
                      </Flex>
                      {data &&
                        data.confirmSubscriber &&
                        data.confirmSubscriber.isConfirmed &&
                        <Flex justifyContent='center'>
                          <Text fontSize={2} mt={3}>
                            You have attained maximum enlightenment
                          </Text>
                        </Flex>}

                    </Fragment>
                  )
                }}
              </Mutation>
            </Box>
          )
        }}
      </Query>
    )
  }
}

export default ConfirmInvite

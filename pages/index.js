import Box from '../components/Box'
import Text from '../components/Text'
import Input from '../components/Input'
import Button from '../components/Button'
import { Flex } from '../components/Flex'
import React, { Component, Fragment } from 'react'
import { FaShip } from 'react-icons/fa'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Mutation } from 'react-apollo'
import ADD_SUBSCRIBER_MUTATION from '../queries/addSubscriberMutation'

const transformErrors = errorMessages => {
  const errors = {
    existingSubscription: ''
  }
  errorMessages.forEach(e => {
    if (e === 'EXISTING_SUBSCRIPTION') {
      errors.existingSubscription =
        'Looks like we already have a subscription for this email'
    }
  })
  return errors
}

class Page extends Component {
  render () {
    return (
      <Fragment>
        <Flex flexWrap='wrap'>
          <Box zIndex='1' width={1 / 2}>
            <Box pt={[3, 5]} pb={5} px={[3, 5]}>
              <Text fontSize={[4, 5, 6]} fontWeight='bold'>
                shipper
                <FaShip style={{ paddingLeft: '30px', fontSize: '65px' }} />
              </Text>
              <Text color=' gray' fontSize={[3, 4]}>
                Get weekly emails with content from your recently favourited tweets
              </Text>
              <Box>
                <Mutation mutation={ADD_SUBSCRIBER_MUTATION}>
                  {addSubscriber => (
                    <Formik
                      initialValues={{
                        email: '',
                        username: '',
                        existingSubscription: ''
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string().email().required('Required'),
                        username: Yup.string().required('Required')
                      })}
                      handleSubmit={(values, { setSubmitting, setErrors }) => {
                        let { email, username } = values
                        addSubscriber({ variables: { email, username } }).then(
                          response => {
                            setSubmitting(false)
                          },
                          e => {
                            const errorMessages = e.graphQLErrors.map(
                              error => error.message
                            )
                            let errors = transformErrors(errorMessages)
                            setSubmitting(false)
                            setErrors({
                              ...errors
                            })
                          }
                        )
                      }}
                    >
                      {props => {
                        const {
                          values,
                          touched,
                          errors,
                          isSubmitting,
                          handleChange
                        } = props
                        return (
                          <Form>
                            <Input
                              id='username'
                              handleChange={handleChange}
                              value={values.username}
                              fontSize={[3, 4]}
                              borderBottom='3px solid'
                              borderColor='gray'
                              placeholder='@username'
                            />
                            {errors.username &&
                              touched.username &&
                              <Text fontWeight='bold' color='red'>
                                {errors.username}
                              </Text>}
                            <Input
                              id='email'
                              handleChange={handleChange}
                              value={values.email}
                              mt={4}
                              fontSize={[3, 4]}
                              borderBottom='3px solid'
                              borderColor='gray'
                              placeholder='email'
                            />
                            {errors.email &&
                              touched.email &&
                              <Text fontWeight='bold' color='red'>
                                {errors.email}
                              </Text>}
                            <Box mt={3}>
                              <Button
                                type='submit'
                                disabled={isSubmitting}
                                bg='green'
                                fontSize={[1, 3]}
                                borderRadius={2}
                                px={[2, 3]}
                                py={[1, 2]}
                              >
                                SUBSCRIBE
                              </Button>
                              {errors.existingSubscription &&
                                <Text fontWeight='bold' color='red'>
                                  {errors.existingSubscription}
                                </Text>}
                              {response && response.data &&
                                <Text fontWeight='bold' color='red'>
                                  'Thanks! Check your email to confirm your subscription!'
                                </Text>}
                            </Box>
                          </Form>
                        )
                      }}
                    </Formik>
                  )}
                </Mutation>
              </Box>
            </Box>
          </Box>
          <Box transform={1} height='100vh' width={1 / 3} bg='light-purple' />
          <Box
            position='absolute'
            right='0'
            height='100vh'
            width={1 / 3}
            bg='light-purple'
          />
        </Flex>
      </Fragment>
    )
  }
}
export default Page

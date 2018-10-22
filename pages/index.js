import Box from '../components/Box'
import AnimatedBox from '../components/AnimatedBox'
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
import Error from '../components/Error'

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
  state = {
    successMessage: false,
    isLoaded: false
  }

  componentDidMount () {
    this.setState({ isLoaded: true })
  }

  render () {
    let { successMessage, isLoaded } = this.state
    return (
      <Fragment>
        <Flex flexWrap='wrap'>
          <Box width={[0.8, 2 / 3]}>
            <AnimatedBox
              initialPose='hidden'
              pose={isLoaded ? 'visible' : 'hidden'}
            >
              <Box zIndex='1' width={[0.9, 0.8, 1 / 2]}>
                <Box width={1} pt={[3, 5]} pb={5} px={[3, 5]}>
                  <Text fontSize={[4, 5, 6]} fontWeight='bold'>
                    shipper
                    <FaShip
                      style={{
                        paddingLeft: '30px',
                        fontSize: '65px'
                      }}
                    />
                  </Text>
                  <Text color='gray' fontSize={[3, 4]}>
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
                          validateOnChange={false}
                          validationSchema={Yup.object().shape({
                            email: Yup.string()
                              .email()
                              .required('Please provide an email address'),
                            username: Yup.string().required(
                              'Please give your Twitter username'
                            )
                          })}
                          onSubmit={(values, { setSubmitting, setErrors }) => {
                            setErrors({
                              email: false,
                              username: false
                            })
                            let { email, username } = values
                            addSubscriber({
                              variables: { email, username }
                            }).then(
                              res => {
                                this.setState({
                                  successMessage: 'Thanks! Check your email to confirm your subscription!'
                                })
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

                                {touched.username &&
                                  <Error error={errors.username}>
                                    {errors.username}
                                  </Error>}
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

                                {touched.email &&
                                  <Error error={errors.email}>
                                    {errors.email}
                                  </Error>}
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
                                    <Text mt={2} fontWeight='bold' color='red'>
                                      {errors.existingSubscription}
                                    </Text>}
                                  {successMessage &&
                                    <Text fontWeight='bold' color='red'>
                                      {successMessage}
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
            </AnimatedBox>
          </Box>
        </Flex>
      </Fragment>
    )
  }
}
export default Page

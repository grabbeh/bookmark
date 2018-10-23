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
    existingSubscription: false
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
          <Box>
            <AnimatedBox pose={isLoaded ? 'show' : 'hide'}>
              <Box zIndex='1' width={[1, 0.8, 1 / 2]}>
                <Box pt={[3, 5]} pb={5} px={[3, 5]}>
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
                            username: ''
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
                              username: false, 
                              existingSubscription: false
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
                                  width={1}
                                  fontSize={[3, 4]}
                                  borderBottom='3px solid'
                                  borderColor='blue'
                                  placeholder='@username'
                                />
                                <Box height={20}>
                                {touched.username &&
                                  <Error error={errors.username}>
                                    {errors.username}
                                  </Error>}
                                </Box>
                                <Input
                                  id='email'
                                  handleChange={handleChange}
                                  value={values.email}
                                  width={1}
                                  mt={3}
                                  fontSize={[3, 4]}
                                  borderBottom='3px solid'
                                  borderColor='blue'
                                  placeholder='email'
                                />
                              <Box height={20}>
                              {touched.email &&
                                  <Error error={errors.email}>
                                    {errors.email}
                                  </Error>}
                              </Box>
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
                                   <Box mt={2}>
                                    <Error error={errors.existingSubscription}>
                                      {errors.existingSubscription}
                                    </Error>
                                  </Box>
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

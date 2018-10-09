import gql from 'graphql-tag'

export default gql`
mutation addSubscriber($username: String!, $email: String!) {
  addSubscriber(username: $username, email: $email) {
    email
    username
  }
}
`

import gql from 'graphql-tag'

export default gql`
mutation confirmSubscriber($id: ID) {
  confirmSubscriber(id: $id) {
    isConfirmed
  }
}
`

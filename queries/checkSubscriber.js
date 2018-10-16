import gql from 'graphql-tag'

export default gql`
  query subscriber($id: ID) {
    subscriber(id: $id) {
      username
      isConfirmed
    }
  }
`

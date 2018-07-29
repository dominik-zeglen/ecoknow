import gql from 'graphql-tag';

export const qSection = gql`
  query Section($id: ID!) {
    getDirectory(id: $id) {
      id
      name
      pages {
        id
        slug
        name
        fields {
          name
          type
          value
        }
      }
    }
  }
`;

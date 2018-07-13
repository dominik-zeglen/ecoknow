import gql from "graphql-tag";

const mDirectoryUpdate = gql`
  mutation DirectoryUpdate($id: ID!, $name: String!) {
    updateContainer(id: $id, input: { name: $name }) {
      id
      name
    }
  }
`;
export interface variables {
  id: string;
  name: string;
}
export default mDirectoryUpdate;

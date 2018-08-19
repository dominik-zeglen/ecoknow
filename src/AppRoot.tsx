import * as React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import AppLayout from './components/AppLayout';
import Navigator from './components/Navigator';
import {urlize} from './utils';

const query = gql`
  query SideMenu {
    getRootDirectories {
      id
      name
    }
  }
`;
export const AppRoot: React.StatelessComponent = ({children}) => (
  <Query query={query}>
    {({data}) => (
      <Navigator>
        {navigate => {
          const handleHomeClick = () => navigate('/');
          const handleSectionClick = (id: string) => () =>
            navigate('/' + urlize(id));
          const handlePanelClick = () => window.open('/panel/', '_blank');
          return (
            <AppLayout
              sections={
                data && data.getRootDirectories
                  ? data.getRootDirectories
                  : undefined
              }
              onHomeClick={handleHomeClick}
              onPanelClick={handlePanelClick}
              onSectionClick={handleSectionClick}>
              {children}
            </AppLayout>
          );
        }}
      </Navigator>
    )}
  </Query>
);
export default AppRoot;

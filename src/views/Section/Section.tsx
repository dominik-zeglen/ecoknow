import * as React from 'react';
import {Query} from 'react-apollo';

import {qSection} from './queries';
import SectionPage from '../../pages/SectionPage';
import Navigator from '../../components/Navigator';
import {urlize} from '../../utils';

interface Props {
  id: string;
}

export const Section: React.StatelessComponent<Props> = ({id}) => (
  <Navigator>
    {navigate => {
      const handleSectionEdit = () =>
        window.open('/panel/directories/' + urlize(id), '_blank');
      const handlePageClick = (slug: string) => () => navigate('#' + slug);
      const handlePageEdit = (id: string) => () =>
        window.open('/panel/pages/' + urlize(id), '_blank');
      return (
        <Query query={qSection} variables={{id}}>
          {({data}) => (
            <SectionPage
              section={
                data && data.getDirectory ? data.getDirectory : undefined
              }
              onPageEdit={handlePageEdit}
              onSectionEdit={handleSectionEdit}
            />
          )}
        </Query>
      );
    }}
  </Navigator>
);
export default Section;

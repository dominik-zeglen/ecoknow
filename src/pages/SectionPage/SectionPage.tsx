import * as React from 'react';
import {Edit} from 'react-feather';

import Container from '../../components/Container';
import IconButton from '../../components/IconButton';
import PageHeader from '../../components/PageHeader';
import Skeleton from '../../components/Skeleton';
import TableOfContents from './TableOfContents';
import Page from './Page';

interface Props {
  section: {
    id: string;
    name: string;
    pages: Array<{
      id: string;
      name: string;
      slug: string;
      fields: Array<{
        name: string;
        type: string;
        value: string;
      }>;
    }>;
  };
  onPageEdit: (id: string) => () => void;
  onSectionEdit: () => void;
}

export const SectionPage: React.StatelessComponent<Props> = ({
  section,
  onPageEdit,
  onSectionEdit,
}) => (
  <Container width="md">
    <PageHeader title={section ? section.name : undefined}>
      <IconButton icon={Edit} onClick={onSectionEdit} />
    </PageHeader>
    <TableOfContents pages={section ? section.pages : undefined} />
    {section && section.pages ? (
      section.pages.map((page, pageIndex) => (
        <Page
          page={page}
          index={pageIndex}
          onPageEdit={onPageEdit(page.id)}
          key={page.id}
        />
      ))
    ) : (
      <Page page={undefined} index={0} onPageEdit={() => {}} />
    )}
  </Container>
);
export default SectionPage;

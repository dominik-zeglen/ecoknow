import * as React from 'react';
import {Panel} from 'react-bootstrap';
import withStyles from 'react-jss';

import Skeleton from '../../components/Skeleton';

interface Props {
  pages: Array<{
    id: string;
    slug: string;
    name: string;
  }>;
}

const decorate = withStyles((theme: any) => ({
  link: {
    '&:hover': {
      color: theme.colors.secondary.main,
    },
    color: theme.typography.body.color,
    cursor: 'pointer' as 'pointer',
    transition: theme.transition.time,
  },
  root: {
    width: 400,
  },
}));
export const TableOfContents = decorate<Props>(
  ({classes, pages}) => (
    <div className={classes.root}>
      <Panel>
        <Panel.Heading>
          <Panel.Title>Spis treści</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          {pages === undefined ? (
            <Skeleton />
          ) : pages.length === 0 ? (
            <>Sekcja jest pusta</>
          ) : (
            pages.map((page, pageIndex) => (
              <div>
              <a
                href={"#" + page.slug}
                className={classes.link}
                key={page.id}>{`${pageIndex + 1}. ${page.name}`}</a></div>
            ))
          )}
        </Panel.Body>
      </Panel>
    </div>
  ),
);
export default TableOfContents;

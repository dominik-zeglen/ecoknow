import * as React from 'react';
import {Edit} from 'react-feather';
import withStyles from 'react-jss';
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import ReactHTMLParser from 'react-html-parser';

import Skeleton from '../../components/Skeleton';

interface Props {
  index: number;
  page: {
    id: string;
    slug: string;
    name: string;
    fields: Array<{
      name: string;
      type: string;
      value: string;
    }>;
  };
  onPageEdit: () => void;
}

const decorate = withStyles((theme: any) => ({
  content: {},
  title: {
    ...theme.typography.subHeading,
  },
}));
export const Page = decorate<Props>(({classes, index, page, onPageEdit}) => (
  <div id={page ? page.slug : undefined}>
    {page && page.name ? (
      <h2 className={classes.title}>{`${index + 1}. ${page.name}`}</h2>
    ) : (
      <Skeleton className={classes.title} style={{width: '10rem'}} />
    )}
    {page && page.fields
      ? page.fields
          .filter(field => field.name === 'content')
          .map(field => (
            <div className={classes.content}>
              {ReactHTMLParser(
                stateToHTML(convertFromRaw(JSON.parse(field.value))),
              )}
            </div>
          ))
      : Array(parseInt(Math.random() * 10 + 5 + '')).map(() => (
          <Skeleton style={{width: Math.random() * 25 + 5 + 'rem'}} />
        ))}
  </div>
));
export default Page;

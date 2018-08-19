import * as React from 'react';
import withStyles from 'react-jss';
import {Settings} from 'react-feather';

import Skeleton from './Skeleton';

interface Props {
  sections: Array<{
    id: string;
    name: string;
  }>;
  onHomeClick: () => void;
  onSectionClick: (id: string) => () => void;
}

const decorate = withStyles((theme: any) => ({
  link: {
    '&:hover': {
      color: theme.colors.secondary.main,
    },
    '& svg': {
      marginRight: theme.spacing,
    },
    '&.home': {
      marginBottom: theme.spacing * 2,
    },
    alignItems: 'center' as 'center',
    cursor: 'pointer' as 'pointer',
    display: 'flex' as 'flex',
    marginBottom: theme.spacing,
    transition: theme.transition.time,
  },
  navbar: {
    background: theme.colors.primary.light,
    boxShadow: '0px 5px 20px 5px #f2f2f2',
    height: theme.spacing * 6,
    marginBottom: theme.spacing * 2,
    width: '100%',
  },
  root: {
    display: 'grid' as 'grid',
    gridColumnGap: theme.spacing + 'px',
    gridTemplateColumns: `${theme.spacing * 25}px 1fr`,
  },
  sideMenu: {
    borderRight: `1px solid ${theme.colors.lightGray.main}`,
    height: '100vh',
    padding: `${theme.spacing * 2}px ${theme.spacing}px`,
    width: 22 * theme.spacing,
  },
  sideMenuHeader: {
    marginBottom: theme.spacing * 2,
  },
  sideMenuTitle: {
    fontSize: theme.typography.subHeading.fontSize,
  },
  sideMenuBody: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    height: `calc(100% - ${theme.spacing * 2 + 1.563 * 16 + 10}px)`,
  },
  spacer: {
    flex: 1,
  },
}));
export const AppLayout = decorate<Props>(
  ({classes, children, sections, onHomeClick, onSectionClick}) => (
    <div className={classes.root}>
      <div className={classes.sideMenu}>
        <div className={classes.sideMenuHeader}>
          <div className={classes.sideMenuTitle}>Nawigacja</div>
        </div>
        <div className={classes.sideMenuBody}>
          <div
            className={[classes.link, 'home'].join(' ')}
            onClick={onHomeClick}>
            Strona Główna
          </div>
          {sections === undefined ? (
            <div className={classes.link}>
              <Skeleton />
            </div>
          ) : (
            sections.map(section => (
              <div
                className={classes.link}
                onClick={onSectionClick(section.id)}
                key={section.id}>
                {section.name}
              </div>
            ))
          )}
          <div className={classes.spacer} />
          <div className={classes.link} onClick={() => {}}>
            <Settings /> Panel
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  ),
);
export default AppLayout;

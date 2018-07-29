import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomeView from './views/Home';
import SectionViewComponent from './views/Section';
import {unurlize} from './utils';

const SectionView: React.StatelessComponent<any> = ({match}) => (
  <SectionViewComponent id={unurlize(match.params.id)} />
);

export const App: React.StatelessComponent = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={HomeView} />
      <Route path="/:id" component={SectionView} />
    </Switch>
  );
};
export default App;

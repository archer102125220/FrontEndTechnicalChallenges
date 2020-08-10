import React, { Component } from 'react';
import { Route, Switch, routerRedux, withRouter, Redirect } from 'dva/router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import LayoutSwitch from './routes/LayoutSwitch';
import IndexPageIndexPage from './routes/IndexPage';
const { ConnectedRouter } = routerRedux;

const routeComponent = [
  { key: 'root', path: '/index', exact: true, component: IndexPageIndexPage },
];
const redirectComponent = [
  { key: 'root', exact: true, to: '/index', From: '/' },
];

class Root extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.any
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

const RouterRoot = withRouter(_.flow()(Root));

const renderRoutes = (r, props) => {
  const { key, exact, path, component: Component } = r;
  return (
    <Route
      {...props}
      key={`route-${key}`}
      exact={exact}
      path={path}
      render={(props) => <Component {...props} />}
    />
  );
};

const renderRedirects = (r, props) => {
  const { key, exact, to, From } = r;
  return (
    <Redirect
      {...props}
      key={`redirect-${key}`}
      exact={exact}
      from={From}
      to={to}
    />
  );
};

const router = props => {
  return (
    <ConnectedRouter {...props}>
      <RouterRoot {...props}>
        <Switch  {...props}>
          <LayoutSwitch  {...props}>
            {
              routeComponent.map(value => renderRoutes(value, props))
            }
            {
              redirectComponent.map(value => renderRedirects(value, props))
            }
          </LayoutSwitch>
        </Switch>
      </RouterRoot>
    </ConnectedRouter>
  );
};

export default router;
import * as React from 'react';
import { Route } from 'react-router';
import LogIn from './LogIn';
import Calendar from './Calendar';

const Routes = [
  {
    path: '/',
    component: LogIn,
    exact: true,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
];

export class RenderRoutes extends React.Component {
  render() {
    return (
      <div>
        {Routes.map((route, i) =>
          (<Route
            key={i}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />))}
      </div>
    );
  }
}

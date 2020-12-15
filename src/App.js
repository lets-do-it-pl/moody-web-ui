import React from 'react';
import GAListener from 'components/GAListener';
import { MainLayout, EmptyLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/moody.scss';
import 'react-notifications/lib/notifications.css';
import NotificationContainer from 'react-notifications';
import UserService from './services/user.service';

const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {

  state = {
    authed: false
  };

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    var authed = UserService.isUserLoggedIn();

    this.setState({
      authed: authed
    });
  }

  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <EmptyLayout>
              <React.Suspense fallback={<PageSpinner />}>
                <Route path="/auth" component={AuthPage} />
              </React.Suspense>
            </EmptyLayout>
            <MainLayout>
              <React.Suspense fallback={<PageSpinner />}>
                <Route path="/" component={DashboardPage} />
              </React.Suspense>
            </MainLayout>
            {this.state.tokenValid ?
              <Redirect to="/" /> :
              <Redirect to="/auth" />
            }
            <NotificationContainer />

          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);

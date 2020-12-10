import GAListener from 'components/GAListener';
import { MainLayout, EmptyLayout, LayoutRoute } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/moody.scss';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import UserProcess from './common/UserProcess';

const Auth = React.lazy(() => import('./pages/AuthPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { tokenValid: false, isLoaded: false };
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth() {
    var isTokenValid = UserProcess.isTokenValid();

    this.setState({
      tokenValid: isTokenValid,
      isLoaded: true
    });
  }

  render() {

    let layout;
    let redirect;

    if (this.state.tokenValid) {
      layout = <MainLayout>
        <React.Suspense fallback={<PageSpinner />}>
          <Route exact path="/" component={DashboardPage} />
        </React.Suspense>
      </MainLayout>

      redirect = <Redirect to="/" />

    } else {
      layout = <EmptyLayout>
        <React.Suspense fallback={<PageSpinner />}>
          <Route exact path="/auth" component={Auth} />
        </React.Suspense>
      </EmptyLayout>

      redirect = <Redirect to="/auth" />
    }

    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            {layout}
            {redirect}
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

import Nav from '@components/Nav';
import { Switch, BrowseRouter } from './router/Router';
import Route from './router/Route';
import Home from '@pages/Home';
import User from '@pages/User';
import Signin from '@pages/Signin';
import SignupMethod from '@pages/SignupMethod';
import Error404 from '@pages/Error404';
import { ThemeProvider } from '@lib/styled-components';
import GlobalStyle from '@/styles/global-style';
import styleTheme from '@/styles/theme';

const App = () => {
  const theme = styleTheme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowseRouter>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/user">
            <User />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/signup-method">
            <SignupMethod />
          </Route>
          <Error404 />
        </Switch>
      </BrowseRouter>
    </ThemeProvider>
  );
};

export default App;

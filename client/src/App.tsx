import Nav from '@components/Nav/Nav';
import { Switch, BrowseRouter } from './lib/router/Router';
import Route from './lib/router/Route';
import Home from '@pages/Home';
import User from '@pages/User';
import Signin from '@pages/Signin';
import SignupMethod from '@pages/SignupMethod';
import Error404 from '@pages/Error404';
import styled, { ThemeProvider } from '@lib/styled-components';
import GlobalStyle from './styles/global-style';
import styleTheme from './styles/theme';

const AppContent = styled.div`
  padding-top: 100px;
`;

const App = () => {
  const theme = styleTheme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowseRouter>
        <Nav />
        <AppContent>
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
        </AppContent>
      </BrowseRouter>
    </ThemeProvider>
  );
};

export default App;

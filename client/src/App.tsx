// styled
import styled, { ThemeProvider } from '@lib/styled-components';
import GlobalStyle from './styles/global-style';
import styleTheme from './styles/theme';

// router
import { BrowseRouter } from '@lib/router/BrowserRouter';
import Switch from '@lib/router/Switch';
import Route from '@lib/router/Route';

// components
import Nav from '@components/Nav/Nav';

// pages
import Home from '@pages/Home';
import Signin from '@pages/Signin';
import SignupMethod from '@pages/Signup/SignupMethod';
import Signup from '@pages/Signup/Signup';
import Error404 from '@pages/Error404';
import Category from '@pages/Category';
import MyPage from '@pages/MyPage/MyPage';
import MyPageEdit from '@pages/MyPage/MyPageEdit';
import MyPageConfirm from '@pages/MyPage/MyPageConfirm';

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
            <Route exact path="/my-page">
              <MyPage />
            </Route>
            <Route exact path="/my-page/confirm">
              <MyPageConfirm />
            </Route>
            <Route exact path="/my-page/edit">
              <MyPageEdit />
            </Route>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/signup-method">
              <SignupMethod />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route path="/categories/:id?">
              <Category />
            </Route>
            <Error404 />
          </Switch>
        </AppContent>
      </BrowseRouter>
    </ThemeProvider>
  );
};

export default App;

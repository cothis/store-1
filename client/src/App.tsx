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
import Error from '@components/Error';
import ToastifyContainer from '@components/Toastify/ToastifyContainer';
import Footer from '@components/Footer';

// pages
import Home from '@pages/Home';
import Signin from '@pages/Signin';
import SignupMethod from '@pages/Signup/SignupMethod';
import Signup from '@pages/Signup/Signup';
import Error404 from '@pages/Error404';
import ProductsPreview from '@pages/ProductsPreview';
import MyPage from '@pages/MyPage/MyPage';
import MyPageEdit from '@pages/MyPage/MyPageEdit';
import MyPageConfirm from '@pages/MyPage/MyPageConfirm';
import Terms from '@pages/Terms';
import Cart from '@pages/Cart';
import Order from '@pages/Order/Order';
import Product from '@pages/Product';
import Notice from '@pages/Notice';

// react-query
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from 'react-query';

// react-error-boundary
import { ErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient();

const AppContent = styled.div`
  padding: 100px 0 200px 0;
`;

const App = () => {
  const theme = styleTheme;
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary, error }) => (
                <Error resetErrorBoundary={resetErrorBoundary} error={error} />
              )}
            >
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
                      <ProductsPreview />
                    </Route>
                    <Route path="/search">
                      <ProductsPreview />
                    </Route>
                    <Route path="/products/:id">
                      <Product />
                    </Route>
                    <Route exact path="/notice">
                      <Notice />
                    </Route>
                    <Route exact path="/agreement">
                      <Terms />
                    </Route>
                    <Route exact path="/privacy">
                      <Terms />
                    </Route>
                    <Route exact path="/cart">
                      <Cart />
                    </Route>
                    <Route path="/orders/:id">
                      <Order />
                    </Route>
                    <Error404 />
                  </Switch>
                </AppContent>
                <Footer />
              </BrowseRouter>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </ThemeProvider>
      <ToastifyContainer />
    </QueryClientProvider>
  );
};

export default App;

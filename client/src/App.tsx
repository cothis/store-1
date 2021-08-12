import Nav from '@components/Nav';
import { Switch, BrowseRouter } from './router/Router';
import Route from './router/Route';
import Home from '@pages/Home';
import User from '@pages/User';
import Signin from '@pages/Signin';
import Error404 from '@pages/Error404';

const App = () => {
  return (
    <>
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
          <Error404 />
        </Switch>
      </BrowseRouter>
    </>
  );
};

export default App;

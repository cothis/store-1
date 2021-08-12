import useHistory from '@hooks/useHistory';
import NavLink from '@/router/NavLink';

const Nav = () => {
  return (
    <nav>
      <NavLink exact to="/" activeStyle={{ textDecoration: 'none' }}>
        Home
      </NavLink>
      <NavLink exact to="/user" activeStyle={{ textDecoration: 'none' }}>
        User
      </NavLink>
      <NavLink exact to="/signin" activeStyle={{ textDecoration: 'none' }}>
        Signin
      </NavLink>
    </nav>
  );
};
export default Nav;

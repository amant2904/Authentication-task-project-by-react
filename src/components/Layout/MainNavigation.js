import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from '../Store/auth-context';
import { useContext } from 'react';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logout_handler = () => {
    authCtx.tokenClear_handler();
    localStorage.removeItem("tokenId");
    history.replace("/auth");
  }

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn && <li>
            <button onClick={logout_handler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

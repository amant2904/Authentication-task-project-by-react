import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from '../Store/auth-context';
import { useContext } from 'react';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logout_handler = () => {
    authCtx.tokenClear_handler();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {authCtx.tokenId.trim().length === 0 && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {authCtx.tokenId.trim().length > 0 && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {authCtx.tokenId.trim().length > 0 && <li>
            <button onClick={logout_handler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

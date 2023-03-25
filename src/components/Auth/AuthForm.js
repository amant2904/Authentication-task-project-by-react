import { useState, useRef, useContext } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './AuthForm.module.css';
import AuthContext from '../Store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const email = useRef();
  const password = useRef();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submit_handler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      setLoading(true);
      const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAp4upS2LPL02GaKGSiXEwrjpAyMiY13JM", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
          returnSecureToken: true
        })
      })
      if (res.ok) {
        const data = await res.json();
        authCtx.tokenId_handler(data.idToken);
      }
      else {
        console.log(res);
        const data = await res.json();
        console.log(data);
        alert(data.error.message);
      }
      setLoading(false);
    }
    else {
      setLoading(true);
      const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAp4upS2LPL02GaKGSiXEwrjpAyMiY13JM", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
          returnSecureToken: true
        })
      });
      if (res.ok) {
        console.log(res);
        const data = await res.json();
        console.log(data);
      }
      else {
        const data = await res.json();
        alert(data.error.message)
      }
      setLoading(false);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={email} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            ref={password}
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
          {loading && <LoadingSpinner className={classes.loader} />}
          {!loading && <button type='submit' onClick={submit_handler}>{isLogin ? 'LogIn' : 'Create Account'}</button>}

          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

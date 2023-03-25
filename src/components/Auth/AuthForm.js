import { useState, useRef } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const email = useRef("");
  const password = useRef("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submit_handler = async (e) => {
    e.preventDefault();
    if (email.current.value.includes("@") && password.current.value.trim().length > 0) {
      setLoading(true);
      let res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: {
          email: email.current.value,
          password: password.current.value
        }
      })
      let data = await res.json();
      console.log(data);
      if (!res.ok) {
        alert(data.error.message);
      }
      setLoading(false);
    }
    else {
      setTimeout(() => {
        alert("Invalid Input")
      }, 1000)
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

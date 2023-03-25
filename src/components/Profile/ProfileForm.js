import classes from './ProfileForm.module.css';
import AuthContext from '../Store/auth-context';
import { useContext, useRef } from 'react';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPassword = useRef();

  const changePassword_handler = async (e) => {
    e.preventDefault();
    const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAp4upS2LPL02GaKGSiXEwrjpAyMiY13JM", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        idToken: authCtx.tokenId,
        password: newPassword.current.value,
        returnSecureToken: true
      })
    })
    if (res.ok) {
      const data = await res.json();
      alert("successfully changed password for profile :- \n" + data.email);
    }
    else {
      console.log(res);
      const data = await res.json();
      console.log(data);
      console.log(data.error.message);
    }
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassword} />
      </div>
      <div className={classes.action}>
        <button onClick={changePassword_handler} type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
